import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import useCriteriaStore from "@/states/criteria-store";

interface CriteriaGroupProps {
    items: {
        name: string;
        title: string;
    }[]
}

export default function CriteriaGroup({ items }: CriteriaGroupProps) {
    return (
        <View className="gap-y-2 mb-6">
            {items.map((item) => (
                <CriteriaCard
                    key={item.name}
                    name={item.name}
                    title={item.title} />
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
        <View className="p-4 bg-blue-50 rounded-lg flex-row items-center justify-between">
            <Text className="font-semibold text-sm" numberOfLines={2}>{title}</Text>
            <View className="flex-row items-center gap-x-4">
                <TouchableOpacity onPress={() => setMax(name, !isMax) }>
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
                <TextInput
                    keyboardType="number-pad"
                    value={String(criteria[name + '_value'])}
                    onChange={(e) => setValue(name, parseInt(e.nativeEvent.text) || 0)}
                    className="border rounded-lg w-20 text-center bg-gray-100" />
            </View>
        </View>
    );
}