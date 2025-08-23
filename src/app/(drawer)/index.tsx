import { Link, useRouter } from "expo-router";
import React, { FC, useCallback, useEffect, useLayoutEffect } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import classNames from "classnames";
import useCriteriaStore from "@/states/criteria-store";

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      {/* Header Section */}
      <View className="px-6 py-8">
        <Text className="text-2xl font-bold text-gray-900 mb-1">SPK Simkatmawa</Text>
        <Text className="text-gray-500 text-sm">
          Sistem Pendukung Keputusan
        </Text>
      </View>

      {/* Main Content */}
      <View className="px-6 flex-1">
        <View className="gap-y-4">
          <CriteriaButton
            icon={() => <FontAwesome6 name="wand-magic-sparkles" size={24} color="#8B5CF6" />}
            type="magiq"
            title="MAGIQ"
            description="Metode matematika dengan perhitungan otomatis"
            className="bg-purple-50 border border-purple-100"
          />
          <CriteriaButton
            icon={() => <MaterialCommunityIcons name="video-input-component" size={24} color="#EF4444" />}
            type="manual"
            title="MANUAL"
            description="Metode manual dengan input nilai langsung"
            className="bg-red-50 border border-red-100"
          />
        </View>
      </View>
    </View>
  );
}

interface CriteriaButtonProps {
  icon: FC;
  title: string;
  description: string;
  type: 'manual' | 'magiq'
  className?: string;
}

function CriteriaButton({
  icon: Icon,
  title,
  description,
  type,
  className
}: CriteriaButtonProps) {
  const router = useRouter();
  const resetCriteria = useCriteriaStore(state => state.resetCriteria);

  const goToCriteria = useCallback(() => {
    resetCriteria(type);
    router.push('/criteria/' + type);
  }, [resetCriteria, type]);

  return (
    <TouchableOpacity className="active:opacity-70">
      <Pressable onPress={goToCriteria}>
        <View className={classNames(
          "rounded-xl p-5 flex flex-row items-center gap-x-4",
          className
        )}>
          {/* Icon */}
          <View className="p-3 rounded-lg bg-white">
            <Icon />
          </View>
          
          {/* Content */}
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 mb-1">{title}</Text>
            <Text className="text-gray-600 text-sm">{description}</Text>
          </View>
          
          {/* Simple Arrow */}
          <MaterialCommunityIcons name="chevron-right" size={20} color="#9CA3AF" />
        </View>
      </Pressable>
    </TouchableOpacity>
  );
}