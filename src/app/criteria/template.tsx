import SharedHeader from '@/components/shared/header';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CalculationService,
  Template,
} from '../../services/calculation-service';
import useCriteriaStore from '../../states/criteria-store';

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
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const { template, setTemplate } = useCriteriaStore();

  const handleBackPress = useCallback(() => {
    router.replace('/');
  }, [router]);

  const fetchTemplates = useCallback(async () => {
    try {
      const templates = await CalculationService.getTemplates();
      setTemplates(templates);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleTemplateSelect = useCallback(
    (templateId: string) => {
      const selectedTemplate = templates.find(t => t.id == templateId);
      if (selectedTemplate) {
        setTemplate(selectedTemplate);
      }
    },
    [setTemplate, templates]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Template; index: number }) => {
      const isSelected = template?.id === item.id;

      return (
        <Pressable
          className='px-6 mb-4'
          onPress={() => handleTemplateSelect(String(item.id))}
        >
          <View
            className={`rounded-xl p-5 border shadow-sm ${
              isSelected
                ? 'bg-blue-50 border-blue-300'
                : 'bg-white border-gray-200'
            }`}
          >
            <View className='flex-row items-start justify-between mb-3'>
              <View className='flex-1 mr-3'>
                <Text
                  className={`text-lg font-semibold mb-1 ${
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </Text>
                <Text
                  className={`text-sm leading-5 ${
                    isSelected ? 'text-blue-700' : 'text-gray-600'
                  }`}
                >
                  {item.description}
                </Text>
              </View>
              <View
                className={`p-2 rounded-lg ${
                  isSelected ? 'bg-blue-100' : 'bg-blue-50'
                }`}
              >
                <AntDesign
                  name='filetext1'
                  size={20}
                  color={isSelected ? '#1E40AF' : '#3B82F6'}
                />
              </View>
            </View>

            {isSelected && (
              <View className='flex-row items-center gap-x-2 pt-2 border-t border-blue-200'>
                <AntDesign name='checkcircle' size={16} color='#1E40AF' />
                <Text className='text-sm text-blue-800 font-medium'>
                  Template dipilih
                </Text>
              </View>
            )}
          </View>
        </Pressable>
      );
    },
    [template, handleTemplateSelect]
  );

  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      <SharedHeader
        title='Pilih Template'
        subtitle='Pilih template kriteria yang sudah tersedia'
        onBackPress={handleBackPress}
      />

      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <View className='bg-white rounded-xl p-8 items-center shadow-sm'>
            <View className='w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4' />
            <Text className='text-gray-600 font-medium'>
              Memuat template...
            </Text>
          </View>
        </View>
      ) : templates.length === 0 ? (
        <View className='flex-1 justify-center items-center px-6'>
          <View className='bg-white rounded-xl p-8 items-center shadow-sm'>
            <AntDesign name='filetext1' size={48} color='#9CA3AF' />
            <Text className='text-lg font-semibold text-gray-700 mt-4 mb-2'>
              Belum Ada Template
            </Text>
            <Text className='text-gray-500 text-center leading-5'>
              Tidak ada template kriteria yang tersedia saat ini
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={templates}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          className='flex-1 pt-4'
          ListFooterComponent={() => <View className='h-32' />}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View className='px-6 py-6 bg-white border-t border-gray-100'>
        <Pressable
          onPress={() => router.push('/criteria/filter')}
          disabled={!template}
        >
          <View
            className={`py-2 rounded-xl flex-row items-center justify-center gap-x-3 shadow-md ${
              template ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <View
              className={`p-2 rounded-full ${
                template ? 'bg-blue-400' : 'bg-gray-400'
              }`}
            >
              <AntDesign name='arrowright' size={15} color='white' />
            </View>
            <Text className='text-white font-semibold text-base'>
              LANJUTKAN
            </Text>
          </View>
        </Pressable>

        <Text className='text-center text-gray-500 text-sm mt-4 px-4 leading-5'>
          {template
            ? 'Template telah dipilih, lanjutkan ke tahap berikutnya'
            : 'Pilih template yang sesuai untuk memulai perhitungan'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
