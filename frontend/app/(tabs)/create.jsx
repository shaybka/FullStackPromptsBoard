import { View, Text, SafeAreaView, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useState, useContext, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router"; 
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { AuthContext } from "../../context/Authcontext";
import { getServerUrl } from "../../constants/API";
import Logo from "../../components/Logo";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const { post } = useLocalSearchParams(); 

  useEffect(() => {
    if (post) {
      const existingPost = JSON.parse(post);
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setTags(existingPost.tags);
    }
  }, [post]);

  const validateForm = () => {
    const newErrors = {};
    if (!title) {
      newErrors.title = "Title is required";
    }
    if (!content) {
      newErrors.content = "Content is required";
    }
    if (!tags) {
      newErrors.tags = "Tags are required";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      return setErrors(formErrors);
    }
    setSubmitting(true);
    setErrors({});
    try {
      const isEdit = !!post;
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit
        ? `${getServerUrl()}/api/prompt/update-prompt/${JSON.parse(post)._id}`
        : `${getServerUrl()}/api/prompt/create-prompt`;

      const response = await fetch(url, { 
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ title, content, tags }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          Alert.alert("Error", data.message || "Something went wrong");
        }
        throw new Error();
      }

      Alert.alert("Success", isEdit ? "Prompt updated successfully" : "Prompt created successfully");
      setTitle("");
      setContent("");
      setTags("");
      router.push('/home'); 
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Logo />
        <Text className="mt-2 text-sm text-center text-gray-500">
          {post ? "Edit the details below to update the prompt" : "Fill in the details below to create a new prompt"}
        </Text>

        <FormField
          title="Title"
          value={title}
          placeholder="Enter prompt title"
          onChangeText={(text) => setTitle(text)}
          errorMessage={errors.title}
        />
        <FormField
          title="Content"
          value={content}
          placeholder="Enter prompt content"
          onChangeText={(text) => setContent(text)}
          errorMessage={errors.content}
          multiline={true}
          height="h-40"
        />
        <FormField
          title="Tags"
          value={tags}
          placeholder="Enter tags separated by commas"
          onChangeText={(text) => setTags(text)}
          errorMessage={errors.tags}
        />
        <View className="mt-8">
          {submitting ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <Button
              title={post ? "Update Prompt" : "Create Prompt"}
              handlePress={handleSubmit}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
