import { useFocusEffect } from '@react-navigation/core'
import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { getMoreCollectionProductUSERS } from '../../../utils/actions'
import { ListItem, Icon } from 'react-native-elements'
import { ActivityIndicator } from 'react-native'
import { size } from 'lodash'
import { UsarContext } from '../../../ContextApi/UseContext'
import { actionTypes } from '../../../ContextApi/reducer'
import { Button } from 'react-native-elements'
import Promo from './Promo/Promo'
import SkeletonContent from 'react-native-skeleton-content'


const Publications = () => {

    const [productsUser, setProductsUser] = useState([])
    const [startProducts, setStartProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    const [{ publications }, dispatch] = UsarContext()


    /*     const dataProductuser = async () => {
            const result = await getMoreCollectionProductUSERS()
            if (result.status) {
    
                dispatch({
                    type: actionTypes.DATA_PUBLICATION,
                    publications: result.products
    
                })
                 setProductsUser(result.products)
            }
        } */


    useFocusEffect(
        useCallback(() => {
            async function getData() {
                const response = await getMoreCollectionProductUSERS()
                setProductsUser(response.products)
            }
            getData()
            /*   setLoading(true)
              dataProductuser()
              setLoading(false) */
        }, [])
    )


    const RenderItem = ({ product }) => {

        const { id, name, description, price, estado, crerateBy, img, categoria } = product.item


        return (
            <TouchableOpacity onPress={() => navigation.navigate('EditConfig', { id })}>
                <ListItem
                    key={product.id}
                    bottomDivider>
                    <Image
                        resizeMode='cover'
                        style={{ width: 100, height: 100 }}
                        source={{ uri: img?.[0] }}
                        PlaceholderContent={<ActivityIndicator color='#fff' />}

                    />

                    {/*   <Icon name={item.icon} /> */}
                    <ListItem.Content>
                        <ListItem.Title>  {name}</ListItem.Title>

                        <ListItem.Title>
                            {
                                size(description) < 0 ?
                                    `${description.substr(0, 50)}...`
                                    : description

                            }
                        </ListItem.Title>
                        <ListItem.Title> {price}</ListItem.Title>
                        <ListItem.Title>  {estado}</ListItem.Title>


                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>
        )

    }



    return (
        <View>

            {
                size(productsUser) > 0 ?

                    (
                        <>


                            <FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data={productsUser}
                                renderItem={(product) => (
                                    <RenderItem product={product} />
                                )}

                            />
                        </>

                    )
                    :
                    (


                        <SkeletonContent
                            containerStyle={{ flex: 1, width: 300, margin: 20 }}
                            isLoading={true}
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
                        />
                    )

            }


        </View>
    )
}

export default Publications

const styles = StyleSheet.create({})
