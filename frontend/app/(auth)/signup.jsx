import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import Logo from "../../components/Logo";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { AuthContext } from "../../context/Authcontext";
import { getServerUrl } from "../../constants/API";
import * as ImagePicker from 'expo-image-picker';
import defaultAvatar from "../../assets/image/user.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      return setErrors(formErrors);
    }
    setSubmitting(true);
    setErrors({});
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password);
      if (avatar) {
        formData.append("avatar", {
          uri: avatar,
          type: "image/jpeg",
          name: "avatar.jpg",
        });
      } 

      const response = await fetch(`${getServerUrl()}/api/user/register-user`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
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

      Alert.alert("Success", "User registered successfully");
      login(data.user, data.token);
      router.replace('/signin');
    } catch (error) {
      console.error(error.message);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6 min-h-[85vh]">
          <Logo />
          <Text className="my-8 mt-10 text-2xl font-semibold text-center text-customDark">
            Sign Up to PromptsBoard
          </Text>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={avatar ? { uri: avatar } : defaultAvatar}
              className="self-center w-24 h-24 mb-4 rounded-full"
            />
            <Text className="text-center text-customGreen">Choose Avatar</Text>
          </TouchableOpacity>
          <FormField
            title="Email"
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            errorMessage={errors.email}
          />
          <FormField
            title="Username"
            value={username}
            placeholder="Enter your username"
            onChangeText={(text) => setUsername(text)}
            errorMessage={errors.username}
          />
          <FormField
            title="Password"
            value={password}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            errorMessage={errors.password}
          />
          <View className="mt-8">
            {submitting ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <Button
                title="Sign Up"
                handlePress={handleSubmit}
                containerStyle="mt-10"
              />
            )}
          </View>

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-customDark">
              Already have an account?
            </Text>
            <Link
              href="/signin"
              className="text-lg font-bold text-customGreen"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;