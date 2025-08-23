import { Pressable, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface SharedHeaderProps {
    title: string;
    subtitle?: string;
    onBackPress: () => void;
    showBackButton?: boolean;
}

export default function SharedHeader({ 
    title, 
    subtitle, 
    onBackPress, 
    showBackButton = true 
}: SharedHeaderProps) {
    return (
        <View className="bg-white border-b border-gray-100">
            <View className="px-6 pt-6 pb-6 flex-row items-center gap-x-4">
                {showBackButton && (
                    <Pressable 
                        className="p-3 rounded-full bg-gray-50 active:bg-gray-100" 
                        onPress={onBackPress}
                    >
                        <AntDesign name="arrowleft" size={20} color="#374151" />
                    </Pressable>
                )}
                
                <View className="flex-1">
                    <Text className="font-bold text-2xl text-gray-800 mb-1">{title}</Text>
                    {subtitle && (
                        <Text className="text-gray-500 text-sm leading-5">{subtitle}</Text>
                    )}
                </View>
            </View>
        </View>
    );
}
