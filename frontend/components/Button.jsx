import { View, Text, TouchableOpacity } from 'react-native'

const Button = ({ title,handlePress }) => {
  return (
    <View>
      <TouchableOpacity className="bg-customDark py-3 px-20 w-full rounded-[10px] mb-4" onPress={handlePress}>
        <Text className="font-bold text-customLight text-lg text-center">{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Button;
