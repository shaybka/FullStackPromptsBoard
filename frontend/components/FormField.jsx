import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const FormField = ({
  title,
  multiline,
  height,
  placeholder,
  value,
  keyboardType,
  onChangeText,
  secureTextEntry,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="space-y-2">
      {/* Title */}
      <Text className="text-base font-semibold text-customDark px-4 my-2">
        {title}
      </Text>

      {/* Input Container */}
      <View
        className={`w-full px-4 rounded-md border-2 flex flex-row items-center bg-white ${
          errorMessage
            ? 'border-red-100'
            : isFocused
            ? 'border-customDark' // Active color
            : 'border-customGray/20'
        } ${height}`}
      >
        <TextInput
          className={`flex-1 text-base text-customDark`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b7b"
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          style={multiline ? { textAlignVertical: 'top', paddingVertical: 10 } : {}}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>

      {/* Error Message */}
      {errorMessage && (
        <Text className="text-textError text-sm px-4 mt-2">{errorMessage}</Text>
      )}
    </View>
  );
};

export default FormField;