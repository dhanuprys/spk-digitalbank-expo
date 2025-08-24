import useCriteriaStore from '@/states/criteria-store';
import { Criteria } from '@/types/criteria';
import { calculateMagiq } from '@/utils/calculate-magiq';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCallback, useMemo } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import DragList, { DragListRenderItemInfo } from 'react-native-draglist';

interface CriteriaGroupProps {
  items: {
    name: string;
    title: string;
  }[];
}

export default function CriteriaGroup({ items }: CriteriaGroupProps) {
  const { criteria, bulkSetValues } = useCriteriaStore();

  // Create ordered items based on current store values
  const orderedItems = useMemo(() => {
    // Create a map of item names to their current values
    const itemValues = new Map<string, number>();

    items.forEach((item, index) => {
      const valueKey = (item.name + '_value') as keyof Criteria;
      const currentValue = criteria[valueKey];

      if (typeof currentValue === 'number') {
        itemValues.set(item.name, currentValue);
      } else {
        // If no value exists, calculate the default MAGIQ value
        itemValues.set(item.name, calculateMagiq(items.length, index));
      }
    });

    // Sort items by their values (descending order - highest value first)
    return [...items].sort((a, b) => {
      const valueA = itemValues.get(a.name) || 0;
      const valueB = itemValues.get(b.name) || 0;
      return valueB - valueA;
    });
  }, [items, criteria]);

  const renderItem = useCallback(
    (info: DragListRenderItemInfo<{ name: string; title: string }>) => {
      const { item, onDragStart, onDragEnd, isActive } = info;

      return (
        <View className='pt-2'>
          <CriteriaCard
            key={item.name}
            name={item.name}
            title={item.title}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isActive={isActive}
          />
        </View>
      );
    },
    []
  );

  const onReordered = useCallback(
    async (fromIndex: number, toIndex: number) => {
      const copy = [...orderedItems];
      const [removed] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, removed);

      // Update the store with new MAGIQ values based on the new order
      const orderedCriteria: { [key in keyof Criteria]: number } = {} as {
        [key in keyof Criteria]: number;
      };

      copy.forEach((item, index) => {
        orderedCriteria[(item.name + '_value') as keyof Criteria] =
          calculateMagiq(copy.length, index);
      });

      bulkSetValues(orderedCriteria);
    },
    [bulkSetValues, orderedItems]
  );

  return (
    <DragList
      data={orderedItems}
      keyExtractor={s => s.name}
      onReordered={onReordered}
      renderItem={renderItem}
    />
  );
}

interface CriteriaCardProps {
  name: string;
  title: string;
  onDragStart: () => void;
  onDragEnd: () => void;
  isActive: boolean;
}

function CriteriaCard({
  name,
  title,
  onDragStart,
  onDragEnd,
  isActive,
}: CriteriaCardProps) {
  const { criteria, setMax } = useCriteriaStore();
  const isMax = criteria[name + '_max'];

  return (
    <View
      className={`pr-1 rounded-xl flex-row gap-x-3 items-center border ${
        isActive
          ? 'bg-blue-100 border-blue-300 shadow-md'
          : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      <Pressable
        className={`p-4 rounded-lg ${isActive ? 'bg-blue-200' : 'bg-gray-50'}`}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
      >
        <MaterialCommunityIcons
          name='drag'
          size={20}
          color={isActive ? '#1E40AF' : '#6B7280'}
        />
      </Pressable>
      <View className='flex-1 flex-row items-center justify-between gap-x-4'>
        <Text
          className={`flex-1 font-medium leading-5 mr-4 ${
            isActive ? 'text-blue-900 text-base' : 'text-gray-800 text-base'
          }`}
          numberOfLines={2}
        >
          {title}
        </Text>
        {!isActive && (
          <View className='flex-row items-center gap-x-3 flex-shrink-0'>
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
          </View>
        )}
      </View>
    </View>
  );
}
