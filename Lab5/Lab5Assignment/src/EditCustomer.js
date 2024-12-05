import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

export default function EditCustomer ( { route, navigation } )
{
    const [ name, setName ] = useState();
    const [ phone, setPhone ] = useState();
    const { id, token } = route.params
    useEffect( () =>
    {
        axios.get( `https://kami-backend-5rs0.onrender.com/customers/${ id }` ).then( ( { data } ) =>
        {
            setName( data.name );
            setPhone( data.phone );
        } )
    }, [] )

    const updateCustomer = async () =>
    {
        try
        {
            const response = await axios.put( `https://kami-backend-5rs0.onrender.com/customers/${ id }`,
                {
                    name,
                    phone
                },
                {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                }
            );
            Alert.alert( "Customer deleted successfully" );

            setTimeout( () =>
            {
                navigation.goBack();
            }, 1000 );

        } catch ( error )
        {
            console.error( 'Error adding service:', error );

        }

    }

    return (
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
            <TouchableOpacity style={ style.buttonAdd } onPress={ () => updateCustomer() }>
                <Text style={ style.addText } >Update</Text>
            </TouchableOpacity>
        </View>
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