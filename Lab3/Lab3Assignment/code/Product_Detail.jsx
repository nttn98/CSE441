import {useEffect, useState} from 'react';
import {View, Image, FlatList} from 'react-native';
import Styles from './style';
import {Card, Text, Button} from 'react-native-paper';

export default function Product_Detail() {
  const [data, setData] = useState({});
  let filePath = 'https://dummyjson.com/products/2';

  useEffect(() => {
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(d => {
        setData(d);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });

  return (
    <View>
      <Text variant="headlineLarge">Product Detail</Text>
      <Card>
        <Card.Cover source={{uri: data.thumbnail}} />
        <Card.Content>
          <Text>Title: {data.title}</Text>
          <Text>Description: {data.description}</Text>
          <Text>Price: {data.price}</Text>
          <Text>Discount: {data.discountPercentage}</Text>
          <Text>Rating: {data.rating}</Text>
          <Text>Stock: {data.stock}</Text>
          <Text>Brand: {data.brand}</Text>
          <Text>Category: {data.category}</Text>
        </Card.Content>
        <Card.Actions>
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
