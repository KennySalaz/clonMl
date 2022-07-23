
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useNavigation } from '@react-navigation/core'

import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native'

import { TouchableHighlight } from 'react-native'

const itemCategory = ({ route }) => {

    const navigation = useNavigation();

    return (
        <Animatable.View animation="slideInLeft" duration={1500} direction='normal' style={{ backgroundColor: '#fff' }}>
            <Animatable.View animation="slideInDown" duration={2000} direction='normal'
                style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 2, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}
                />
            </Animatable.View>
            <ScrollView style={{ height: '100%' }}>
                <Animatable.View animation="slideInLeft" duration={1700} direction='normal'>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, marginTop: 50 }} >
                        <Text
                            style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}
                        >Que categoria define tu productos?
                        </Text>
                    </View>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 30 }} >
                        <TouchableHighlight style={{ width: '45%', }}
                            onPress={() =>
                                navigation.navigate('VenderPublic', { categoryEdit: 'Accesorios , zapatos y otros' })} >
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
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ width: '45%', }}
                            onPress={() =>
                                navigation.navigate('VenderPublic', { categoryEdit: 'Accesorios para vehiculos' })}
                        >
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
                        </TouchableHighlight>
                    </View>
                </Animatable.View>

                <Animatable.View
                    animation="slideInLeft" duration={1700} direction='normal'
                    style={{ padding: 10, paddingTop: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight
                        style={{ width: '45%', }}
                        onPress={() =>
                            navigation.navigate('VenderPublic', { categoryEdit: 'Celulares y Telefonos' })}
                    >
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
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{ width: '45%', }}
                        onPress={() =>
                            navigation.navigate('VenderPublic', { categoryEdit: 'Electrodomesticos' })}
                    >
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
                    </TouchableHighlight>
                </Animatable.View>
            </ScrollView>
        </Animatable.View>
    )
}

export default itemCategory
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
