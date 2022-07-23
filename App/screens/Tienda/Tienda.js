import React, { Component, useState } from 'react';
import Search from "./Search";
import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, ScrollView, Text, SafeAreaView, StatusBar } from 'react-native';
import { Button, Card, Icon } from "react-native-elements";
import { productData } from '../Tienda/Data/productData'
import Product from './Product';
import { UsarContext } from '../../ContextApi/UseContext';
import Tabs from '../../Navegation/Tabs';

const Tienda = () => {

  const [favorite, setfavorite] = React.useState(false)
  const [{ addCard }, dispatch] = UsarContext()

  /*    const navigation = useNavigation(); */

  const clickFavorite = () => {
    setfavorite(!favorite)
  }
  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.flexDirecct}>
          {
            productData.map((item) => (
              <Product key={item.id} product={item} />
            ))
          }
        </View>
       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexDirecct: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5
  },
  container: {
    flex: 1,

  },
  scrollView: {

    marginVertical: 5,
  },

});

export default Tienda