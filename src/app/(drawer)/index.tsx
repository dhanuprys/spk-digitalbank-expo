import { Link } from "expo-router";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import classNames from "classnames";

export default function Page() {
  return (
    <View className="flex flex-1 p-4">
      <View className="gap-y-4">
        <CriteriaButton
          icon={() => <FontAwesome6 name="wand-magic-sparkles" size={30} color="black" />}
          href="/criteria/magiq"
          title="MAGIQ"
          description="Magiq adalah metode pengambilan keputusan yang menggunakan teknik matematika"
          className="bg-purple-500/20" />
        <CriteriaButton
          icon={() => <MaterialCommunityIcons name="video-input-component" size={30} color="black" />}
          href="/criteria/manual"
          title="MANUAL"
          description="Manual adalah metode pengambilan keputusan yang menggunakan pengetahuan manusia"
          className="bg-red-500/20" />
      </View>
    </View>
  );
}

interface CriteriaButtonProps {
  icon: FC;
  title: string;
  description: string;
  href: string;
  className?: string;
}

function CriteriaButton({
  icon: Icon,
  title,
  description,
  href,
  className
}: CriteriaButtonProps) {
  return (
    <TouchableOpacity>
      <Link href={href} prefetch>
        <View className={classNames("rounded-lg p-4 flex flex-row items-center gap-x-4", className)}>
          <View>
            <Icon />
          </View>
          <View>
            <Text className="text-lg font-bold">{title}</Text>
            <Text className="text-sm text-gray-700">{description}</Text>
          </View>
        </View>
      </Link>
    </TouchableOpacity>
  );
}