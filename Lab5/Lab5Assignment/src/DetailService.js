import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

export default function DetailService () 
{
    const [ service, setService ] = useState( null );
    useEffect( () =>
    {
        const getService = async () =>
        {
            try
            {
                const serviceData = await AsyncStorage.getItem( "service" );
                console.log( "service" + serviceData );

                // setService( JSON.parse( serviceData ) );
                // console.log( service );
                // if ( serviceData )
                // {
                //     setService( JSON.parse( serviceData ) );
                // }

            } catch ( error )
            {
                console.error( "Failed to load user data:", error );
            }
        }
        getService();
    }, [] )

    return (
        <View style={ styles.container }>
            <Appbar.Header style={ styles.header }>
                <Appbar.Content title="Service detail" />
                <Appbar.Action icon="dots-vertical" onPress={ () =>
                {
                    Alert.alert(
                        "Warning",
                        "Are you sure you want to remove this service? This operation cannot be returned.",
                        [
                            {
                                text: "DELETE",
                                onPress: () =>
                                {
                                },
                            },
                            {
                                text: "CANCEL",
                                style: "cancel",
                            },
                        ],
                        { cancelable: false }
                    );
                } } />
            </Appbar.Header>

            {/* <View style={ styles.detailContainer }>
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
            </View> */}
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


