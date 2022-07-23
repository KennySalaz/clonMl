
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Button, Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { doc, getFirestore, updateDoc, collection } from "firebase/firestore";
import firebaseApp from '../../../../utils/firebase'
import { getAuth } from 'firebase/auth'
import Loading from '../../../../Componentes/Loading'
import { isEmpty } from 'lodash'
import { Input } from 'react-native-elements/dist/input/Input'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { TouchableHighlight } from 'react-native'

const VenderCategory = ({ route }) => {
    const { title } = route.params
    const navigation = useNavigation();
    const categorys =
        [
            { category: 'Accesorios , zapatos y otros' },
            { category: 'Accesorios para vehiculos' },
            { category: 'Celulares y Telefonos' }

        ]

    useEffect(() => {
        console.log(title)
    }, [])
    return (
        <Animatable.View animation="fadeInRight" duration={1500} direction='normal' style={{ backgroundColor: '#fff' }}>
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
                                navigation.navigate('VenderState', { title, category: 'Accesorios , zapatos y otros' })} >
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


            </ScrollView>



        </Animatable.View>
    )
}

export default VenderCategory


const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
