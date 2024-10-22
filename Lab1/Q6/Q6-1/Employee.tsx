import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Styles} from '../style';
import {useState} from 'react';
import Result from './Result';

export default function Employee() {
  const [result, setResult] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [occupation, setOccupation] = useState('');

  const handleClick = () => {
    setResult(true);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <Text style={Styles.title}>Employee Information</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={Styles.input}
          placeholder="Full name"
        />
        <TextInput
          value={age.toString()}
          keyboardType="numeric"
          onChangeText={text => setAge(parseInt(text))}
          style={Styles.input}
          placeholder="Age"
        />
        <TextInput
          value={occupation}
          onChangeText={setOccupation}
          style={Styles.input}
          placeholder="Occupation specialized"
        />

        <TouchableOpacity style={Styles.button} onPress={handleClick}>
          <Text style={Styles.buttonText}>Done</Text>
        </TouchableOpacity>
        {result && <Result name={name} age={age} occupation={occupation} />}
      </View>
    </ScrollView>
  );
}
