import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';



const VentasClient = ({ ventasVendedor }) => {


    const RenderItem = ({ product }) => {
        const { id, name, description, price, estado, crerateBy, img, categoria } = product

        return (
            <>
                <TouchableOpacity>
                    <Card
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0.80,
                            shadowRadius: 2.27,
                            elevation: 5,
                        }}
                    >
                        <Card.Cover
                            resizeMode='cover'
                            source={{ uri: 'https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2021/01/28/16118536180862.jpg' }} />
                        <Card.Content>
                            <Paragraph> Nombre del producto </Paragraph>
                            <Title> $Precio </Title>

                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </>
        )
    }
    return (
        <>
            {
                ventasVendedor.map((product, id) => (
                    <View style={{
                        width: 200,
                        height: 300,
                        padding: 7,
                    }}>
                        <RenderItem product={product} />
                    </View>
                ))
            }
            <View style={{
                justifyContent: 'center',
                padding: 20,

            }}>
                <Icon
                    raised
                    name='chevron-right'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => console.log('hello')} />
                <Text> Ver mas</Text>
            </View>
        </>





        /*     <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={ventasVendedor}
            renderItem={(product) => (
                <RenderItem product={product} />
            )}
    
        /> */



    )
}

export default VentasClient

const styles = StyleSheet.create({})
