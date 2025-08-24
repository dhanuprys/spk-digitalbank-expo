import { ScrollView, Text, View, Linking, Pressable } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function AboutScreen() {
  const handleContactPress = () => {
    Linking.openURL('mailto:support@spk-simkatmawa.com');
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://spk-simkatmawa.com');
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-8">
        {/* App Description */}
        <View className="bg-blue-50 rounded-lg p-4 mb-4">
          <View className="flex-row items-center gap-x-3 mb-3">
            <View className="p-2 bg-blue-500 rounded-lg">
              <FontAwesome6 name="wand-magic-sparkles" size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-gray-800">SPK Simkatmawa</Text>
              <Text className="text-gray-600 text-sm">Sistem Pendukung Keputusan</Text>
            </View>
          </View>
          <Text className="text-gray-700 text-sm leading-5">
            Aplikasi untuk seleksi mahasiswa berprestasi menggunakan metode MAGIQ dan Manual 
            untuk pengambilan keputusan yang lebih akurat dan objektif.
          </Text>
        </View>

        {/* Features */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-3 px-1">Fitur Utama</Text>
          <View className="space-y-2">
            <View className="flex-row items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="p-1.5 bg-purple-500 rounded-md">
                <MaterialCommunityIcons name="video-input-component" size={16} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-800 text-sm">Metode MAGIQ</Text>
                <Text className="text-gray-600 text-xs">Perhitungan otomatis berdasarkan urutan</Text>
              </View>
            </View>
            
            <View className="flex-row items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="p-1.5 bg-red-500 rounded-md">
                <MaterialCommunityIcons name="hand-pointing-up" size={16} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-800 text-sm">Metode Manual</Text>
                <Text className="text-gray-600 text-xs">Input nilai langsung untuk setiap kriteria</Text>
              </View>
            </View>
            
            <View className="flex-row items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="p-1.5 bg-green-500 rounded-md">
                <MaterialCommunityIcons name="chart-line" size={16} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-800 text-sm">Analisis Hasil</Text>
                <Text className="text-gray-600 text-xs">Grafik dan tabel untuk evaluasi</Text>
              </View>
            </View>
            
            <View className="flex-row items-center gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="p-1.5 bg-yellow-500 rounded-md">
                <MaterialCommunityIcons name="drag" size={16} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-800 text-sm">Drag & Drop</Text>
                <Text className="text-gray-600 text-xs">Pengaturan urutan kriteria yang mudah</Text>
              </View>
            </View>
          </View>
        </View>

        {/* How It Works */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-3 px-1">Cara Kerja</Text>
          <View className="space-y-2">
            <View className="flex-row items-start gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="w-5 h-5 bg-blue-500 rounded-full items-center justify-center mt-0.5">
                <Text className="text-white text-xs font-bold">1</Text>
              </View>
              <Text className="flex-1 text-gray-700 text-sm">Pilih metode perhitungan (MAGIQ atau Manual)</Text>
            </View>
            
            <View className="flex-row items-start gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="w-5 h-5 bg-blue-500 rounded-full items-center justify-center mt-0.5">
                <Text className="text-white text-xs font-bold">2</Text>
              </View>
              <Text className="flex-1 text-gray-700 text-sm">Atur kriteria dan nilai sesuai kebutuhan</Text>
            </View>
            
            <View className="flex-row items-start gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="w-5 h-5 bg-blue-500 rounded-full items-center justify-center mt-0.5">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
              <Text className="flex-1 text-gray-700 text-sm">Sistem menghitung dan memberikan rekomendasi</Text>
            </View>
            
            <View className="flex-row items-start gap-x-3 p-3 bg-gray-50 rounded-lg">
              <View className="w-5 h-5 bg-blue-500 rounded-full items-center justify-center mt-0.5">
                <Text className="text-white text-xs font-bold">4</Text>
              </View>
              <Text className="flex-1 text-gray-700 text-sm">Lihat hasil dalam grafik atau tabel</Text>
            </View>
          </View>
        </View>

        {/* Contact & Support */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-3 px-1">Kontak & Dukungan</Text>
          
          <Pressable 
            className="flex-row items-center gap-x-3 p-3 bg-gray-50 rounded-lg mb-2"
            onPress={handleContactPress}
          >
            <AntDesign name="mail" size={16} color="#6B7280" />
            <Text className="text-gray-700 text-sm">support@spk-simkatmawa.com</Text>
            <AntDesign name="arrowright" size={14} color="#6B7280" className="ml-auto" />
          </Pressable>
          
          <Pressable 
            className="flex-row items-center gap-x-3 p-3 bg-gray-50 rounded-lg"
            onPress={handleWebsitePress}
          >
            <AntDesign name="link" size={16} color="#6B7280" />
            <Text className="text-gray-700 text-sm">www.spk-simkatmawa.com</Text>
            <AntDesign name="arrowright" size={14} color="#6B7280" className="ml-auto" />
          </Pressable>
        </View>

        {/* Footer */}
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-center text-gray-600 text-xs leading-4 mb-2">
            SPK Simkatmawa dikembangkan untuk membantu institusi pendidikan 
            dalam proses seleksi mahasiswa berprestasi dengan lebih objektif dan efisien.
          </Text>
          <Text className="text-center text-gray-500 text-xs">
            © 2024 SPK Simkatmawa. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}