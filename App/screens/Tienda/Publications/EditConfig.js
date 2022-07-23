import { useFocusEffect, useNavigation } from '@react-navigation/core'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { ScrollView } from 'react-native-gesture-handler'
import firebaseApp from '../../../utils/firebase'
import {
    collection,
    getDocs,
    getFirestore
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { deleteDocProducts, getDocumentIdClients, getIDProdut } from '../../../utils/actions'
import { size } from 'lodash'
import { Alert } from 'react-native'

import * as Animatable from 'react-native-animatable';
import Loading from '../../../Componentes/Loading'

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

const EditConfig = ({ route }) => {

    const { id } = route.params
    const navigation = useNavigation();
    const [checkColor, setCheckColor] = useState(false)
    const [productClients, setProductClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [idCProdts, setIdCProdts] = useState()


    const { title, description, price, estado, crerateBy, img, categoria } = productClients

    const documentByIdClients = async () => {

        const result = await getDocumentIdClients('productos', id)

        if (result.statusRespon) {
            setProductClients(result.document)
        } else {
            setProductClients({})
            Alert.alert('no se pudo cargar el producto')
        }
    }


    const goProduct = () => {
        navigation.navigate('InfoProduct', { id })
    }


    const zoomOut1 = {
        from: {
            left: 500,
        },
        to: {
            left: 0,
        },
    };

    const zoomOut2 = {
        from: {
            left: 600,
        },
        to: {
            left: 0,
        },
    };
    const zoomOut3 = {
        from: {
            left: 700,

        },
        to: {
            left: 0,

        },
    };
    const zoomOut4 = {
        from: {
            left: 800,

        },
        to: {
            left: 0,

        },
    };
    const zoomOut5 = {
        from: {
            left: 900,
        },
        to: {
            left: 0,
        },
    };
    const zoomOut6 = {
        from: {
            left: 1000,
        },
        to: {
            left: 0,
        },
    };
    const zoomOut7 = {
        from: {
            left: 1100,
        },
        to: {
            left: 0,
        },
    };
    const zoomOut8 = {
        from: {
            left: 1200,
        },
        to: {
            left: 0,
        },
    };
    const zoomOut9 = {
        from: {
            left: 1300,
        },
        to: {
            left: 0,
        },
    };
    const zoomOut10 = {
        from: {
            left: 1400,
        },
        to: {
            left: 0,
        },
    };
    const zoomOut11 = {
        from: {
            left: 1500,
        },
        to: {
            left: 0,
        },
    };

    const deleteProductsClients = async () => {
        setLoading(true)

        const result = await deleteDocProducts(id, idCProdts)
        if (result.statusRespon) {
            navigation.navigate('Publications')
        } else {
            console.log(result.error)
        }
        setLoading(false)
    }

    const ifRemove = () => {
        Alert.alert(
            'Eliminar Imagen',
            'Estas seguro de eliminar la imagen',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Si',
                    onPress: deleteProductsClients
                }
            ]
        )
    }

    const getsIDP = async () => {
        const result = await getIDProdut()


        console.log(result.idProductClients)

    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            documentByIdClients()
            setLoading(false)
        }, [])
    )
    useEffect(() => {

        getsIDP()

    }, [])
    

    useEffect(() => {

        if (productClients) {
            setCheckColor(true)
            setTimeout(() => {
                setCheckColor(false)
            }, 1000);
        }

    }, [productClients])
    return (
        <>
            <ScrollView >
                <Loading isVisible={loading} />
                <Animatable.View animation={zoomOut1} duration={2000} direction='normal'>
                    <ListItem bottomDivider onPress={() => navigation.navigate('EditTitle', { title, id })}>
                        <ListItem.Content>
                            <ListItem.Title>Titulo</ListItem.Title>
                            <Animatable.View animation={'flash'} iterationCount={1} >
                                <ListItem.Subtitle style={{ color: checkColor ? '#52ff00' : '#000' }}>{
                                    size(title) > 20 ? `${title.substr(0, 50)}...` : title

                                }   </ListItem.Subtitle>
                            </Animatable.View>

                        </ListItem.Content>


                        <ListItem.Chevron />

                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut2} duration={2000} direction='normal'>
                    <ListItem bottomDivider onPress={() => navigation.navigate('EditPrice', { price, id })} >
                        <ListItem.Content>
                            <ListItem.Title>Price</ListItem.Title>
                            <ListItem.Subtitle>${price}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Animatable.View>

                <Divider color={'#E8E8E7'} width={15} orientation='horizontal' />
                <Animatable.View animation={zoomOut3} duration={2000} direction='normal'>
                    <ListItem bottomDivider onPress={() => navigation.navigate('EditDescription', { description, id })} >
                        <ListItem.Content>
                            <ListItem.Title>Description</ListItem.Title>
                            <ListItem.Subtitle>{
                                size(description) > 0 ? `${description.substr(0, 5)}...` : description

                            }</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut4} duration={2000} direction='normal'>
                    <ListItem bottomDivider onPress={() => navigation.navigate('EditImage')} >
                        <Avatar
                            containerStyle={{
                                width: 100,
                                height: 100
                            }}
                            source={{ uri: img?.[0] }}

                        />
                        <ListItem.Content>
                            <ListItem.Title>Fotos</ListItem.Title>

                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut5} duration={2000} direction='normal'>
                    <ListItem bottomDivider onPress={() => navigation.navigate('EditAmount', { description, id })} >
                        <ListItem.Content>
                            <ListItem.Title>Cantidad</ListItem.Title>
                            <ListItem.Subtitle> 200</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut6} duration={2000} direction='normal'>
                    <ListItem bottomDivider onPress={() => navigation.navigate('EditCondition', { estado, id })} >
                        <ListItem.Content>
                            <ListItem.Title>Condicion</ListItem.Title>
                            <ListItem.Subtitle>{estado}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut7} duration={2000} direction='normal'>
                    <ListItem bottomDivider onPress={() => navigation.navigate('EditCategory', { categoria, id })} >
                        <ListItem.Content>
                            <ListItem.Title>Categoria</ListItem.Title>
                            <ListItem.Subtitle>{categoria} </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Animatable.View>

                <Animatable.View animation={zoomOut8} duration={2000} direction='normal'>
                    <ListItem bottomDivider containerStyle={{ backgroundColor: '#E8E8E7', padding: 25 }}  >
                        <ListItem.Content >
                            <ListItem.Title>Pausar</ListItem.Title>

                        </ListItem.Content>
                        <ListItem.Chevron color={'#000'} />
                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut9} duration={2000} direction='normal'>
                    <ListItem bottomDivider containerStyle={{ backgroundColor: '#E8E8E7', padding: 25 }}  >
                        <ListItem.Content >
                            <ListItem.Title>Ver Estadisticas</ListItem.Title>

                        </ListItem.Content>
                        <ListItem.Chevron color={'#000'} />
                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut10} duration={2000} direction='normal'>
                    <ListItem bottomDivider containerStyle={{ backgroundColor: '#E8E8E7', padding: 25 }} onPress={goProduct}  >
                        <ListItem.Content >
                            <ListItem.Title>Ver Publicacion</ListItem.Title>

                        </ListItem.Content>
                        <ListItem.Chevron color={'#000'} />
                    </ListItem>
                </Animatable.View>
                <Animatable.View animation={zoomOut11} duration={2000} direction='normal'>
                    <ListItem bottomDivider containerStyle={{ backgroundColor: '#E8E8E7', padding: 25 }} onPress={ifRemove}  >
                        <ListItem.Content >
                            <ListItem.Title>Elininar </ListItem.Title>

                        </ListItem.Content>
                        <ListItem.Chevron color={'#000'} />
                    </ListItem>
                </Animatable.View>

            </ScrollView>

        </>

    )
}

export default EditConfig

const styles = StyleSheet.create({})
