import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Card, IconButton, Text } from "react-native-paper";
import { HomeStyles } from "./styles/HomeStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomerStyles } from "./styles/CustomerStyles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatPrice } from "./styles/format";
import { RefreshControl } from "react-native-gesture-handler";

export default function Customers ()
{
    const [ customers, setCustomers ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ token, setToken ] = useState( '' );
    const navigation = useNavigation();
    const [ refresh, setRefresh ] = useState( false );

    useEffect( () =>
    {
        const getUserData = async () =>
        {
            try
            {
                const authToken = await AsyncStorage.getItem( "authToken" );
                setToken( authToken );
            } catch ( error )
            {
                console.error( "Failed to load user data:", error );
            }
        }
        getUserData();

        const getCustomers = async () =>
        {
            try
            {
                const respone = await axios.get( "https://kami-backend-5rs0.onrender.com/customers" );
                setCustomers( respone.data );
            } catch ( error )
            {
                console.error( "Failed to load customers data:", error );

            } finally
            {
                setLoading( false );
            }
        }
        getCustomers();


    }, [ refresh ] );


    const addCustomer = ( { token } ) =>
    {
        navigation.navigate( "AddCustomer", { token } );
    }

    const getDetailCustomer = ( id ) =>
    {
        if ( id !== null )
        {
            navigation.navigate( "DetailCustomer", { id, token } );
        }
    }

    const onRefresh = () =>
    {
        setRefresh( true );
        setTimeout( () => { setRefresh( false ) }, 500 );
    }

    const renderCustomers = ( { item } ) => (
        <Card style={ { margin: '10' } } onPress={ () => getDetailCustomer( item._id ) }>
            <Card.Content style={ CustomerStyles.customer }>
                <View style={ CustomerStyles.content }>
                    <View style={ { width: '80%' } } >
                        <Text>Customer: { item.name }</Text>
                        <Text>Phone: { item.phone }</Text>
                        <Text>Total money: <Text style={ CustomerStyles.totalMoney }>{ formatPrice( item.totalSpent ) }</Text></Text>
                    </View>

                    <View style={ { width: '20%' } }>
                        <IconButton
                            icon={ () => (
                                <MaterialCommunityIcons name="crown" size={ 35 } color="#FF6A89" />
                            ) }
                            color="#FF6A89"
                        />
                        <Text style={ { color: "#FF6A89", fontWeight: "bold", marginTop: "-10" } } > Guest</Text>
                    </View>
                </View>
            </Card.Content>
        </ Card>
    )

    if ( loading )
    {
        return (
            <View>
                <ActivityIndicator size="large" color="#FF6A89" />
            </View>
        );
    }

    return (
        <View style={ CustomerStyles.container }>
            <FlatList
                data={ customers }
                renderItem={ renderCustomers }
                keyExtractor={ ( item ) => item._id }
                contentContainerStyle={ HomeStyles.serviceList }
                refreshControl={ <RefreshControl refreshing={ refresh } onRefresh={ onRefresh } /> }

            />
            <TouchableOpacity style={ CustomerStyles.btnAddCustomer } onPress={ () => addCustomer( { token } ) }>
                <Text style={ CustomerStyles.plusText } >+</Text>
            </TouchableOpacity>
        </View >

    )
}