import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";

const TabsIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color,  width: focused ? 30 : 24, 
          height: focused ? 30 : 24,  marginTop:focused?15:30 }}
      />
      <Text
        className={`${focused ? "font-normal" : "font-normal"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#00CD8E",
        tabBarInactiveTintColor: "#F0F0F0",
        tabBarStyle: {
          backgroundColor: "#082638",
          borderRadius: 20, // Make the background rounded
          marginHorizontal: 16, // Add spacing on the sides
          marginBottom: 10, // Add spacing at the bottom
          position: "absolute", // Make it float
          height: 70, // Adjust height
          borderTopWidth: 0, // Remove top border
        },
        tabBarItemStyle: {
          justifyContent: "center", // Center items vertically
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon
              icon={icons.home}
              name="Home"
              color={color}
              focused={focused}
              
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Find"
        options={{
          title: "Find",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon
              icon={icons.search}
              name="Find"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon
              icon={icons.plus}
              name="Create"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabsIcon
              icon={icons.profile}
              name="Profile"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
     
    </Tabs>
  );
};


export default TabsLayout;