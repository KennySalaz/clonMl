import React, { useState, useCallback } from 'react'

import { useFocusEffect } from '@react-navigation/native'
import { useEffect } from 'react';
import {
        Alert,
        StyleSheet,
        Dimensions,
        ScrollView,
        TouchableOpacity,
        TextInput,
        Text,
        View,
        Image
} from 'react-native';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import Loading from '../../../Componentes/Loading';
import { addCollectionClients, deleteFavorite, getDocumentId, getDocumentIdClients, getIsFavorite, getMoreCollectionProductUSERS, getsProdutsUser } from '../../../utils/actions';
import { Button, Icon, Divider } from 'react-native-elements'
import CarouselImg from './CarouselImg';


import { size } from 'lodash';
import { getAuth } from '@firebase/auth';
import firebaseApp from '../../../utils/firebase';
import { useNavigation } from '@react-navigation/core'
import { UsarContext } from '../../../ContextApi/UseContext';
import { query, where, orderBy, limit, getDocs, collection, getFirestore } from 'firebase/firestore';
import VentasClient from './VentasClient';
import { actionTypes } from '../../../ContextApi/reducer';
import * as Animatable from 'react-native-animatable';
import SkeletonContent from 'react-native-skeleton-content';
import LoadingError from '../../../Componentes/LoadingError';

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

const InfoProduct = ({ route }) => {
        const { id } = route.params
        const [productDocuemntId, setProductDocuemntId] = useState([])
        const [loading, setLoading] = useState(false)
        const [ventasVendedor, setVentasVendedor] = useState([])
        const widthScrrens = Dimensions.get('window').width
        const [editFvorite, setEditFvorite] = useState(false)
        const [{ publications, favoriteID, idProduct, user }, dispatch] = UsarContext()
        const [errorLoadings, setErrorLoadings] = useState(null)
        const navigattion = useNavigation()

        const documentById = async () => {
                setLoading(true)
                const result = await getDocumentId('productos', id)

                if (result.statusRespon) {
                        setProductDocuemntId(result.document)
                } else {
                        setErrorLoadings(true)
                        setProductDocuemntId({})
                        Alert.alert('no se pudo cargar el producto')
                }
                setLoading(false)
              
        }
        const productUser = async () => {
                const response = await getsProdutsUser()
                /*  setVentasVendedor(response.data) */

        }
        useEffect(() => {

                documentById()
                productUser()
                dispatch({
                        type: actionTypes.FOVORITE_ID,
                        favoriteID: id
                })
        }, [])
        return (
                <>
                        <ScrollView >
                                <LoadingError isVisible={errorLoadings} />
                                <Loading isVisible={loading} text={'Cargando '} />

                                <Animatable.View animation="zoomInRight" duration={1000} direction='normal'>
                                        <Card>
                                                <Card.Content>
                                                        <Title> {productDocuemntId?.name} </Title>
                                                        <Paragraph> {productDocuemntId?.estado} </Paragraph>
                                                </Card.Content>
                                                <CarouselImg
                                                        width={widthScrrens}
                                                        images={productDocuemntId?.img}
                                                        height={300}
                                                />

                                                <Card.Content>
                                                        <Title
                                                                style={{ fontSize: 30, paddingTop: 20, }}
                                                        >   U${productDocuemntId?.price} </Title>

                                                </Card.Content>
                                                <Card.Content>
                                                        <Text style={{ color: 'blue', padding: 10, }}>
                                                                Ver los medios de pago
                                                        </Text>
                                                        <View>
                                                                <Text style={{ paddingBottom: 10 }} > Entrega a acordar con el vendedor </Text>
                                                                <Text style={{ padding: 15, backgroundColor: '#ECECEC', }}> Ubicacion</Text>
                                                                <Text style={{ color: 'blue', paddingTop: 10, paddingBottom: 10, }}> Ver costos de envios</Text>
                                                        </View>
                                                </Card.Content>
                                                <Card.Content>
                                                        <TouchableOpacity>
                                                                <View style={{
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'flex-start',
                                                                        backgroundColor: '#ECECEC',
                                                                        padding: 20,

                                                                }}>
                                                                        <Text style={{ color: '#000', fontWeight: 'bold' }}>
                                                                                Cantidad: 1
                                                                        </Text>
                                                                        <Text style={{ paddingLeft: 10 }}>
                                                                                (295 disponibles)
                                                                        </Text>
                                                                        <View style={{
                                                                                width: '40%',
                                                                                justifyContent: 'flex-end',
                                                                                alignItems: 'flex-end'
                                                                        }}>
                                                                                <Icon
                                                                                        type='ant-design'
                                                                                        name='right'
                                                                                        size={15}
                                                                                />
                                                                        </View>
                                                                </View>
                                                        </TouchableOpacity>
                                                </Card.Content>

                                                <Card.Content>
                                                        <Button
                                                                containerStyle={{
                                                                        marginTop: 20,
                                                                }}
                                                                title={'Comprar'}
                                                                titleStyle={{
                                                                        fontSize: 25,
                                                                        fontWeight: 'bold'
                                                                }}
                                                        />
                                                </Card.Content>
                                                <Card.Content>
                                                        <Text style={{ paddingTop: 20, fontWeight: 'bold' }} >
                                                                Mas Publicaciones del Vendedor
                                                        </Text>
                                                        <ScrollView
                                                                style={{
                                                                        flexDirection: 'row',
                                                                        marginTop: 20,
                                                                }}
                                                                horizontal
                                                        ><>
                                                                        <VentasClient ventasVendedor={ventasVendedor} />
                                                                </>
                                                        </ScrollView>
                                                </Card.Content>
                                                <Divider orientation="horizontal" />

                                                <Card.Content>
                                                        <Text style={{ fontSize: 20, marginBottom: 25, marginTop: 25, }}>Informacion Del Vendedor </Text>
                                                        <View style={{ flexDirection: 'row' }}>
                                                                <View style={{
                                                                        width: 60,
                                                                        height: 60,
                                                                        backgroundColor: '#DCDCDC',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                }}>
                                                                        <Image
                                                                                style={{ width: 50, height: 50 }}
                                                                                source={{ uri: productDocuemntId?.photoURL }}
                                                                        />
                                                                </View>

                                                                <View style={{ justifyContent: 'center' }}>
                                                                        <Text> {productDocuemntId?.createBy} </Text>
                                                                        <Text> Vendedor Calificado </Text>
                                                                </View>

                                                        </View>
                                                        <TouchableOpacity onPress={() => navigattion.navigate('InfoSeller')}>
                                                                <View style={{
                                                                        backgroundColor: '#fff',
                                                                        padding: 20,
                                                                        flexDirection: 'row',
                                                                        backgroundColor: '#ECECEC',
                                                                        marginTop: 20,
                                                                        justifyContent: 'space-between',
                                                                        alignItems: 'center',
                                                                }}>
                                                                        <Text> Ver mas datos del vendedor </Text>
                                                                        <Icon
                                                                                type='ant-design'
                                                                                name='right'
                                                                                size={15}
                                                                        />
                                                                </View>
                                                        </TouchableOpacity>
                                                </Card.Content>
                                                <Card.Content style={{ paddingTop: 20 }}>
                                                        <Title> Product Description  </Title>
                                                        <Card style={{ marginTop: 10 }}>
                                                                <Paragraph
                                                                        style={{ padding: 10, }}
                                                                >
                                                                        {productDocuemntId?.description}
                                                                </Paragraph>
                                                        </Card>
                                                </Card.Content>
                                                <Card.Content>
                                                        <Text style={{ fontSize: 15, fontWeight: 'bold', paddingTop: 10 }}> Preguntas y Respuestas </Text>
                                                        <Text style={{ color: '#4F4E4E', fontSize: 15, fontWeight: 'bold', paddingTop: 10 }}> Preguntar </Text>

                                                        <TextInput style={
                                                                [
                                                                        styles.inp0ut, {
                                                                                height: 50,
                                                                                paddingVertical: 10,
                                                                                textAlignVertical: 'top',
                                                                                marginTop: 10,
                                                                                marginBottom: 10,

                                                                        },
                                                                ]
                                                        } >

                                                        </TextInput>
                                                        <Button
                                                                title='Preguntar'
                                                        />
                                                </Card.Content>
                                                <Card.Content>
                                                        <Text> Ultimas Realizadas </Text>
                                                </Card.Content>
                                        </Card>
                                </Animatable.View>




                        </ScrollView>
                </>
        )
}

export default InfoProduct

const styles = StyleSheet.create({
        input: {
                width: '100%',
                height: 44,
                backgroundColor: '#c3c3c3bd',
                borderRadius: 6,
                paddingHorizontal: 10,
        },


})
