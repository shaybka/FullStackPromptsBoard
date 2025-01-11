import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import heroImage from '../assets/image/hero.png';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { Link, useRouter } from 'expo-router';

export default function App() {
    const router = useRouter();
  return (
    <View className="flex-1 bg-white px-6  items-center h-full py-20 justify-between">
    {/* Header */}
    <View>
      <Logo/>
    </View>

    {/* Image */}
    <View className="items-center">
      <Image
        source={heroImage}
        className="w-100 h-100 rounded-xl"
      />
    </View>

    {/* Text Content */}
    <View>
      <Text className="text-4xl font-semibold text-center text-customDark mb-2">
      Unlocking creativity, one prompt at a time
      </Text>
      <Text className="text-center text-gray-500 font-mono">
      Explore the latest prompts, ideas, and insights on creativity, education, culture, and technology.
      </Text>
    </View>

    {/* Sign Up Button */}
    <View className="items-center w-full">
      <Button title="sing up with email"  handlePress={() => router.push("/signup")}/>
      <Text className="text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="signin" className="text-customGreen font-bold">Sign In</Link>
      </Text>
    </View>
    <StatusBar style='auto'/>
  </View>
  
  );
}

