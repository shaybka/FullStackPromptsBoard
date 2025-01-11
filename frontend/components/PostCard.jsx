import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Avatar from '../assets/image/user.png'; 
import icons from "../constants/icons";
import * as Clipboard from 'expo-clipboard'; 

const PostCard = ({ title, content, author, avatar, authorName, createdAt, tags }) => {
  
  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(content);
     
    } catch (error) {
      Alert.alert('Error', 'Failed to copy content');
      console.error('Clipboard Error:', error);
    }
  };

  return (
    <View className="bg-white py-6 px-4 rounded-lg border border-customGray/20 mt-2 shadow-lg">
      <View className="flex-row items-center mb-3">
        <Image
          source={avatar ? { uri: avatar } : Avatar} // Use default avatar if none provided
          className="w-10 h-10 rounded-full mr-3"
        />
        <View>
          <Text className="text-gray-800 font-semibold text-lg">{authorName}</Text>
          <Text className="text-gray-500 text-xs">{new Date(createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text className="text-black text-2xl font-bold mb-2">
        {title}
      </Text>
      <Text className="text-gray-700 text-sm mb-4">
        {content}
      </Text>
      <View className="flex-row flex-wrap">
        {tags.split(',').map((tag, index) => (
          <View key={index} className="bg-blue-100 px-2 py-1 mr-2 mb-2 rounded-full">
            <Text className="text-blue-800 text-xs">{tag.trim()}</Text>
          </View>
        ))}
        <TouchableOpacity onPress={handleCopy} className="ml-auto" accessibilityLabel="Copy content">
          <Image
            source={icons.duplicate}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostCard;