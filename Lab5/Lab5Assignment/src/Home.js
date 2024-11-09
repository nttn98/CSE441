import React, { useEffect, useState } from 'react';
import { View, FlatList, } from 'react-native';
import { Appbar, Text, IconButton, Card, ActivityIndicator } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeStyles } from './HomeStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Home () 
{
    const [ services, setServices ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ authName, setAuthName ] = useState( '' );
    const [ token, setToken ] = useState( '' );
    const navigation = useNavigation();

    useEffect( () =>
    {
        const getUserData = async () =>
        {
            try
            {
                setAuthName( await AsyncStorage.getItem( "authName" ) );
                setToken( await AsyncStorage.getItem( "authToken" ) );

            } catch ( error )
            {
                console.error( "Failed to load user data:", error );
            }
        }
        getUserData();

        const fetchServices = async () =>
        {

            try
            {
                const respone = await axios.get( 'https://kami-backend-5rs0.onrender.com/services' );
                setServices( respone.data );
            } catch ( e )
            {
                console.error( 'Error fetching services:', error );

            } finally
            {
                setLoading( false );
            }
        }
        fetchServices();
    }, [] );
    const getServicesByID = async ( id ) =>
    {

        try
        {
            const respone = await axios.get( `https://kami-backend-5rs0.onrender.com/services/${ id }` );
            await AsyncStorage.setItem( "service", JSON.stringify( respone.data ) );
            navigation.navigate( "DetailService" );
        } catch ( e )
        {
            console.error( 'Error fetching services:', error );

        }
    }
    const handleClick = ( id ) =>
    {
        if ( id === null )
        {
            navigation.navigate( "AddService" );
        } else
        {
            getServicesByID( id );
        }
    }

    const renderItem = ( { item } ) => (
        <Card style={ HomeStyles.card } onPress={ () => handleClick( item._id ) }>
            <Card.Content style={ HomeStyles.cardContent } >
                <View style={ { width: '80%' } }>
                    <Text style={ HomeStyles.serviceName } numberOfLines={ 1 } ellipsizeMode="tail">{ item.name }</Text>
                </View>
                <View style={ { width: '25%' } }>
                    <Text style={ HomeStyles.servicePrice } >{ item.price } đ</Text>
                </View>
            </Card.Content>
        </Card >
    );

    if ( loading )
    {
        return (
            <View style={ HomeStyles.loader }>
                <ActivityIndicator size="large" color="#FF6A89" />
            </View>
        );
    }

    return (
        <SafeAreaProvider >
            <View style={ HomeStyles.container }>
                {/* Header */ }
                <Appbar.Header style={ HomeStyles.header }>
                    <Appbar.Content title={ authName } color="white" />
                    <IconButton icon="account-circle" size={ 24 } color="white" />
                </Appbar.Header>

                {/* Logo */ }
                <View style={ HomeStyles.logoContainer }>
                    <Text style={ HomeStyles.logoText }>KAMI SPA</Text>
                </View>

                <View style={ HomeStyles.middle }>
                    <Text style={ HomeStyles.title }>Danh sách dịch vụ</Text>
                    <IconButton
                        icon="plus"
                        color="white"
                        size={ 20 }
                        style={ HomeStyles.circleButton }
                        onPress={ () => handleClick( null ) }
                    />
                </View>
                <FlatList
                    data={ services }
                    renderItem={ renderItem }
                    keyExtractor={ ( item ) => item.id }
                    contentContainerStyle={ HomeStyles.serviceList }
                />
            </View>
        </SafeAreaProvider>
    );
};

