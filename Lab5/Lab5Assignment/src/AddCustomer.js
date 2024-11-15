import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AddCustomer ( { route } )
{

    const token = route.params.token;
    const [ name, setName ] = useState();
    const [ phone, setPhone ] = useState();
    const navigation = useNavigation();

    const addCustomer = async () =>
    {
        try
        {
            const response = await axios.post( `https://kami-backend-5rs0.onrender.com/customers`,
                {
                    name: name,
                    phone: phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                }
            );
            Alert.alert(
                "Customer added successfully",
                "Go back to home page",
                [
                    {
                        text: "OK",
                        onPress: () =>
                        {
                            navigation.navigate( "Customers" );
                        }
                    }
                ]
            );
        } catch ( error )
        {
            console.error( 'Error adding service:', error );

        }

    }
    return (
        <SafeAreaProvider>
            <View style={ style.container }>
                <View style={ { marginBottom: 10 } }>
                    <Text style={ { fontWeight: 'bold' } }>Customer name *</Text>
                    <TextInput placeholder="Input your customer's name" style={ style.input }
                        value={ name }
                        onChangeText={ setName } />
                </View>
                <View>
                    <Text style={ { fontWeight: 'bold' } }>Phone *</Text>
                    <TextInput placeholder="Input your number" style={ style.input } keyboardType="numeric"
                        value={ phone }
                        onChangeText={ ( text ) => setPhone( text ) } />
                </View>
                <TouchableOpacity style={ style.buttonAdd } onPress={ () => addCustomer() }>
                    <Text style={ style.addText } >Add</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaProvider >
    )
}
const style = StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 15
        },
        buttonAdd: {
            marginTop: 10,
            width: '100%',
            height: 50,
            backgroundColor: "#FF6A89",
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        addText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
        input: {
            marginBottom: 10,
        },
    }
)