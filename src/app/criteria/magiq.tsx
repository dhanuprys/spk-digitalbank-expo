import CriteriaGroup from '@/components/criteria/magiq/criteria-group';
import SharedHeader from '@/components/shared/header';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SectionData {
  id: string;
  type: 'header' | 'criteria';
  title?: string;
  items?: {
    name: string;
    title: string;
  }[];
}

export default function CriteriaMagiqScreen() {
  const router = useRouter();
  const [showTips, setShowTips] = useState(true);

  const handleBackPress = useCallback(() => {
    router.replace('/');
  }, [router]);

  const sections = useMemo<SectionData[]>(
    () => [
      { id: 'l1', type: 'header', title: 'Level 1' },
      {
        id: 'l1_criteria',
        type: 'criteria',
        items: [
          { name: 'l1_cg1_a', title: 'Performa Apps' },
          { name: 'l1_cg1_b', title: 'Laporan Keuangan' },
          { name: 'l1_cg1_c', title: 'User Experience' },
        ],
      },
      { id: 'l2', type: 'header', title: 'Level 2' },
      {
        id: 'l2_cg1',
        type: 'criteria',
        items: [
          { name: 'l2_cg1_a', title: 'Ukuran File' },
          { name: 'l2_cg1_b', title: 'Total Rating' },
          { name: 'l2_cg1_c', title: 'User Rated' },
          { name: 'l2_cg1_d', title: 'Total Install' },
          { name: 'l2_cg1_e', title: 'Release Date' },
        ],
      },
      {
        id: 'l2_cg2',
        type: 'criteria',
        items: [
          { name: 'l2_cg2_a', title: 'Giro' },
          { name: 'l2_cg2_b', title: 'Tabungan' },
          { name: 'l2_cg2_c', title: 'Deposito' },
          { name: 'l2_cg2_d', title: 'Laba Bersih' },
        ],
      },
      {
        id: 'l2_cg3',
        type: 'criteria',
        items: [
          { name: 'l2_cg3_a', title: 'Happiness' },
          { name: 'l2_cg3_b', title: 'Engagement' },
          { name: 'l2_cg3_c', title: 'Adoption' },
          { name: 'l2_cg3_d', title: 'Retention' },
          { name: 'l2_cg3_e', title: 'Task Success' },
        ],
      },
    ],
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: SectionData; index: number }) => {
      if (item.type === 'header') {
        return (
          <Text className='font-semibold text-xl mt-6 mb-4 text-gray-800 px-6'>
            {item.title}
          </Text>
        );
      }

      if (item.type === 'criteria' && item.items) {
        return (
          <View>
            <View className='px-6'>
              <CriteriaGroup items={item.items} />
            </View>
            {/* Add separator if next item is also criteria (same level) */}
            {index < sections.length - 1 &&
              sections[index + 1]?.type === 'criteria' && (
                <View className='mx-6 mt-4 mb-2'>
                  <View className='h-px bg-gray-200' />
                </View>
              )}
          </View>
        );
      }

      return null;
    },
    [sections]
  );

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <SharedHeader
        title='Tentukan Kriteria'
        subtitle='Atur urutan kriteria untuk perhitungan MAGIQ'
        onBackPress={handleBackPress}
      />

      {showTips && (
        <View className='px-6 py-4 bg-white border-b border-gray-100'>
          <View className='flex-row items-start justify-between mb-2'>
            <View className='flex-row items-center gap-x-2 flex-1'>
              <View className='w-6 h-6 bg-indigo-50 rounded-lg items-center justify-center'>
                <AntDesign name='info' size={14} color='#6366F1' />
              </View>
              <Text className='text-sm font-medium text-gray-700'>
                Tips Penggunaan
              </Text>
            </View>
            <Pressable
              onPress={() => setShowTips(false)}
              className='p-1 -mr-1'
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <AntDesign name='close' size={16} color='#9CA3AF' />
            </Pressable>
          </View>
          <Text className='text-sm text-gray-600 leading-5'>
            Drag dan drop kriteria untuk mengatur urutan prioritas. Kriteria di
            atas memiliki prioritas lebih tinggi.
          </Text>
        </View>
      )}

      <FlatList
        data={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        className='flex-1'
        ListFooterComponent={() => <View className='h-32' />}
        showsVerticalScrollIndicator={false}
      />

      <View className='px-6 py-6 bg-white border-t border-gray-100'>
        <Pressable onPress={() => router.push('/criteria/filter')}>
          <View className='bg-indigo-500 py-2 rounded-xl flex-row items-center justify-center gap-x-3 shadow-md'>
            <View className='bg-indigo-400 p-2 rounded-full'>
              <AntDesign name='arrowright' size={15} color='white' />
            </View>
            <Text className='text-white font-semibold text-base'>
              LANJUTKAN
            </Text>
          </View>
        </Pressable>

        <Text className='text-center text-gray-500 text-sm mt-4 px-4 leading-5'>
          Setelah mengatur urutan kriteria, lanjutkan ke tahap berikutnya untuk
          mengatur hasil rekomendasi
        </Text>
      </View>
    </SafeAreaView>
  );
}
