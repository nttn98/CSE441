import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Styles } from "../Styles";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Login ()
{
    const navigation = useNavigation();
    const [ responseData, setResponseData ] = useState( null );
    const [ error, setError ] = useState( null );
    const [ phone, setPhone ] = useState( "0373007856" );
    const [ password, setPassword ] = useState( "123" );

    const handleLogin = async ( phone, password ) =>
    {
        if ( !phone || !password )
        {
            console.error( "Phone and password are required" );
            return;
        }
        const data = {
            phone: phone,
            password: password
        };


        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://kami-backend-5rs0.onrender.com/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try
        {
            const response = await axios( config );
            setResponseData( response.data );

            // Save token 
            if ( response.data && response.data.token )
            {
                await AsyncStorage.setItem( "authToken", response.data.token );
                await AsyncStorage.setItem( "authName", response.data.name );

                console.log( "Token saved successfully" );
                navigation.navigate( "Home" );
            } else
            {
                console.warn( "Token not found in response data:", response.data );
            }
        } catch ( err )
        {
            setError( err );
            console.error( 'Error:', err );
        }
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={ false }>
            <View style={ Styles.container }>
                <Text style={ Styles.title }>Login</Text>
                <TextInput
                    style={ Styles.input }
                    placeholder="Phone"
                    value={ phone }
                    onChangeText={ setPhone }

                />
                <TextInput
                    style={ Styles.input }
                    value={ password }
                    placeholder="Password"
                    onChangeText={ setPassword }
                    secureTextEntry
                />
                <TouchableOpacity style={ Styles.button }>
                    <Text style={ Styles.buttonText } onPress={ () => handleLogin( phone, password ) }>Login</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}
