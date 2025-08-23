import SharedHeader from "@/components/shared/header";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultScreen() {
    const router = useRouter();
    const handleBackPress = useCallback(() => {
        router.back();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <SharedHeader
                title="Hasil Rekomendasi"
                subtitle="Berdasarkan kriteria yang telah dipilih"
                onBackPress={handleBackPress}
            />
        </SafeAreaView>
    );
}