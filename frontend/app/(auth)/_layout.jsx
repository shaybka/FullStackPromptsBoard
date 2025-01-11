import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack

      >
        <Stack.Screen
           name="signin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
        <StatusBar backgroundColor='#161622' style='light'/>
      </Stack>
    </>
  );
};

export default AuthLayout;
