import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import Logo from "../../components/Logo";
import FormField from "../../components/FormField";
import Button from "../../components/Button";
import { AuthContext } from "../../context/Authcontext";
import { getServerUrl } from "../../constants/API";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    if (!password) {
      newErrors.password = "Password is required";
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
      const response = await fetch(`${getServerUrl()}/api/user/login-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401 || response.status === 403) {
        const errorData = await response.text();
        Alert.alert("Error", errorData || "Authentication failed");
        throw new Error(errorData);
      }

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          Alert.alert("Error", data.message || "Something went wrong");
        }
        throw new Error();
      }

      login(data.user, data.token);
      Alert.alert("Success", "Login successful");
      router.push("/home");
    } catch (error) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6 min-h-[85vh]">
          <Logo />
          <Text className="my-8 mt-10 text-2xl font-semibold text-center text-customDark">
            Sign In to PromptsBoard
          </Text>
          <FormField
            title="Email"
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            errorMessage={errors.email}
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
              <ActivityIndicator size="large" color="cyan" />
            ) : (
              <Button
                title="Sign In"
                handlePress={handleSubmit}
                containerStyle="mt-10"
              />
            )}
          </View>

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-customDark">
              Don't have an account?
            </Text>
            <Link
              href="/signup"
              className="text-lg font-bold text-customGreen"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;