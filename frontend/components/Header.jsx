import { View, Text, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import Avatar from "../assets/image/user.png";
import icons from "../constants/icons";
import { useNavigation } from "expo-router";

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity className="flex flex-row items-center justify-between p-4 mt-4"
      onPress={() => navigation.navigate("profile")}>
      <View className="flex flex-row gap-2 items-center">
        <Image
          source={user?.avatar ? { uri: user.avatar } : Avatar}
          className="w-[50px] h-[50px] rounded-full border-2 border-customGray "
        />
        <View>
          {/* Changed user?.name to user?.username */}
          <Text className="text-customDark font-semibold ">
            {user?.username || "Guest"}
          </Text>
          <Text className="text-base text-customGray">
            Welcome back!
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Header;