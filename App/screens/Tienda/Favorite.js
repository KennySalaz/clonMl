import { useFocusEffect, useNavigation } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { Image } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { Text, View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { UsarContext } from '../../ContextApi/UseContext'
import { listFavorites } from '../../utils/actions'
import SkeletonContent from 'react-native-skeleton-content';
import { size } from 'lodash'
import Loading from '../../Componentes/Loading'

const Favorite = () => {

    const [{ favoritProduct }, dispatch] = UsarContext()
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadinSkeletor, setLoadinSkeletor] = useState(false)


    useFocusEffect(
        useCallback(
            () => {
                async function getData() {

                    setLoading(true)
                    setLoadinSkeletor(true)
                    const result = await listFavorites()
                    setFavorites(result.favorites)
                    console.log(`aqui el id`, result)
                    setLoading(false)
                    setLoadinSkeletor(false)
                }
                getData()
            }, [],
        )
    )

    const Renderm = ({ product }) => {
        const { id, name, categoria, img, description, price, estado, crerateBy } = product.item
        const goProduct = () => {

            navigation.navigate('InfoProduct', { id })

        }

        return (
            <>
                <TouchableOpacity onPress={goProduct} >
                    <ListItem
                        containerStyle={{ width: '100%', }}
                        key={product.id}
                        bottomDivider
                    >
                        <View style={{ backgroundColor: '#E6E6E6', padding: 5 }}>
                            <Image
                                resizeMode='cover'
                                style={{ width: 140, height: 140, }}
                                source={{ uri: img[0] }}
                                PlaceholderContent={<ActivityIndicator color='#fff' />}

                            />


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
            </>
        )
    }

    const NoFavorite = () => {
        return (
            <View style={{ flex : 1  }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>No tienes FAVORITOSs </Text>
            </View>

        </View>
        )
    }
    return (
        <ScrollView>
            <FlatList
                contentContainerStyle={{ width: '100%' }}
                keyExtractor={(item, index) => index.toString()}
                data={favorites}
                renderItem={(product) => (
                    <Renderm product={product} />
                )}
                ListEmptyComponent={<NoFavorite />}

            />
            <Loading isVisible={loading} text={'Cargando....'} />
          {/*   <SkeletonContent
                containerStyle={{ flex: 1, width: 300, margin: 20 }}
                isLoading={loadinSkeletor}
                animationType='shiver'
                animationDirection="horizontalLeft"
                layout={[
                    {
                        width: '100%', height: 200, flexDirection: 'row',
                        children:
                            [
                                { width: 150, height: 150, marginBottom: 6 },
                                {
                                    flexDirection: 'column', margin: 5,
                                    children: [
                                        { width: 180, height: 20, marginBottom: 20 },
                                        { width: 100, height: 20, marginBottom: 6 }
                                    ]
                                }

                            ]
                    },
                    {
                        width: '100%', height: 200, flexDirection: 'row',
                        children:
                            [
                                { width: 150, height: 150, marginBottom: 6 },
                                {
                                    flexDirection: 'column', margin: 5,
                                    children: [
                                        { width: 180, height: 20, marginBottom: 20 },
                                        { width: 100, height: 20, marginBottom: 6 }
                                    ]
                                }

                            ]
                    },
                    {
                        width: '100%', height: 200, flexDirection: 'row',
                        children:
                            [
                                { width: 150, height: 150, marginBottom: 6 },
                                {
                                    flexDirection: 'column', margin: 5,
                                    children: [
                                        { width: 180, height: 20, marginBottom: 20 },
                                        { width: 100, height: 20, marginBottom: 6 }
                                    ]
                                }

                            ]
                    },
                    {
                        width: '100%', height: 200, flexDirection: 'row',
                        children:
                            [
                                { width: 150, height: 150, marginBottom: 6 },
                                {
                                    flexDirection: 'column', margin: 5,
                                    children: [
                                        { width: 180, height: 20, marginBottom: 20 },
                                        { width: 100, height: 20, marginBottom: 6 }
                                    ]
                                }

                            ]
                    }
                ]}
            /> */}

        </ScrollView >

    )
}

export default Favorite
