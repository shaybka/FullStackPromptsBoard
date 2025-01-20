import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { getServerUrl } from '../../constants/API';
import PostCard from '../../components/PostCard';

const Find = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${getServerUrl()}/api/prompt/search-prompts?title=${searchQuery}`);
      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch search results');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while fetching search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-8 ">
      <Text className="text-2xl font-bold mb-4">Find Prompts</Text>
      <View className="flex-row mb-4">
        <TextInput
          className="flex-1 border border-gray-300 rounded-md p-2"
          placeholder="Search prompts by title"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          className="bg-customGreen p-2 rounded-md ml-2"
          onPress={handleSearch}
        >
          <Text className="text-white">Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <ScrollView>
          {results.length > 0 ? (
            results.map((prompt) => (
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
            ))
          ) : (
            <Text className="text-center text-gray-500">No results found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Find;