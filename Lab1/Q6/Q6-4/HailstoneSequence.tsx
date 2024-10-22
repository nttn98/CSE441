import {useState} from 'react';
import {Button, ScrollView, View} from 'react-native';
import {Styles} from '../style';
import {TextInput} from 'react-native-paper';
import Result from './Result';

export default function HailstoneSequence() {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState<number[]>([]);
  const [isShowResult, setIsShowResult] = useState(false);

  function handleClick() {
    const numbers = [];
    let rs = number;
    while (rs > 1) {
      if (rs % 2 === 0) {
        rs = rs / 2;
      } else {
        rs = rs * 3 + 1;
      }
      numbers.push(rs);
    }
    setResult(numbers);
    setIsShowResult(true);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <TextInput
          keyboardType="numeric"
          placeholder="Enter number"
          value={number.toString()}
          onChangeText={text => setNumber(parseInt(text) || 0)}
        />
        <Button title="Excute" onPress={handleClick} />
        {isShowResult && <Result result={result} />}
      </View>
    </ScrollView>
  );
}
