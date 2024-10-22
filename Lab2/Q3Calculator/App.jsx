import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from './style';

export default function App() {
  const [display, setDisplay] = useState('0');

  const handlePress = input => {
    if (input === 'C') {
      setDisplay('0');
    } else if (input === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(prev => (prev === '0' ? input : prev + input));
    }
  };

  const renderButton = value => (
    <TouchableOpacity style={styles.button} onPress={() => handlePress(value)}>
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.row}>
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
        {renderButton('/')}
      </View>
      <View style={styles.row}>
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
        {renderButton('*')}
      </View>
      <View style={styles.row}>
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
        {renderButton('-')}
      </View>
      <View style={styles.row}>
        {renderButton('0')}
        {renderButton('C')}
        {renderButton('+')}
        {renderButton('=')}
      </View>
    </View>
  );
}
