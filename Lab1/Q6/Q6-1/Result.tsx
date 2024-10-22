import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Styles} from '../style';

interface Prop {
  name: string;
  age: number;
  occupation: string;
}
export default function Result({name, age, occupation}: Prop) {
  return (
    <View style={[Styles.container, {borderWidth: 1, marginTop: 10}]}>
      <Text>Full Name:{name}</Text>
      <Text>Age: {age}</Text>
      <Text>Occupation: {occupation}</Text>
    </View>
  );
}
