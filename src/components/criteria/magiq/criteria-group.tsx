import { Pressable, Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import useCriteriaStore, { Criteria } from "@/states/criteria-store";
import DraggableFlatList, { NestableDraggableFlatList, RenderItemParams } from "react-native-draggable-flatlist";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useCallback, useState } from "react";
import { calculateMagiq } from "@/utils/calculate-magiq";
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';

interface CriteriaGroupProps {
    items: {
        name: string;
        title: string;
    }[]
}

export default function CriteriaGroup({ items }: CriteriaGroupProps) {
    const [orderedItems, setOrderedItems] = useState(items);
    const bulkSetValues = useCriteriaStore((state) => state.bulkSetValues);


    const renderItem = useCallback((info: DragListRenderItemInfo<{ name: string; title: string }>) => {
        const {item, onDragStart, onDragEnd, isActive} = info;
    
        return (
            <View className="gap-y-2 pb-2">
                <CriteriaCard
                    key={item.name}
                    name={item.name}
                    title={item.title}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    isActive={isActive}
                />
            </View>
        )
    }, []);

    const onReordered = useCallback(async (fromIndex: number, toIndex: number) => {
        const copy = [...orderedItems]; // Don't modify react OrderedItems in-place
        const [removed] = copy.splice(fromIndex, 1); // Destructure to get the actual item
    
        copy.splice(toIndex, 0, removed); // Insert the actual item at the new position
        setOrderedItems(copy);

        const orderedCriteria: { [key in keyof Criteria]: number } = {} as { [key in keyof Criteria]: number };
        let index = 0;
        for (const item of copy) {
            orderedCriteria[item.name + '_value' as keyof Criteria] = calculateMagiq(copy.length, index);
            index++;
        }

        bulkSetValues(orderedCriteria);
    }, [bulkSetValues, orderedItems]);

    return (
        <DragList
          data={orderedItems}
          keyExtractor={s => s.name}
          className="pb-6"
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

function CriteriaCard({ name, title, onDragStart, onDragEnd, isActive }: CriteriaCardProps) {
    const { criteria, setMax } = useCriteriaStore();
    const isMax = criteria[name + '_max'];

    return (
        <View className={`pr-4 rounded-lg flex-row gap-x-2 items-center ${isActive ? 'bg-blue-200' : 'bg-blue-50'}`}>
            <Pressable
                className={`p-4 rounded-lg ${isActive ? 'bg-blue-200' : 'bg-blue-50'}`}
                onPressIn={onDragStart}
                onPressOut={onDragEnd}
                style={{ transform: [{ scaleY: isActive ? 1.4 : 1 }] }}>
                <MaterialCommunityIcons name="drag" size={24} color="black" />
            </Pressable>
            <View className="flex-1 flex-row justify-between gap-x-4">
                <Text className={`font-semibold ${!isActive ? 'text-sm' : ''}`} numberOfLines={2}>{title}</Text>
                {!isActive && <View className="flex-row items-center gap-x-4">
                    <TouchableOpacity onPress={() => setMax(name, !isMax)}>
                        <View className="flex-row items-center">
                            {
                                isMax
                                    ? <>
                                        <Text
                                            className="font-bold">MAX</Text>
                                        <AntDesign name="arrowup" size={20} color="black" />
                                    </>
                                    : <>
                                        <Text
                                            className="font-bold">MIN</Text>
                                        <AntDesign name="arrowdown" size={20} color="black" />
                                    </>
                            }
                        </View>
                    </TouchableOpacity>
                </View>}
            </View>
        </View>
    );
}