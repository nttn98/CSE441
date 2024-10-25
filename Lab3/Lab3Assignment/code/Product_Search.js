import { useState } from "react";
import { View, Button, FlatList, Image } from "react-native";
import Styles from "./style";
import { Card, Text, TextInput } from "react-native-paper";

export default function Product_Search ()
{

    const [ data, setData ] = useState( [] );
    const [ value, setValue ] = useState( '' );
    let filePath = 'https://dummyjson.com/products';

    function searchProduct ()
    {
        if ( value != '' )
        {
            filePath = 'https://dummyjson.com/products/search?q=' + value;
        } fetch( filePath ).then( ( response ) =>
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

            } )
    }

    return (
        <View style={ Styles.container }>
            <Text style={ Styles.header }>Search Products</Text>
            <View style={ { marginBottom: 10 } }>
                <TextInput value={ value } placeholder="Enter key" onChangeText={ setValue } style={ Styles.input } />
                <Button title="Search" onPress={ searchProduct } />
            </View>
            <FlatList
                data={ data }
                keyExtractor={ item => item.id }
                renderItem={ ( { item } ) => (
                    <Card style={ { marginVertical: 10 } }>
                        <Card.Content>
                            <Image style={ { width: 100, height: 100 } }
                                source={ { uri: item.thumbnail } }
                                resizeMode="cover" />
                            <View>
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
                            </View>
                        </Card.Content>
                    </Card>
                ) }
            />
        </View>
    )
}