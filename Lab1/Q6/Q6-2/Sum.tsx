import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Styles} from '../style';
import Result from './Result';

export default function Sum() {
  const [isShowResult, setIsShowResult] = useState(false);
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState(0);

  function handleClick(): void {
    const first = parseInt(number.toString().at(0) || '');
    const last = parseInt(
      number.toString().at(number.toString().length - 1) || '',
    );
    setResult(first + last);
    setIsShowResult(true);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <Text style={Styles.title}>Enter number:</Text>
        <TextInput
          value={number.toString()}
          onChangeText={text => setNumber(parseInt(text))}
          style={Styles.input}
          keyboardType="numeric"
          placeholder="Number"
        />
        <TouchableOpacity style={Styles.button} onPress={handleClick}>
          <Text style={Styles.buttonText}>Done</Text>
        </TouchableOpacity>
        {isShowResult && <Result number={result} />}
      </View>
    </ScrollView>
  );
}
