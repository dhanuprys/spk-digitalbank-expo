import { Pressable, ScrollView, Text, TouchableHighlight, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCallback } from "react";
import { useRouter } from "expo-router";
import CriteriaGroup from "@/components/criteria/magiq/criteria-group";

export default function CriteriaMagiqScreen() {
    const router = useRouter();
    const handleBackPress = useCallback(() => {
        router.replace('/');
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="px-4 pt-8 pb-8 flex-row gap-x-2 items-center">
                <Pressable className="p-2 rounded-full" onPress={handleBackPress}>
                    <AntDesign name="arrowleft" size={20} color="black" />
                </Pressable>
                <Text className="font-bold text-2xl">Tentukan Kriteria</Text>
            </View>
            <ScrollView className="flex-1 px-4 pb-32">
                <Text className="font-semibold text-xl mb-4">Level 1</Text>
                <CriteriaGroup
                    items={[
                        {
                            name: 'l1_cg1_a',
                            title: 'Capaian Unggulan',
                        },
                        {
                            name: 'l1_cg1_b',
                            title: 'Gagasan Kreatif'
                        },
                        {
                            name: 'l1_cg1_c',
                            title: 'Bahasa Inggris'
                        }
                    ]} />
                <Text className="font-semibold text-xl mb-4">Level 2</Text>
                <CriteriaGroup
                    items={[
                        {
                            name: 'l2_cg1_a',
                            title: 'Kompetisi',
                        },
                        {
                            name: 'l2_cg1_b',
                            title: 'Pengakuan'
                        },
                        {
                            name: 'l2_cg1_c',
                            title: 'Penghargaan'
                        },
                        {
                            name: 'l2_cg1_d',
                            title: 'Karier Organisasi',
                        },
                        {
                            name: 'l2_cg1_e',
                            title: 'Hasil Karya'
                        },
                        {
                            name: 'l2_cg1_f',
                            title: 'Pemberdayaan / Aksi Kemanusiaan'
                        },
                        {
                            name: 'l2_cg1_g',
                            title: 'Kewirausahaan'
                        }
                    ]} />
                <CriteriaGroup
                    items={[
                        {
                            name: 'l2_cg2_a',
                            title: 'Naskah GK',
                        },
                        {
                            name: 'l2_cg2_b',
                            title: 'Presentasi GK'
                        },
                    ]} />
                <CriteriaGroup
                    items={[
                        {
                            name: 'l2_cg3_a',
                            title: 'Content',
                        },
                        {
                            name: 'l2_cg3_b',
                            title: 'Accuracy'
                        },
                        {
                            name: 'l2_cg3_c',
                            title: 'Fluency'
                        },
                        {
                            name: 'l2_cg3_d',
                            title: 'Pronounciation'
                        },
                        {
                            name: 'l2_cg3_e',
                            title: 'Overall Performance'
                        }
                    ]} />
                <Text className="font-semibold text-xl mb-4">Level 3</Text>
                <CriteriaGroup
                    items={[
                        {
                            name: 'l3_cg1_a',
                            title: 'Penyajian',
                        },
                        {
                            name: 'l3_cg1_b',
                            title: 'Substansi'
                        },
                        {
                            name: 'l3_cg1_c',
                            title: 'Kualitas'
                        }
                    ]} />
                <CriteriaGroup
                    items={[
                        {
                            name: 'l3_cg2_a',
                            title: 'Presentasi',
                        },
                        {
                            name: 'l3_cg2_b',
                            title: 'Tanya Jawab'
                        },
                    ]} />
            </ScrollView>
            <View className="p-4">
                <TouchableHighlight>
                    <View className="bg-blue-500 p-4 rounded-lg flex-row items-center justify-center gap-x-2">
                        <Text className="text-white text-center font-semibold">LANJUTKAN</Text>
                        <AntDesign name="arrowright" size={20} color="white" />
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}
