import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';

export default function DetailService ( { route } ) 
{
    const [ service, setService ] = useState( null );
    const [ loading, setLoading ] = useState( true );
    const { token } = route.params;
    const navigation = useNavigation();

    const handleDelete = async ( id ) =>
    {
        try
        {
            const respone = await axios.delete( `https://kami-backend-5rs0.onrender.com/services/${ id }`, {
                headers: {
                    Authorization: `Bearer ${ token }`,
                }
            } );
            if ( respone )
            {
                Alert.alert(
                    "Service deleted successfully",
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
            }
        } catch ( error )
        {
            console.error( 'Error delete service:', error );
        }
    }

    useEffect( () =>
    {
        const getService = async () =>
        {
            try
            {
                const serviceData = await AsyncStorage.getItem( "service" );
                if ( serviceData )
                {
                    setService( JSON.parse( serviceData ) );
                }

            } catch ( error )
            {
                console.error( "Failed to load user data:", error );
            }
            finally
            {
                setLoading( false );

            }
        }
        getService();
    }, [] )

    function handleUpdate ( id )
    {
        navigation.navigate( "AddService", { token, service } );
    }

    if ( loading )
    {
        return (
            <View>
                <ActivityIndicator size="large" color="#FF6A89" />
            </View>
        );
    }

    return (
        <View style={ styles.container }>
            <Appbar.Header style={ styles.header }>
                <Appbar.Content title="Service detail" />
                <Appbar.Action icon="dots-vertical" onPress={ () =>
                {
                    Alert.alert(
                        "Service Options",
                        "Choose an action for this service.",
                        [
                            {
                                text: "UPDATE",
                                onPress: () =>
                                {
                                    handleUpdate( service._id );
                                },
                            },
                            {
                                text: "DELETE",
                                onPress: () =>
                                {
                                    Alert.alert(
                                        "Warning",
                                        "Are you sure you want to remove this service? This operation cannot be undone.",
                                        [
                                            {
                                                text: "DELETE",
                                                onPress: () =>
                                                {
                                                    handleDelete( service._id );
                                                },
                                            },
                                            {
                                                text: "CANCEL",
                                                style: "cancel",
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                },
                            },
                            {
                                text: "CANCEL",
                                style: "cancel",
                            },
                        ],
                        { cancelable: true }
                    );
                } } />
            </Appbar.Header>

            <View style={ styles.detailContainer }>
                <Text style={ styles.label }>Service name:</Text>
                <Text style={ styles.value }>{ service.name ?? service.name } </Text>

                <Text style={ styles.label }>Price:</Text>
                <Text style={ styles.value }>{ service.price ?? service.price } đ </Text>

                <Text style={ styles.label }>Creator:</Text>
                <Text style={ styles.value }>{ service.createdBy ?? service.createdBy } </Text>

                <Text style={ styles.label }>Time:</Text>
                <Text style={ styles.value }> { service.createdAt ?? service.createdAt }</Text>

                <Text style={ styles.label }>Final update:</Text>
                <Text style={ styles.value }>{ service.updatedAt ?? service.updatedAt } </Text>
            </View>
        </View>
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
    detailContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
    },
} );


