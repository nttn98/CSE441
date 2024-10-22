import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import Styles from './css/style';

const App = () => {
  const [income, setIncome] = useState('');
  const [tax, setTax] = useState('');

  const calculateTax = () => {
    const incomeAmont = parseFloat(income);

    if (isNaN(incomeAmont) || incomeAmont < 0) {
      setTax('Invalid income');
      return;
    }

    let taxAmount = 0;
    if (incomeAmont <= 10000000) {
      taxAmount = incomeAmont * 0.1;
    } else if (incomeAmont <= 50000000) {
      taxAmount = 10000000 * 0.1 + (incomeAmont - 10000) * 0.2;
    } else {
      taxAmount =
        10000000 * 0.1 + 40000000 * 0.2 + (incomeAmont - 50000000) * 0.3;
    }
    setTax(`Income Tax: ${taxAmount.toFixed(2)}đ`);
  };
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Income Tax Calculator</Text>
      <TextInput
        textAlign="right"
        style={Styles.input}
        placeholder="Enter your income"
        keyboardType="numeric"
        value={income}
        onChangeText={text => setIncome(text)}
      />
      <Button title="Calculate Tax" onPress={calculateTax} />
      <Text style={Styles.result}>{tax}</Text>
    </View>
  );
};

export default App;
