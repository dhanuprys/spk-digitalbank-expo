import CriteriaGroup from '@/components/criteria/manual/criteria-group';
import SharedHeader from '@/components/shared/header';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native';
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

export default function CriteriaManualScreen() {
  const router = useRouter();

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
          { name: 'l1_cg1_a', title: 'Capaian Unggulan' },
          { name: 'l1_cg1_b', title: 'Gagasan Kreatif' },
          { name: 'l1_cg1_c', title: 'Bahasa Inggris' },
        ],
      },
      { id: 'l2', type: 'header', title: 'Level 2' },
      {
        id: 'l2_cg1',
        type: 'criteria',
        items: [
          { name: 'l2_cg1_a', title: 'Kompetisi' },
          { name: 'l2_cg1_b', title: 'Pengakuan' },
          { name: 'l2_cg1_c', title: 'Penghargaan' },
          { name: 'l2_cg1_d', title: 'Karier Organisasi' },
          { name: 'l2_cg1_e', title: 'Hasil Karya' },
          { name: 'l2_cg1_f', title: 'Pemberdayaan / Aksi Kemanusiaan' },
          { name: 'l2_cg1_g', title: 'Kewirausahaan' },
        ],
      },
      {
        id: 'l2_cg2',
        type: 'criteria',
        items: [
          { name: 'l2_cg2_a', title: 'Naskah GK' },
          { name: 'l2_cg2_b', title: 'Presentasi GK' },
        ],
      },
      {
        id: 'l2_cg3',
        type: 'criteria',
        items: [
          { name: 'l2_cg3_a', title: 'Content' },
          { name: 'l2_cg3_b', title: 'Accuracy' },
          { name: 'l2_cg3_c', title: 'Fluency' },
          { name: 'l2_cg3_d', title: 'Pronounciation' },
          { name: 'l2_cg3_e', title: 'Overall Performance' },
        ],
      },
      { id: 'l3', type: 'header', title: 'Level 3' },
      {
        id: 'l3_cg1',
        type: 'criteria',
        items: [
          { name: 'l3_cg1_a', title: 'Penyajian' },
          { name: 'l3_cg1_b', title: 'Substansi' },
          { name: 'l3_cg1_c', title: 'Kualitas' },
        ],
      },
      {
        id: 'l3_cg2',
        type: 'criteria',
        items: [
          { name: 'l3_cg2_a', title: 'Presentasi' },
          { name: 'l3_cg2_b', title: 'Tanya Jawab' },
        ],
      },
    ],
    []
  );

  const renderItem = useCallback(({ item }: { item: SectionData }) => {
    if (item.type === 'header') {
      return (
        <Text className='font-semibold text-xl mb-4 text-gray-800 px-6'>
          {item.title}
        </Text>
      );
    }

    if (item.type === 'criteria' && item.items) {
      return (
        <View className='px-6'>
          <CriteriaGroup items={item.items} />
        </View>
      );
    }

    return null;
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <SharedHeader
        title='Tentukan Kriteria'
        subtitle='Atur nilai kriteria secara manual'
        onBackPress={handleBackPress}
      />

      <FlatList
        data={sections}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        className='flex-1 pt-4 pb-32'
        showsVerticalScrollIndicator={false}
      />

      <View className='px-6 py-6 bg-white border-t border-gray-100'>
        <Pressable onPress={() => router.push('/criteria/filter')}>
          <View className='bg-blue-500 py-2 rounded-xl flex-row items-center justify-center gap-x-3 shadow-md'>
            <View className='bg-blue-400 p-2 rounded-full'>
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
