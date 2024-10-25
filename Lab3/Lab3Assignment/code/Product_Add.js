import { useState } from "react";
import { Alert, View, Text, Button, ScrollView } from "react-native";
import Styles from "./style";
import { TextInput } from "react-native-paper";


export default function Product_Add ()
{


    const [ title, setTitle ] = useState( '' );
    const [ description, setDescription ] = useState( '' );
    const [ price, setPrice ] = useState( '' );
    const [ discountPercentage, setDiscountPercentage ] = useState( '' );
    const [ rating, setRating ] = useState( '' );
    const [ stock, setStock ] = useState( '' );
    const [ brand, setBrand ] = useState( '' );
    const [ category, setCategory ] = useState( '' );
    const [ images, setImages ] = useState( '' );
    const newProduct = {
        title,
        description,
        price: parseFloat( price ),
        discountPercentage: parseFloat( discountPercentage ),
        rating: parseFloat( rating ),
        stock: parseInt( stock, 10 ),
        brand,
        category,
        images,
    };
    handleSubmit = () =>
    {
        fetch( 'https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },


            body: JSON.stringify( {
                title: title,
                description: description,
                price: price,
                discountPercentage: discountPercentage,
                rating: rating,
                stock: stock,
                brand: brand,
                category: category,
                images: images,
            } ),
        } )
            .then( ( res ) => res.json() )
            .then( console.log() );
        Alert.alert( "Add sucessfull" );
    }

    return (
        <ScrollView style={ Styles.container }>
            <Text style={ Styles.header }>Add New Product</Text>
            <Text style={ Styles.productTitle }>Titel</Text>
            <TextInput
                placeholder="Title"
                value={ title }
                onChangeText={ setTitle }
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Description</Text>
            <TextInput
                placeholder="Description"
                value={ description }
                onChangeText={ setDescription }
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Price</Text>
            <TextInput
                placeholder="Price"
                value={ price }
                onChangeText={ setPrice }
                keyboardType="numeric"
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Discount Percentage</Text>
            <TextInput
                placeholder="Discount Percentage"
                value={ discountPercentage }
                onChangeText={ setDiscountPercentage }
                keyboardType="numeric"
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Rating</Text>
            <TextInput
                placeholder="Rating"
                value={ rating }
                onChangeText={ setRating }
                keyboardType="numeric"
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Stock</Text>
            <TextInput
                placeholder="Stock"
                value={ stock }
                onChangeText={ setStock }
                keyboardType="numeric"
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Brand</Text>
            <TextInput
                placeholder="Brand"
                value={ brand }
                onChangeText={ setBrand }
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Category</Text>
            <TextInput
                placeholder="Category"
                value={ category }
                onChangeText={ setCategory }
                style={ Styles.input }
            />
            <Text style={ Styles.productTitle }>Thumbnail URL</Text>
            <TextInput
                placeholder="Thumbnail URL"
                value={ images }
                onChangeText={ setImages }
                style={ Styles.input }
            />
            <Button title="Add Product" onPress={ handleSubmit } />
        </ScrollView>
    )
}