import SharedHeader from '@/components/shared/header';
import {
  CalculationResult,
  CalculationService,
} from '@/services/calculation-service';
import useCriteriaStore from '@/states/criteria-store';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ResultScreen() {
  const router = useRouter();
  const { criteria, showGraphic, showTable } = useCriteriaStore();
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'ranking' | 'name'>('ranking');
  const animatedValues = useRef<Animated.Value[]>([]);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  const sortedResults = useMemo(() => {
    if (sortBy === 'ranking') {
      return [...results].sort((a, b) => b.pref_score - a.pref_score);
    } else {
      return [...results].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [results, sortBy]);

  const getOriginalIndex = useCallback(
    (sortedItem: CalculationResult) => {
      return results.findIndex(item => item.id === sortedItem.id);
    },
    [results]
  );

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await CalculationService.calculateResults(criteria);
      setResults(data);

      // Store results in AsyncStorage
      try {
        await AsyncStorage.setItem(
          'last_recommendations',
          JSON.stringify(data)
        );
      } catch (storageError) {
        console.warn('Failed to save results to storage:', storageError);
      }

      animatedValues.current = data.map(() => new Animated.Value(0));

      animatedValues.current.forEach((animValue, index) => {
        Animated.timing(animValue, {
          toValue: 1,
          duration: 600,
          delay: index * 100,
          useNativeDriver: false,
        }).start();
      });
    } catch (err) {
      console.error('Error fetching calculation results:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  }, [criteria]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const renderSortingOptions = () => (
    <View className='px-6 py-4 bg-white border-b border-gray-200'>
      <Text className='text-base font-medium text-gray-700 mb-4'>
        Urutkan berdasarkan:
      </Text>
      <View className='gap-y-3'>
        <TouchableOpacity
          className='flex-row items-center'
          onPress={() => setSortBy('ranking')}
        >
          <View
            className={`w-5 h-5 rounded-full border-2 mr-3 ${
              sortBy === 'ranking'
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}
          >
            {sortBy === 'ranking' && (
              <View className='w-2.5 h-2.5 rounded-full bg-white m-0.5' />
            )}
          </View>
          <Text
            className={`text-base ${
              sortBy === 'ranking'
                ? 'text-blue-600 font-medium'
                : 'text-gray-600'
            }`}
          >
            Urutkan berdasarkan peringkat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='flex-row items-center'
          onPress={() => setSortBy('name')}
        >
          <View
            className={`w-5 h-5 rounded-full border-2 mr-3 ${
              sortBy === 'name'
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}
          >
            {sortBy === 'name' && (
              <View className='w-2.5 h-2.5 rounded-full bg-white m-0.5' />
            )}
          </View>
          <Text
            className={`text-base ${
              sortBy === 'name' ? 'text-blue-600 font-medium' : 'text-gray-600'
            }`}
          >
            Urutkan berdasarkan nama
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderGraphView = () => (
    <View className='px-6 py-4'>
      <View className='mb-4'>
        <Text className='text-xl font-bold text-gray-900'>
          Grafik Rekomendasi
        </Text>
        <Text className='text-gray-600 mt-1'>
          Visualisasi skor preferensi dalam bentuk grafik batang
        </Text>
      </View>

      {sortedResults.map((result, index) => {
        const originalIndex = getOriginalIndex(result);
        return (
          <View key={result.id} className='mb-3'>
            <Text className='text-gray-800 font-medium text-base mb-2'>
              {result.name}
            </Text>
            <View className='bg-gray-200 rounded-full h-2 overflow-hidden'>
              <Animated.View
                className='bg-blue-500 h-full rounded-full'
                style={{
                  width:
                    animatedValues.current[originalIndex]?.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', `${result.pref_score * 100}%`],
                    }) || '0%',
                }}
              />
            </View>
            <Text className='text-gray-600 text-xs mt-1'>
              Score: {result.pref_score.toFixed(4)}
            </Text>
          </View>
        );
      })}
    </View>
  );

  const renderTableView = () => (
    <View className='px-6 py-4'>
      <View className='mb-4'>
        <Text className='text-xl font-bold text-gray-900'>
          Tabel Rekomendasi
        </Text>
        <Text className='text-gray-600 mt-1'>
          Daftar lengkap hasil perhitungan dengan skor preferensi
        </Text>
      </View>

      <View className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
        <View className='bg-gray-50 flex-row border-b border-gray-200'>
          <View className='w-16 p-4 border-r border-gray-200'>
            <Text className='font-semibold text-gray-800 text-center'>No</Text>
          </View>
          <View className='flex-1 p-4'>
            <Text className='font-semibold text-gray-800 text-center'>
              Nama
            </Text>
          </View>
        </View>

        {sortedResults.map((result, index) => (
          <View
            key={result.id}
            className='flex-row border-b border-gray-100 last:border-b-0'
          >
            <View className='w-16 p-4 border-r border-gray-200'>
              <Text className='text-gray-800 text-center font-medium'>
                {index + 1}
              </Text>
            </View>
            <View className='flex-1 px-4 py-2'>
              <Text className='text-gray-800 font-medium'>{result.name}</Text>
              <Text className='text-gray-600 text-xs mt-1'>
                Score: {result.pref_score.toFixed(4)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View className='flex-1 justify-center items-center px-6'>
          <View className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-sm w-full'>
            <View className='items-center'>
              <View className='w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-6' />
              <Text className='text-xl font-semibold text-gray-900 text-center mb-2'>
                Memproses Data
              </Text>
              <Text className='text-gray-600 text-center leading-5'>
                Sedang menghitung rekomendasi berdasarkan kriteria yang
                dipilih...
              </Text>
            </View>
          </View>
        </View>
      );
    }

    if (error) {
      return (
        <View className='flex-1 justify-center items-center px-6'>
          <View className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-sm w-full'>
            <View className='items-center'>
              <View className='w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-6'>
                <Text className='text-3xl text-red-500'>⚠️</Text>
              </View>
              <Text className='text-xl font-semibold text-gray-900 text-center mb-2'>
                Terjadi Kesalahan
              </Text>
              <Text className='text-gray-600 text-center leading-5 mb-6'>
                {error}
              </Text>
              <TouchableOpacity
                className='bg-blue-500 px-6 py-3 rounded-xl'
                onPress={() => {
                  setError(null);
                  setLoading(true);
                  fetchResults();
                }}
                activeOpacity={0.7}
              >
                <Text className='text-white font-semibold text-center'>
                  Coba Lagi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    if (results.length === 0) {
      return (
        <View className='flex-1 justify-center items-center px-6'>
          <View className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-sm w-full'>
            <View className='items-center'>
              <View className='w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-6'>
                <Text className='text-3xl text-gray-400'>📊</Text>
              </View>
              <Text className='text-xl font-semibold text-gray-900 text-center mb-2'>
                Tidak Ada Hasil
              </Text>
              <Text className='text-gray-600 text-center leading-5'>
                Belum ada data rekomendasi yang tersedia. Silakan cek kembali
                kriteria yang dipilih.
              </Text>
            </View>
          </View>
        </View>
      );
    }

    return (
      <ScrollView className='flex-1'>
        {renderSortingOptions()}
        {showGraphic && renderGraphView()}
        {showTable && renderTableView()}

        {!showGraphic && !showTable && (
          <View className='flex-1 justify-center items-center px-6 py-8'>
            <View className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-sm w-full'>
              <View className='items-center'>
                <View className='w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-6'>
                  <Text className='text-3xl text-blue-500'>⚙️</Text>
                </View>
                <Text className='text-xl font-semibold text-gray-900 text-center mb-2'>
                  Pilih Format Tampilan
                </Text>
                <Text className='text-gray-600 text-center leading-5'>
                  Silakan pilih format tampilan (grafik atau tabel) di
                  pengaturan filter untuk melihat hasil rekomendasi.
                </Text>
              </View>
            </View>
          </View>
        )}
        <View className='h-24'></View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <SharedHeader
        title='Hasil Rekomendasi'
        subtitle='Berdasarkan kriteria yang telah dipilih'
        onBackPress={handleBackPress}
      />

      {renderContent()}

      {/* Sticky Bottom Button */}
      <View className='px-6 py-6 bg-white border-t border-gray-100'>
        <Pressable onPress={() => router.push('/')}>
          <View className='bg-blue-500 py-2 rounded-xl flex-row items-center justify-center gap-x-3 shadow-md'>
            <View className='bg-blue-400 p-2 rounded-full'>
              <AntDesign name='home' size={15} color='white' />
            </View>
            <Text className='text-white font-semibold text-base'>
              Kembali ke Halaman Utama
            </Text>
          </View>
        </Pressable>

        <Text className='text-center text-gray-500 text-sm mt-4 px-4 leading-5'>
          Kembali ke halaman utama untuk memulai perhitungan baru atau melihat
          rekomendasi terakhir
        </Text>
      </View>
    </SafeAreaView>
  );
}
