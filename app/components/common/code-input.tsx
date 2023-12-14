import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import colors from '../../config/colors';

const CodeInput = ({ onChange }: { onChange: any }) => {
  const [code, setCode] = useState('');
  const inputs = useRef<any[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    // Update the code at the given index
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode.join(''));
    onChange(newCode.join(''));
  
    // Automatically focus on the next input if there is one
    if (value && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(value) => handleCodeChange(index, value)}
          value={code[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.gray,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: colors.mgray,
    textAlign: 'center',
    color: colors.maranduGreen,
    margin: 5,
  },
});

export default CodeInput;
