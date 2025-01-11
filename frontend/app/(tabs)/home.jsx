import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import PostCard from "../../components/PostCard";
import { getServerUrl } from "../../constants/API";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchPrompts = async () => {
    try {
      const response = await fetch(`${getServerUrl()}/api/prompt/all-prompts`);
      const data = await response.json();
      if (response.ok) {
        setPrompts(data);
      } else {
        Alert.alert("Error", data.message || "Failed to fetch prompts");
        setError(data.message || "Failed to fetch prompts");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong while fetching prompts");
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPrompts();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </SafeAreaView>
    );
  }

  const categories = ["All", "Technology", "Books", "Social"];

  
  const filteredPrompts =
    selectedCategory === "All"
      ? prompts
      : prompts.filter((prompt) => {
          const tagsArray = prompt.tags
            .split(',')
            .map(tag => tag.trim().toLowerCase());
          return tagsArray.includes(selectedCategory.toLowerCase());
        });

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Component */}
      <Header />
      {/* Categories */}
      <View className="flex-row justify-around my-4">
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category ? "bg-customDark" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedCategory === category ? "text-white" : "text-gray-800"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Prompts List */}
      <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 80 }}>
        {filteredPrompts.map((prompt) => (
          <PostCard
            key={prompt._id}
            title={prompt.title}
            content={prompt.content}
            author={prompt.author}
            avatar={prompt.avatar}
            authorName={prompt.authorName}
            createdAt={prompt.createdAt}
            tags={prompt.tags}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;