import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import SharedHeader from "@/components/shared/header";
import useCriteriaStore from "@/states/criteria-store";

interface FilterOption {
    value: number;
    label: string;
}

interface DisplayFormat {
    key: 'grafik' | 'tabel';
    label: string;
    icon: string;
}

const RESULT_LIMIT_OPTIONS: FilterOption[] = [
    { value: 5, label: '5 teratas' },
    { value: 10, label: '10 teratas' },
    { value: 15, label: '15 teratas' },
    { value: 20, label: '20 teratas' }
];

const DISPLAY_FORMAT_OPTIONS: DisplayFormat[] = [
    { key: 'grafik', label: 'Grafik', icon: 'barschart' },
    { key: 'tabel', label: 'Tabel', icon: 'table' }
];

interface RadioButtonProps {
    selected: boolean;
    onPress: () => void;
    label: string;
}

const RadioButton = ({ selected, onPress, label }: RadioButtonProps) => (
    <Pressable 
        className={`p-4 rounded-xl border-2 flex-row items-center gap-x-4 ${
            selected 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white'
        }`} 
        onPress={onPress}
        style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 }
        ]}
    >
        <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
            selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
        }`}>
            {selected && <View className="w-3 h-3 rounded-full bg-white" />}
        </View>
        <Text className={`text-base font-medium ${
            selected ? 'text-blue-700' : 'text-gray-700'
        }`}>
            {label}
        </Text>
        {selected && (
            <View className="ml-auto">
                <AntDesign name="checkcircle" size={20} color="#3B82F6" />
            </View>
        )}
    </Pressable>
);

interface CheckboxProps {
    checked: boolean;
    onPress: () => void;
    label: string;
    icon: string;
}

const Checkbox = ({ checked, onPress, label, icon }: CheckboxProps) => (
    <Pressable 
        className={`p-4 rounded-xl border-2 flex-row items-center gap-x-4 ${
            checked 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 bg-white'
        }`} 
        onPress={onPress}
        style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 }
        ]}
    >
        <View className={`w-6 h-6 rounded border-2 items-center justify-center ${
            checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
        }`}>
            {checked && <AntDesign name="check" size={16} color="white" />}
        </View>
        <View className="flex-row items-center gap-x-3">
            <AntDesign name={icon as any} size={20} color={checked ? "#3B82F6" : "#6B7280"} />
            <Text className={`text-base font-medium ${
                checked ? 'text-blue-700' : 'text-gray-700'
            }`}>
                {label}
            </Text>
        </View>
        {checked && (
            <View className="ml-auto">
                <AntDesign name="checkcircle" size={20} color="#3B82F6" />
            </View>
        )}
    </Pressable>
);

interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
    description?: string;
}

const FilterSection = ({ title, children, description }: FilterSectionProps) => (
    <View className="mb-8">
        <View className="mb-6">
            <Text className="font-bold text-xl text-gray-800 mb-2">{title}</Text>
            {description && (
                <Text className="text-gray-500 text-sm leading-5">{description}</Text>
            )}
        </View>
        <View className="space-y-3">
            {children}
        </View>
    </View>
);

export default function FilterScreen() {
    const router = useRouter();
    const { criteria, showGraphic, showTable, setDisplayFormats } = useCriteriaStore();
    const { criteriaInputType } = useLocalSearchParams<{ criteriaInputType: 'manual' | 'magiq' }>();

    const handleBackPress = useCallback(() => {
        router.back();
    }, [router]);

    const handleLimitChange = useCallback((limit: number) => {
        useCriteriaStore.getState().bulkSetValues({ limit } as any);
    }, []);

    const handleFormatToggle = useCallback((format: 'grafik' | 'tabel') => {
        const currentFormats = {
            grafik: showGraphic,
            tabel: showTable
        };
        
        const newFormats = {
            ...currentFormats,
            [format]: !currentFormats[format]
        };
        
        if (newFormats.grafik === false && newFormats.tabel === false) {
            newFormats[format] = true;
        }
        
        setDisplayFormats(newFormats);
    }, [showGraphic, showTable, setDisplayFormats]);

    const handleApplyFilters = useCallback(() => {
        router.push('/criteria/result');
    }, [router]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <SharedHeader
                title="Filter"
                subtitle="Atur preferensi tampilan hasil"
                onBackPress={handleBackPress}
            />
            
            {/* Filter Options */}
            <View className="px-6 pt-4 flex-1">
                <FilterSection 
                    title="Jumlah hasil maksimal"
                    description="Pilih berapa banyak hasil yang ingin ditampilkan"
                >
                    {RESULT_LIMIT_OPTIONS.map((option) => (
                        <RadioButton
                            key={option.value}
                            selected={criteria.limit === option.value}
                            onPress={() => handleLimitChange(option.value)}
                            label={option.label}
                        />
                    ))}
                </FilterSection>

                <FilterSection 
                    title="Tampilkan dalam bentuk"
                    description="Pilih format tampilan yang diinginkan"
                >
                    {DISPLAY_FORMAT_OPTIONS.map((format) => (
                        <Checkbox
                            key={format.key}
                            checked={format.key === 'grafik' ? showGraphic : showTable}
                            onPress={() => handleFormatToggle(format.key)}
                            label={format.label}
                            icon={format.icon}
                        />
                    ))}
                </FilterSection>
            </View>
            
            {/* Sticky Bottom Button */}
            <View className="px-6 py-6 bg-white border-t border-gray-100">
                <Pressable onPress={handleApplyFilters}>
                    <View className="bg-blue-500 py-2 rounded-xl flex-row items-center justify-center gap-x-3 shadow-md">
                        <View className="bg-blue-400 p-2 rounded-full">
                            <AntDesign name="arrowright" size={15} color="white" />
                        </View>
                        <Text className="text-white font-semibold text-base">Dapatkan rekomendasi</Text>
                    </View>
                </Pressable>
                
                <Text className="text-center text-gray-500 text-sm mt-4 px-4 leading-5">
                    Berdasarkan kriteria yang telah dipilih, kami akan memberikan rekomendasi terbaik untuk Anda
                </Text>
            </View>
        </SafeAreaView>
    );
}