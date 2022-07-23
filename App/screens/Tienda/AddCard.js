import { useNavigation } from '@react-navigation/core';
import _ from 'lodash';
import React, { Component, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions, Image, SafeAreaView } from 'react-native';
import { Button, Card, Icon } from "react-native-elements";
import { UsarContext } from '../../ContextApi/UseContext';
import AddProductos from './AddProductos';
import { initialState } from '../../ContextApi/reducer';
import Total from './Total';
import { TouchableOpacity } from 'react-native';

const AddCard = () => {

    const navigation = useNavigation();
    const [{ addCardPlus }, dispatch] = UsarContext()
    return (
        <SafeAreaView >
            <ScrollView >
                <Total />
                {
                    addCardPlus?.map((item) => (
                        <TouchableOpacity  onPress={ () => navigation.navigate('InfoProduct') }>
                            <AddProductos key={item.id} product={item} />
                        </TouchableOpacity>

                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
}
export default AddCard

const styles = StyleSheet.create({})