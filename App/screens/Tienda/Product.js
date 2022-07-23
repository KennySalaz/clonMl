import React, { useState } from 'react';

import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, ScrollView, Text, Dimensions, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Button, Card, Icon } from "react-native-elements";
import { UsarContext } from '../../ContextApi/UseContext';
import { actionTypes } from '../../ContextApi/reducer';



const Product = ({ product: { name, img, price, id, } }) => {

    const [favorite, setfavorite] = useState(false)
    const navigation = useNavigation();
    const [{ addCardPlus, user, favoritProduct }, dispatch] = UsarContext()

    const clickFavorite = () => {
        setfavorite(!favorite)
    }

    const addToCard = () => {

        if (user) {
            dispatch({
                type: actionTypes.ADD_TO_CARD,
                item: {
                    id,
                    price,
                    name,
                    img,
                }
            })
        } else {
            navigation.navigate('Signin')

        }

    }


    const addFavorite = () => {
        if (user) {
            dispatch({
                type: actionTypes.ADD_FAVORITE,
                item: {
                    id,
                    price,
                    name,
                    img,
                }
            })
        }


    }
    return (
        <>
            <View style={styles.box} >
                <View style={styles.inner}>
                    <View style={{ display: 'flex', }}>
                        <View style={{ width: '100%', height: 179 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('InfoProduct')} >
                                <Image
                                    style={styles.imageCards}
                                    resizeMode="contain"
                                    source={ {uri: img }}
                                />
                            </TouchableOpacity>
                        </View>
                       
                        <View style={styles.icon}>

                            {
                                user && (
                                    <View style={{ paddingTop: 9, }} >
                                        <Icon
                                            size={23}
                                            name='favorite'
                                            onPress={addFavorite}
                                            color='#f50'
                                        />
                                    </View>
                                )
                            }

                            <TouchableOpacity onPress={addToCard} >
                                <Icon
                                    size={12}
                                    raised
                                    name='shopping-cart'
                                    type='font-awesome'
                                    color='#f50' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20 }}>
                            ${price}
                        </Text>
                        <Text >
                            {name}
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    box: {
        width: '50%',
        height: 300,
        padding: 7,

    },
    inner: {

        flex: 1,

        /*    alignItems: 'center', */
        /*   padding: 5, */

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.80,
        shadowRadius: 7.27,

        elevation: 15,
        backgroundColor: 'white',
    },
    imageCards: {
        width: "100%",
        height: "100%",
        zIndex: -1,
    },
    icon: {
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginLeft: 5,
        position: 'absolute',
    },


})

export default Product