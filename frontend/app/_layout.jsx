import { View, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthProvider, AuthContext } from "../context/Authcontext";
import { Slot, useRouter } from "expo-router";
import "../global.css";

const RootLayout = () => {
  return (
    <AuthProvider>
      <AuthWrapper>
        <Slot />
      </AuthWrapper>
    </AuthProvider>
  );
};

const AuthWrapper = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/');
      }
    }
  }, [loading, user]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return children;
};

export default RootLayout;