import { Text, View, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  Easing
} from "react-native-reanimated";
import { useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Index() {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const footerOpacity = useSharedValue(0);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
    };
  });

  const footerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: footerOpacity.value,
    };
  });

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    
    setTimeout(() => {
      cardOpacity.value = withTiming(1, { duration: 600 });
    }, 300);

    setTimeout(() => {
      footerOpacity.value = withTiming(1, { duration: 600 });
    }, 800);
  });

  const handlePress = () => {
    scale.value = withSpring(0.97, { damping: 10 });
    setTimeout(() => {
      scale.value = withSpring(1, { damping: 10 });
    }, 150);
  };

  const openGitHub = () => {
    Linking.openURL('https://github.com/beetlejusse');
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#0A0A0F]">
      <View className="items-center justify-center z-10 px-6 w-full max-w-md">
        <Animated.View style={cardAnimatedStyle} className="mb-8">
          <Image
            source={require("../assets/images/react-logo.png")}
            style={{ width: 100, height: 100 }}
            contentFit="contain"
          />
        </Animated.View>
        
        <Animated.View style={contentAnimatedStyle} className="w-full">
          <BlurView intensity={20} tint="dark" className="rounded-2xl overflow-hidden w-full">
            <View className="px-6 py-8 border border-[#4F46E5]/20 rounded-2xl bg-[#13131A]/80">
              <Text className="text-2xl font-bold text-white text-center mb-4">
                React Native Starter Kit
              </Text>
              
              <Text className="text-[#A5B4FC] text-center mb-8">
                A modern foundation for your next mobile app with Expo and NativeWind
              </Text>
              
              <View className="space-y-3">
                <TouchableOpacity 
                  onPress={handlePress} 
                  activeOpacity={0.9}
                >
                  <View className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] py-4 rounded-xl items-center flex-row justify-center space-x-2">
                    <Text className="text-white font-bold">Get Started</Text>
                    <AntDesign name="arrowright" size={16} color="white" />
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={handlePress} 
                  activeOpacity={0.9}
                >
                  <View className="border border-[#4F46E5]/30 bg-[#1E1E2D]/40 py-4 rounded-xl items-center">
                    <Text className="text-[#A5B4FC] font-bold">Documentation</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        <Animated.View style={footerAnimatedStyle} className="mt-8">
          <TouchableOpacity onPress={openGitHub} className="flex-row items-center space-x-1">
            <Text className="text-[#A5B4FC] text-xs">made with ❤️ by </Text>
            <Text className="text-[#A5B4FC] text-xs font-bold">@beetlejusse</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
