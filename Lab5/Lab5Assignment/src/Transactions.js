import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { formatDate, formatPrice } from "./styles/format";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshControl } from "react-native-gesture-handler";

export default function Transactions ( { navigation } )
{
    const [ transactions, setTransactions ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ token, setToken ] = useState( '' );
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

        const getTransactions = async () =>
        {
            try
            {
                const respone = await axios.get( "https://kami-backend-5rs0.onrender.com/transactions" );
                setTransactions( respone.data );
            } catch ( error )
            {
                console.error( "Failed to load transactions data:", error );

            }
            finally
            {
                setLoading( false );
            }
        }
        getTransactions();
    }, [ refresh ] )

    const onRefresh = () =>
    {
        setRefresh( true );
        setTimeout( () => { setRefresh( false ) }, 500 );
    }


    const addTransaction = () =>
    {
        console.log( token );
        navigation.navigate( "AddTransaction", { token } );

    }

    const getDetailTransaction = async ( id ) =>
    {
        if ( id !== null )
        {
            try
            {
                const respone = await axios.get( `https://kami-backend-5rs0.onrender.com/transactions/${ id }` )
                navigation.navigate( "DetailTransaction", respone.data );

            } catch ( error )
            {
                console.error( "Failed to load detail's transaction data:", error );
            }
        }
    }
    const renderTransaction = ( { item } ) =>
    (
        <Card style={ { margin: 5 } } onPress={ () => getDetailTransaction( item._id ) }>
            <Card.Content style={ style.transaction } >
                <View style={ style.content }>
                    <View style={ { flex: 1 } }>
                        <Text variant="labelMedium" style={ { fontWeight: 'bold' } }>{ item.id } - { formatDate( item.createdAt ) }
                            <Text style={ { color: 'red', fontWeight: 'bold' } }>
                                { item.status === 'cancelled' ? ' - ' + item.status : null }
                            </Text>
                        </Text>
                        <FlatList
                            data={ item.services }
                            renderItem={ ( { item } ) =>
                            {
                                return (
                                    <View style={ { width: '50 %' } }>
                                        <Text variant="labelMedium" >- { item.name }</Text>
                                    </View>
                                )
                            }
                            }
                            keyExtractor={ ( service ) => service._id }
                            scrollEnabled={ false }
                        />
                        <Text variant="labelMedium" style={ { color: 'grey' } }>Customer: { item.customer.name }</Text>
                    </View>

                    <View style={ style.pricePlace } >
                        <Text numberOfLines={ 1 } style={ [ style.price, { textAlign: 'right' } ] } > { formatPrice( item.price ) }</Text>
                    </View>
                </View>
            </Card.Content>
        </ Card >
    )

    if ( loading )
    {
        return (
            <View>
                <ActivityIndicator size="large" color="#FF6A89" />
            </View>
        )
    }

    return (
        <View style={ style.container }>
            <FlatList
                data={ transactions }
                renderItem={ renderTransaction }
                keyExtractor={ ( item ) => item._id }
                refreshControl={ <RefreshControl refreshing={ refresh } onRefresh={ onRefresh } /> }

            />
            <TouchableOpacity style={ style.btnAddTransaction } onPress={ () => addTransaction() }>
                <Text style={ style.text } >+</Text>
            </TouchableOpacity>
        </View>

    )
}

const style = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 5
    },
    content: {
        flexDirection: 'row',
        padding: 1,
    },
    transaction: {
        borderRadius: '15%'
    },
    btnAddTransaction: {
        width: 50,
        height: 50,
        backgroundColor: '#FF6A89',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        position: 'absolute',
        bottom: 5,
        right: 20,
    },
    text: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    pricePlace: {
        // alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 80,
    },
    price: {
        color: "#FF6A89",
        fontWeight: 'bold',
    }
} )