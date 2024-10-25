import React, {useState} from 'react';
import Product from './code/Product';
import Product_Add from './code/Product_Add';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Product_Search from './code/Product_Search';
import Product_Detail from './code/Product_Detail';
import {BottomNavigation} from 'react-native-paper';

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ProductList', title: 'Products', focusedIcon: 'folder'},
    {key: 'Product_Add', title: 'Add', focusedIcon: 'folder'},
    {key: 'ProductSearch', title: 'Search', focusedIcon: 'find'},
    {key: 'Product_Detail', title: 'Detail', focusedIcon: 'calendar'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    ProductList: Product,
    Product_Add: Product_Add,
    ProductSearch: Product_Search,
    Product_Detail: Product_Detail,
  });
  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  );
}
