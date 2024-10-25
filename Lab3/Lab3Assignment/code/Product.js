import { useEffect, useState } from "react";
import { FlatList, Button } from "react-native";
import { View, Text, Image } from "react-native";

import Styles from "./style";

export default function Product ()
{
    const [ data, setData ] = useState( [] );
    const filePath = 'https://dummyjson.com/products/';

    useEffect( () =>
    {
        fetch( filePath )
            .then( ( response ) =>
            {
                if ( !response.ok )
                {
                    throw new Error( 'Network response was not ok' );
                }
                return response.json();
            } )
            .then( ( d ) =>
            {
                setData( d.products );
            } )
            .catch( ( error ) =>
            {
                console.error( 'Error fetching data:', error );
            } );
    }, [] );

    return (
        <View style={ Styles.container }>
            <Text style={ Styles.header }>Product List</Text>
            <FlatList
                data={ data }
                keyExtractor={ item => item.id }
                renderItem={ ( { item } ) => (
                    <View style={ Styles.productItem }>
                        <Image style={ Styles.productImage }
                            source={ { uri: item.thumbnail } }
                            resizeMode="cover" />
                        <View style={ Styles.productCard }>
                            <View>
                                <Text style={ Styles.productTitle }>Title: { item.title }</Text>
                                <Text>Description: { item.description }</Text>
                                <Text>Price: { item.price }</Text>
                                <Text style={ Styles.productDiscount }>Discount: { item.discountPercentage }</Text>
                                <Text>Rating: { item.rating }</Text>
                                <Text>Stock: { item.stock }</Text>
                                <Text>Brand: { item.brand }</Text>
                                <Text>Category: { item.category }</Text>
                            </View>
                            <View style={ Styles.buttonContainer }>
                                <Button title='Detail' />
                                <Button title='Add' />
                                <Button title='Delete' />
                            </View>
                        </View>
                    </View>
                ) }
            />
        </View>
    );
}
