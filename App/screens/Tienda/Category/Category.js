import { LinearGradient } from 'expo-linear-gradient'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Icon, Button, Card } from 'react-native-elements'
import { TextInput } from 'react-native-paper'
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/core'
import { UsarContext } from '../../../ContextApi/UseContext'

const Category = () => {
    return (
        <>
            <Animatable.View animation="fadeInUp" duration={1700} style={{ backgroundColor: '#fff', flex: 1 }} >
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}
                >
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={{
                                width: '80%', height: 40, margin: 30,

                            }}
                            activeUnderlineColor={'#1e1144f0'}
                            placeholder='Buscar Categoria'
                        />
                    </View>

                </LinearGradient>

                <Animatable.View animation="slideInLeft" duration={1700} direction='normal'>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 100 }} >

                        <View style={{
                            borderStyle: 'solid',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: -1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 0.05,

                            elevation: 4,
                            padding: 15,
                            width: '45%',
                            backgroundColor: '#fff'

                        }}>
                            <View style={{
                                margin: 20,
                            }}>
                                <Icon
                                    type='font-awesome-5'
                                    name="tshirt"
                                    size={45}
                                    color="#1e1144b3"
                                />
                            </View>
                            <View style={{ width: 130, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, }}>Accesorios , zapatos y otros  </Text>
                            </View>
                        </View>


                        <View style={{
                            borderStyle: 'solid',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: -1,
                            },
                            shadowOpacity: 0.18,
                            shadowRadius: 0.05,

                            elevation: 4,
                            padding: 15,
                            width: '45%',
                            backgroundColor: '#fff'
                        }}>

                            <View style={{
                                margin: 20,

                            }}>
                                <Icon
                                    type='font-awesome'
                                    name="car"
                                    size={45}
                                    color="#1e1144b3"
                                />

                            </View>
                            <View>

                                <Text style={{ fontSize: 10, display: 'flex', alignItems: 'center' }}>Accesorios para vehiculos</Text>
                            </View>
                        </View>



                    </View>

                </Animatable.View>




                <View style={{ padding: 10, paddingTop: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{
                        borderStyle: 'solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: -1,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 0.05,

                        elevation: 4,
                        padding: 15,
                        width: '45%',
                        backgroundColor: '#fff'
                    }}>

                        <View style={{
                            margin: 20,

                        }}>
                            <Icon
                                type='font-awesome5'
                                name="smartphone"
                                size={45}
                                color="#1e1144b3"
                            />

                        </View>
                        <View>

                            <Text style={{ fontSize: 10, display: 'flex', alignItems: 'center' }}>Celulares y Telefonos</Text>
                        </View>
                    </View>
                    <View style={{
                        borderStyle: 'solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: -1,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 0.05,

                        elevation: 4,
                        padding: 15,
                        width: '45%',
                        backgroundColor: '#fff'
                    }}>

                        <View style={{
                            margin: 20,

                        }}>
                            <Icon
                                type='Material-Icons'
                                name="kitchen"
                                size={45}
                                color="#1e1144b3"
                            />

                        </View>
                        <View>

                            <Text style={{ fontSize: 10, display: 'flex', alignItems: 'center' }}>Electrodomesticos</Text>
                        </View>
                    </View>



                </View>
                <View style={{ padding: 10, paddingTop: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{
                        borderStyle: 'solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: -1,
                        },
                        shadowOpacity: 2.18,
                        shadowRadius: 2.05,

                        elevation: 4,
                        padding: 15,
                        width: '45%',
                        backgroundColor: '#fff'
                    }}>

                        <View style={{
                            margin: 20,

                        }}>
                            <Icon
                                type='Feather'
                                name="speaker"
                                size={45}
                                color="#1e1144b3"
                            />

                        </View>
                        <View>

                            <Text style={{ fontSize: 10, display: 'flex', alignItems: 'center' }}>Electronica,Audio y Video</Text>
                        </View>
                    </View>
                    <View style={{

                        borderStyle: 'solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.18,
                        shadowRadius: 0.05,

                        elevation: 4,
                        padding: 15,
                        width: '45%',
                        backgroundColor: '#fff'
                    }}>

                        <View style={{
                            margin: 20,

                        }}>
                            <Icon
                                type='font-awesome'
                                name="industry"
                                size={45}
                                color="#1e1144b3"
                            />

                        </View>
                        <View>

                            <Text style={{ fontSize: 10, display: 'flex', alignItems: 'center' }}>Industrias</Text>
                        </View>
                    </View>



                </View>
            </Animatable.View>

        </>


    )
}

export default Category

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 225,




    },

})

