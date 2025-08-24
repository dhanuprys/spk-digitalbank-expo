import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import useCriteriaStore from '@/states/criteria-store';

interface CriteriaGroupProps {
  items: {
    name: string;
    title: string;
  }[];
}

export default function CriteriaGroup({ items }: CriteriaGroupProps) {
  return (
    <View className='gap-y-2 mb-6'>
      {items.map(item => (
        <CriteriaCard key={item.name} name={item.name} title={item.title} />
      ))}
    </View>
  );
}

interface CriteriaCardProps {
  name: string;
  title: string;
}

function CriteriaCard({ name, title }: CriteriaCardProps) {
  const { criteria, setMax, setValue } = useCriteriaStore();
  const isMax = criteria[name + '_max'];

  return (
    <View className='pr-1 rounded-xl flex-row gap-x-3 items-center border bg-white border-gray-200 shadow-sm'>
      <View className='flex-1 flex-row items-center justify-between gap-x-4 p-4'>
        <Text
          className='flex-1 font-medium leading-5 text-gray-800 text-base mr-4'
          numberOfLines={2}
        >
          {title}
        </Text>
        <View className='flex-row items-center gap-x-4 flex-shrink-0'>
          <TouchableOpacity onPress={() => setMax(name, !isMax)}>
            <View
              className={`px-4 py-2.5 rounded-xl flex-row items-center gap-x-2.5 border ${
                isMax
                  ? 'bg-red-50 border-red-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <AntDesign
                name={isMax ? 'arrowup' : 'arrowdown'}
                size={16}
                color={isMax ? '#DC2626' : '#059669'}
              />
              <Text
                className={`font-semibold text-xs tracking-wide ${
                  isMax ? 'text-red-800' : 'text-green-800'
                }`}
              >
                {isMax ? 'MAX' : 'MIN'}
              </Text>
            </View>
          </TouchableOpacity>
          <TextInput
            keyboardType='number-pad'
            value={String(criteria[name + '_value'] || 0)}
            onChangeText={text => setValue(name, parseInt(text) || 0)}
            className='border border-gray-300 rounded-lg w-20 text-center bg-gray-50 text-gray-800 font-medium'
          />
        </View>
      </View>
    </View>
  );
}
