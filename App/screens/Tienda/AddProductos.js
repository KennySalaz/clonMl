import React from 'react'
import { View, StyleSheet, ScrollView, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import * as Animatable from 'react-native-animatable';
import Total from './Total';

const AddProductos = ({ product: { name, id, img, price, rating, description, } }) => {

    const navigattion = useNavigation()


    return (

        <View style={styles.container}>

         
                <View style={styles.box}>
                <Animatable.View
                animation='fadeInUpBig'
                duration={1500}
                easing='ease-in-out-quint'
                direction='alternate'
            >
                    <View>
                        <View style={styles.inner}>
                            <View style={{ width: "40%", height: '100%', }}>

                                <Image
                                    style={{ width: "100%", height: '100%', }}
                                    resizeMode="contain"
                                    source={{
                                        uri: img
                                    }}
                                />
                            </View>
                            <View style={{ width: '100%', }} >
                                <Text >
                                    ${price}

                                </Text>
                                <Text>
                                    {name}
                                </Text>
                            </View>
                        </View>
                        {/*  <Card.Divider /> */}


                    </View>
                    </Animatable.View>
                </View>
          
        </View >








    )
}

export default AddProductos

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: 130,
        /*  padding: 5, */
        flexDirection: 'column',
    },
    box: {
        flex: 1,
        width: '100%',
        height: '100%',
        /*   backgroundColor: '#eee',  */
        paddingTop: 10,

        paddingLeft: 10,
        paddingRight: 10,
    },
    inner: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',

        width: '100%',
        backgroundColor: '#fff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.90,
        shadowRadius: 2.27,

        elevation: 2,


    },


})