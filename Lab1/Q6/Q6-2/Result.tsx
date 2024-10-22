import {Text, View} from 'react-native';
import {Styles} from '../style';

interface Prop {
  number: number;
}

export default function Result({number}: Prop) {
  return (
    <View style={[Styles.container, {borderWidth: 1, marginTop: 10}]}>
      <Text>{number}</Text>
    </View>
  );
}
