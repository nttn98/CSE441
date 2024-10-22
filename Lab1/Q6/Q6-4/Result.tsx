import {Text, View} from 'react-native';
import {Styles} from '../style';

interface Prop {
  result: number[];
}

export default function Result({result}: Prop) {
  console.log('hehe');

  return (
    <View style={[Styles.container, {borderWidth: 1, marginTop: 10}]}>
      <Text>{result.toString()}</Text>
    </View>
  );
}
