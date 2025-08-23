import { Link, useRouter } from "expo-router";
import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import classNames from "classnames";
import useCriteriaStore from "@/states/criteria-store";

interface LastRecommendation {
  id: number;
  name: string;
  pref_score: number;
}

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      {/* Main Content */}
      <View className="px-6 flex-1 pt-8">
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
        
        {/* Last Recommendations */}
        <LastRecommendations />
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

  const goToCriteria = useCallback(async () => {
    try {
      // Reset criteria first
      resetCriteria(type);
      
      // Small delay to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Navigate with error handling
      router.push('/criteria/' + type);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation
      try {
        router.push('/criteria/' + type);
      } catch (fallbackError) {
        console.error('Fallback navigation failed:', fallbackError);
      }
    }
  }, [resetCriteria, type, router]);

  return (
    <Pressable 
      onPress={goToCriteria}
      className="active:opacity-70"
      style={({ pressed }) => [
        { opacity: pressed ? 0.7 : 1 }
      ]}
    >
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
  );
}

function LastRecommendations() {
  const [lastResults, setLastResults] = useState<LastRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLastRecommendations();
  }, []);

  const loadLastRecommendations = async () => {
    try {
      setError(null);
      const storedData = await AsyncStorage.getItem('last_recommendations');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setLastResults(parsedData);
        }
      }
    } catch (error) {
      console.warn('Failed to load last recommendations:', error);
      setError('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (error || lastResults.length === 0) {
    return null;
  }

  return (
    <View className="mt-8">
      <View className="flex-row items-center gap-x-2 mb-3">
        <MaterialCommunityIcons name="history" size={18} color="#6B7280" />
        <Text className="text-base font-medium text-gray-600">
          Rekomendasi Terakhir
        </Text>
      </View>
      
      <View className="bg-gray-50 rounded-lg border border-gray-200 p-3">
        {lastResults.map((result, index) => (
          <View key={result.id} className="flex-row items-center justify-between py-1.5">
            <View className="flex-row items-center gap-x-2 flex-1">
              <View className="w-6 h-6 bg-blue-100 rounded-full items-center justify-center">
                <Text className="text-sm font-bold text-blue-600">{index + 1}</Text>
              </View>
              <Text className="text-base text-gray-800 flex-1" numberOfLines={1}>
                {result.name}
              </Text>
            </View>
            <Text className="text-sm text-gray-500 font-mono">
              {result.pref_score.toFixed(3)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}