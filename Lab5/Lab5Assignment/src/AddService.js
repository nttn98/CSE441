import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AddService ( { route } )
{
    const [ serviceName, setServiceName ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ token, setToken ] = useState( '' );
    const [ service, setService ] = useState( '' );

    const navigation = useNavigation();

    useEffect( () =>
    {
        const tempToken = route.params.token;
        if ( tempToken )
        {
            setToken( tempToken );
        }
        const tempService = route.params.service;
        if ( tempService )
        {
            setService( tempService );
        }

    }, [] )
    const addService = async () =>
    {
        try
        {
            const response = await axios.post(
                'https://kami-backend-5rs0.onrender.com/services',
                {
                    name: serviceName,
                    price: price
                },
                {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                }
            );
            Alert.alert(
                "Service added successfully",
                "Go back to home page",
                [
                    {
                        text: "OK",
                        onPress: () =>
                        {
                            navigation.navigate( "Home" );
                        }
                    }
                ]
            );
        } catch ( error )
        {
            console.error( 'Error adding customer:', error );
        }
    };
    const updateService = async () =>
    {
        try
        {
            const response = await axios.put(
                `https://kami-backend-5rs0.onrender.com/services/${ service._id }`,
                {
                    name: serviceName,
                    price: price
                },
                {
                    headers: {
                        Authorization: `Bearer ${ token }`
                    }
                }
            );
            Alert.alert(
                "Service updated successfully",
                "Go back to home page",
                [
                    {
                        text: "OK",
                        onPress: () =>
                        {
                            navigation.navigate( "Home" );
                        }
                    }
                ]
            );
        } catch ( error )
        {
            console.error( 'Error adding service:', error );
        }
    };

    const handleAddService = () =>
    {
        if ( addService() )
        {
            navigation.navigate( "Home" );
        }
    };

    const handleUpdateService = () =>
    {
        if ( updateService() )
        {
            navigation.navigate( "Home" );
        }
    };

    return (
        <SafeAreaProvider>
            <View style={ styles.container }>
                <View style={ styles.form }>
                    <Text style={ styles.label }>Service name *</Text>
                    <TextInput
                        mode="outlined"
                        placeholder="Input a service name"
                        value={ serviceName || service?.name || '' }
                        onChangeText={ setServiceName }
                        style={ styles.input }
                    />

                    <Text style={ styles.label }>Price *</Text>

                    <TextInput
                        mode="outlined"
                        placeholder="0"
                        value={ service.price ? service.price.toString() : price?.toString() || '0' }
                        onChangeText={ ( text ) => setPrice( text ) }
                        keyboardType="numeric"
                        style={ styles.input }
                    />

                    <Button
                        mode="contained"
                        onPress={ () =>
                        {
                            if ( !service )
                            {
                                handleAddService();
                            } else
                            {
                                handleUpdateService();
                            }
                        } }
                        style={ styles.addButton }
                    >
                        { service ? 'Update' : 'Add' }
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
        padding: 10
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

