import {useState} from 'react';
import {Button, ScrollView, View} from 'react-native';
import {Styles} from '../style';
import {TextInput} from 'react-native-paper';
import Result from './Result';

export default function Min() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);
  const [result, setResult] = useState(0);
  const [isShowResult, setIsShowResult] = useState(false);

  function handleClick(): void {
    const numbers = [number1, number2, number3];
    numbers.sort((n1, n2) => n1 - n2);
    setResult(numbers[0]);
    setIsShowResult(true);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <TextInput
          placeholder="Number1"
          value={number1.toString()}
          keyboardType="numeric"
          onChangeText={text => {
            setNumber1(parseInt(text) || 0);
          }}
        />
        <TextInput
          placeholder="Number2"
          value={number2.toString()}
          keyboardType="numeric"
          onChangeText={text => {
            setNumber2(parseInt(text) || 0);
          }}
        />
        <TextInput
          placeholder="Number3"
          value={number3.toString()}
          keyboardType="numeric"
          onChangeText={text => {
            setNumber3(parseInt(text) || 0);
          }}
        />
        <Button title="Find min" onPress={handleClick} />
        {isShowResult && <Result min={result} />}
      </View>
    </ScrollView>
  );
}
