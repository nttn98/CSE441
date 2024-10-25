import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "./Styles";

export default function LoginScreen ()
{
    return (
        <ScrollView showsHorizontalScrollIndicator={ false }>
            <View style={ Styles.container }>
                <Text style={ Styles.title }>Login</Text>
                <TextInput
                    style={ Styles.input }
                    placeholder="Phone"
                />
                <TextInput
                    style={ Styles.input }
                    placeholder="Password"
                />
                <TouchableOpacity style={ Styles.button }>
                    <Text style={ Styles.buttonText }>Login</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}