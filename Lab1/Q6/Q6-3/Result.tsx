import {Text, View} from 'react-native';
import {Styles} from '../style';

interface Prop {
  min: number;
}

export default function Result({min}: Prop) {
  return (
    <View style={[Styles.container, {borderWidth: 1, marginTop: 10}]}>
      <Text>{min}</Text>
    </View>
  );
}
