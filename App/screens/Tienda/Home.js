
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState, } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Loading from '../../Componentes/Loading'
import { getCollectionProduct, getMoreCollectionProduct } from '../../utils/actions'
import { ListItem, Icon, Button, Card } from 'react-native-elements'
import { Image } from 'react-native-elements'
import { ActivityIndicator } from 'react-native'
import { ScrollView, FlatList } from 'react-native'
import { size } from 'lodash'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/core";
import { UsarContext } from '../../ContextApi/UseContext'
import { actionTypes } from '../../ContextApi/reducer'
import Promo from './Publications/Promo/Promo'
import SkeletonContent from 'react-native-skeleton-content'
import { LinearGradient } from 'expo-linear-gradient'



const Home = () => {

    const [products, setProducts] = useState([])
    const [startProducts, setStartProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const [favoriteState, setFavoriteState] = useState(false)

    const limitedProduct = 7

    const funColl = async () => {
        setLoading(true)
        const result = await getCollectionProduct(limitedProduct)
        if (result.status) {
            setProducts(result.products)
            setStartProducts(result.startProduct)
        }
       
        setLoading(false)

    }

    const handleLeadMore = async () => {
        if (!startProducts) {
            return
        }
        setLoading(true)
        const result = await getMoreCollectionProduct(limitedProduct, startProducts)
        if (result.status) {

            setStartProducts(result.startProduct)
            setProducts([...products, ...result.products])
        }
        setLoading(false)
    }

    /*    useFocusEffect(
           useCallback(() => {
              
           }, [])
       ) */

    useEffect(() => {
        funColl()
    }, [])

    const fState = () => {
        setFavoriteState(!favoriteState)
    }



    const RenderItem = ({ product }) => {
        const { id, name, categoria, img, description, price, estado, crerateBy } = product.item



        const goProduct = () => {

            navigation.navigate('InfoProduct', { id })

        }
        return (

            <TouchableOpacity onPress={goProduct}>
                <ListItem
                    containerStyle={{ width: '100%', }}
                    key={product.id} bottomDivider>
                    <View style={{ backgroundColor: '#E6E6E6', padding: 5 }}>
                        <Image
                            resizeMode='cover'
                            style={{ width: 140, height: 140, }}
                            source={{ uri: img?.[0] }}
                            PlaceholderContent={<ActivityIndicator color='#fff' />}

                        />
                        <View style={{ position: 'absolute', right: 0, backgroundColor: '#ffffffc4', width: 34, height: 34, borderRadius: 17, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <Icon type='font-awesome' name={favoriteState ? 'heart' : 'heart-o'} size={20} color={'#4285f4'} onPress={fState} />
                        </View>

                    </View>
                    <View style={{ flexDirection: 'column', bottom: 30, }}>
                        <View style={{ width: '100%' }} >
                            < Text style={{
                                fontSize: 15,

                                color: '#000',
                                textTransform: 'uppercase'


                            }} >{name}</Text>

                            {/*     <ListItem.Title> Description :
                            {
                                size(description) > 0 ?
                                    `${description.substr(0, 20)}...`
                                    : description

                            }
                        </ListItem.Title> */}

                        </View>
                        <View style={{ width: '90%' }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',

                                }}
                            >
                                U${price}
                            </Text>
                        </View>
                    </View>


                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>

        )
    }
    return (
        <ScrollView style={{ backgroundColor: '#dddddd6e' }}>

            {
                loading ?
                    (
                        <>
                            <LinearGradient
                                colors={['#1e1144f0', 'transparent']}
                                style={styles.background}
                            />
                            <SkeletonContent
                                containerStyle={{ flex: 1, width: 300, margin: 20 }}
                                isLoading={true}
                                animationType='shiver'
                                animationDirection="horizontalLeft"
                                layout={[
                                    {
                                        width: 350,
                                        height: 170,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        marginVertical: 10
                                    },
                                    {
                                        width: '100%', flexDirection: 'row',

                                        children: [
                                            { width: 60, height: 60, borderRadius: 30, margin: 5 },
                                            { width: 60, height: 60, borderRadius: 30, margin: 5 },
                                            { width: 60, height: 60, borderRadius: 30, margin: 5 },
                                            { width: 60, height: 60, borderRadius: 30, margin: 5 },
                                            { width: 60, height: 60, borderRadius: 30, margin: 5 },

                                        ]
                                    },
                                    {
                                        width: 350,
                                        height: 400,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        marginVertical: 10,

                                    }
                                ]}
                            />

                        </>

                    )
                    :
                    (
                        <>
                            <Promo />
                            <View style={{
                                backgroundColor: '#dddddd6e',
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>

                                <View style={{ alignItems: 'center' }}>
                                    <Icon
                                        raised
                                        name='clock-o'
                                        type='font-awesome'
                                        color='#1e1144b3'

                                    />
                                    <Text style={{ fontSize: 11 }}> Historial </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon
                                        raised
                                        name='car'
                                        type='font-awesome'
                                        color='#1e1144b3'

                                    />
                                    <Text style={{ fontSize: 11 }}> Carros, motos</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon
                                        raised
                                        name='home-work'
                                        type='Material-Community-Icon'
                                        color='#1e1144b3'

                                    />
                                    <Text style={{ fontSize: 11 }}> Inmuebles </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon
                                        raised
                                        name='store'
                                        type='font-awesome5'
                                        color='#1e1144b3'
                                    />
                                    <Text style={{ fontSize: 11 }}> Tienda Oficiales </Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Icon
                                        raised
                                        name='smartphone'
                                        type='Ion-icons'
                                        color='#1e1144b3'

                                    />
                                    <Text style={{ fontSize: 11 }}> Celulares </Text>
                                </View>
                            </View>
                            <View>
                                <Card containerStyle={{
                                    padding: 0, shadowColor: "#000",
                                    shadowOffset: {
                                        width: 3,
                                        height: 3,
                                    },
                                    shadowOpacity: 0.27,
                                    shadowRadius: 2.65,

                                    elevation: 10,
                                }}>
                                    <Card.Title style={{ padding: 20, textAlign: "left" }}>Visto recientemente</Card.Title>
                                    <Card.Divider style={{ marginTop: -10, marginBottom: 0 }} />
                                    <Card.Image
                                        style={{ padding: 0, height: 400 }}
                                        resizeMode={'cover'}
                                        source={{

                                            uri:
                                                'https://venezuelamarket58.com/wp-content/uploads/2020/10/Image-3-4.jpg',
                                        }}
                                    />

                                    <View style={{ padding: 10, }}>

                                        <Text>
                                            iPhone 13 Pro Max 256 Gb 6 Gb Ram Nuevo Sellado
                                        </Text>

                                        <Text style={{ fontSize: 20, color: '#000' }}>
                                            US$1200
                                        </Text>
                                    </View>
                                    <Card.Divider style={{ marginBottom: 2 }} />
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, }}>
                                        <Text style={{ color: '#1e1144b3', fontSize: 14, fontWeight: 'bold' }}> Ver Historial de navegacion </Text>
                                        <Icon
                                            type='font-awesome'
                                            name="angle-right"
                                        />
                                    </View>
                                </Card>
                            </View>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <Image
                                    style={{
                                        width: 360,
                                        height: 150,
                                        borderRadius: 10,
                                        margin: 10,
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.27,
                                        shadowRadius: 5.65,

                                        elevation: 2,
                                    }}
                                    source={{

                                        uri:
                                            'https://www.ohcielos.com/img/banner-envio-gratis.jpg',
                                    }}
                                />
                            </View>

                            <Card containerStyle={{
                                padding: 0, shadowColor: "#000",
                                shadowOffset: {
                                    width: 3,
                                    height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 2.65,

                                elevation: 10,
                            }}>
                                <Card.Title style={{ padding: 15, textAlign: "left", fontWeight: 'bold' }}>Categorias</Card.Title>
                                <Card.Divider style={{ marginTop: -10, marginBottom: 0 }} />


                                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }} >

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

                                        elevation: 2,
                                        padding: 15,
                                        width: '45%',

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

                                        elevation: 2,
                                        padding: 15,
                                        width: '45%',
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

                                        elevation: 2,
                                        padding: 15,
                                        width: '45%',
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

                                        elevation: 2,
                                        padding: 15,
                                        width: '45%',
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

                                        elevation: 2,
                                        padding: 15,
                                        width: '45%',
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

                                        elevation: 2,
                                        padding: 15,
                                        width: '45%',
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
                                <Card.Divider style={{ marginBottom: 2 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, }}>
                                    <Text style={{ color: '#1e1144b3', fontSize: 14, fontWeight: 'bold' }}> Ver Historial de navegacion </Text>
                                    <Icon
                                        type='font-awesome'
                                        name="angle-right"
                                    />
                                </View>
                            </Card>
                            <FlatList
                                contentContainerStyle={{ width: '100%' }}
                                keyExtractor={(item, index) => index.toString()}
                                data={products}
                                renderItem={(product) => (
                                    <RenderItem product={product} />
                                )}
                            />



                        </>

                    )
            }
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,
    },
})
