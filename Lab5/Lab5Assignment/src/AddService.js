import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AddService ()
{
    const [ serviceName, setServiceName ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ loading, setLoading ] = useState( false );
    const [ token, setToken ] = useState( '' );


    useEffect( () =>
    {
        const getToken = async () =>
        {
            const tokenData = await AsyncStorage.getItem( "authToken" );
            if ( tokenData )
            {
                setToken( JSON.parse( tokenData ) );
            }
        }
    }, [] )
    const addService = async () =>
    {
        try
        {
            const response = await axios.post( 'https://kami-backend-5rs0.onrender.com/services', {
                name: serviceName,
                price: price,
            } );
            console.log( 'Service added successfully:', response.data );
        } catch ( error )
        {
            console.error( 'Error adding service:', error );
        } finally
        {
            setLoading( false );
        }
    };

    const handleAddService = () =>
    {
        addService();
    };


    if ( loading )
    {
        return (
            <View style={ styles.loader }>
                <ActivityIndicator size="large" color="#FF6A89" />
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <View style={ styles.container }>
                <Appbar.Header style={ styles.header }>
                    <Appbar.Content title="Service" />
                </Appbar.Header>

                <View style={ styles.form }>
                    <Text style={ styles.label }>Service name *</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Input a service name"
                        value={ serviceName }
                        onChangeText={ setServiceName }
                        style={ styles.input }
                    />

                    <Text style={ styles.label }>Price *</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="0"
                        value={ price }
                        onChangeText={ setPrice }
                        keyboardType="numeric"
                        style={ styles.input }
                    />

                    <Button mode="contained" onPress={ handleAddService } style={ styles.addButton }>
                        Add
                    </Button>
                </View>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    header: {
        backgroundColor: '#FF6A89',
    },
    form: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 20,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: '#FF6A89',
    },
} );

