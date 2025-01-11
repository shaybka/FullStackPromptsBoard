import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from "react-native";
import { AuthContext } from "../../context/Authcontext";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultAvatar from "../../assets/image/user.png";
import PostCard from "../../components/PostCard";
import { getServerUrl } from "../../constants/API";
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native"; 

const Profile = () => {
  const { logout, user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Define the fetch function
  const fetchUserPosts = async () => {
    if (user && user._id) {
      try {
        const response = await fetch(
          `${getServerUrl()}/api/prompt/user-prompts/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Use useFocusEffect to fetch posts when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchUserPosts();
    }, [user, token])
  );

  const handleEdit = (post) => {
    router.push({
      pathname: "/create",
      params: { post: JSON.stringify(post) },
    });
  };

  const handleDelete = (postId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: true }
    );
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `${getServerUrl()}/api/prompt/delete-prompt/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        let errorMessage = "Failed to delete post";
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } else {
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        Alert.alert("Error", errorMessage);
        throw new Error(errorMessage);
      }

      Alert.alert("Success", "Post deleted successfully");
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-primary">
        <Text className="text-lg text-white">
          Please log in to view your profile.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex flex-row justify-between items-center px-4 py-3 ">
        <Header title="My Profile" style={{ color: "white", fontSize: 22 }} />
        <TouchableOpacity onPress={logout}>
          <Text className="text-lg text-customDark">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-gray-100 mt-4">
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" className="mt-4" />
        ) : (
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {posts.map((post) => (
              <View
                key={post._id}
                className="mb-20 p-4 bg-white rounded-lg shadow-lg border border-gray-200"
              >
                <PostCard
                  title={post.title}
                  content={post.content}
                  author={post.author}
                  avatar={post.avatar}
                  authorName={post.authorName}
                  createdAt={post.createdAt}
                  tags={post.tags}
                />
                <View className="flex flex-row justify-end mt-3">
                  <TouchableOpacity
                    onPress={() => handleEdit(post)}
                    className="mr-3 px-4 py-2 bg-customGreen rounded-md"
                  >
                    <Text className="text-white">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(post._id)}
                    className="px-4 py-2 bg-customDark rounded-md"
                  >
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;