import { useNavigation } from '@react-navigation/core'
import { filter, size } from 'lodash'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { loadImageGallery } from '../../../../utils/helpers'
import { Dimensions, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { UsarContext } from '../../../../ContextApi/UseContext'
import { actionTypes } from '../../../../ContextApi/reducer'
import { AuthContext } from '../../../../ContextApi/useImage'
import { Alert } from 'react-native'


const { width, height } = Dimensions.get('screen')

const IMAGE_SIZE = 80
const SPACING = 5
const data =
    [
        { id: 1, image: 'https://s1.1zoom.me/big3/471/Painting_Art_Back_view_Photographer_575380_3840x2400.jpg' },
        { id: 2, image: 'https://neliosoftware.com/es/wp-content/uploads/sites/3/2018/07/aziz-acharki-549137-unsplash-1200x775.jpg' },
        { id: 3, image: 'https://blog.hootsuite.com/wp-content/uploads/2019/02/photographer-865295_1920-e1550084906860.jpg' },
        { id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHtWNeSg0gK2G7S7Etp_JcJRqcxVoJrkmKbRuwAtnerDeq_4kFTcHdir8ypoAgv5cWarE&usqp=CAU' },
        { id: 5, image: 'https://www.blogdelfotografo.com/wp-content/uploads/2019/02/camara-escritorio.jpg' },
        { id: 6, image: 'https://www.escueladesarts.com/wp-content/uploads/fotografia-a-color.jpg' },
        { id: 7, image: 'https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/02/hipertextual-digitaliza-tus-viejas-fotografias-con-estas-aplicaciones-android-y-ios-2020171352.jpg?fit=1920%2C1271&ssl=1' },
    ]

const VenderAddPhoto = ({ route }) => {

    const [activeIndex, setActiveIndex] = useState(0)

    const { title, category, state, imageSelect } = route.params
    const navigation = useNavigation();
    const [{ user, }, dispatch] = UsarContext()
    const [imageContext, setImageContext] = useContext(AuthContext);
    const [imagens, setImagens] = useState([])
    const [itemState, setItemState] = useState('')
    const [indexIMG, setIndexIMG] = useState('')
    const topRef = useRef()
    const thumRef = useRef()


    const scrollToActiveIndex = (index) => {
        setActiveIndex(index)
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true

        })

        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            thumRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        } else {
            thumRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }

    }

    const validateImg = () => {
      
        let isValid = true
        if (imageContext.length === 0) {
            Alert.alert('Debe Ingresar las imagenes')
            isValid = false
        } else if (imageContext.length < 3) {
            Alert.alert('Debe Ingresar al menos 3 imagenes')
            isValid = false
        }



        return isValid
    }



    const imageOnPress = async () => {
        const result = await loadImageGallery([1, 1])
        if (!result.status) {
            Alert('Error al subir las imagenes')
            return
        }
        setImageContext([...imageContext, result.image])


    }

    const removeImg = (imageProps) => {
        const result = filter(imageContext, (PorCadaImagen) => PorCadaImagen !== imageProps)

        setImageContext(result)

    }

    const envi = () => {
        if (!validateImg()) {
            return
        }

        navigation.navigate('VenderDescripton', { title, category, state, imageContext })

    }

    useEffect(() => {
        dispatch({
            type: actionTypes.DELETE_IMGA,
            deleteImg: itemState
        })
        dispatch({
            type: actionTypes.IMAGES_DELETE,
            imageDelete: imageContext
        })
        dispatch({
            type: actionTypes.IMAGES_DELETE,
            indexImg: indexIMG
        })

        console.log(indexIMG,)


    }, [imageContext])
    return (
        <View style={{ flex: 1 }}>


            <FlatList
                ref={topRef}
                data={imageContext}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
                }}
                renderItem={({ item, index }) => {
                    setItemState(item)
                    setIndexIMG(index)
                    return (
                        <>
                            <View style={{ width, height }}>
                                <Icon
                                    containerStyle={{ backgroundColor: '#fff', top: 0, right: 0, position: 'absolute', zIndex: 9999, }}
                                    type='MaterialIcons'
                                    name='delete'
                                    size={20}
                                    color={'#1e1144f0'}
                                    onPress={() => removeImg(item)}
                                    raised
                                />
                                <Image
                                    source={{ uri: item }}
                                    style={{ width: '100%', height, zIndex: 5, }}
                                    resizeMode='cover'
                                />
                            </View>
                        </>
                    )
                }}
                ListEmptyComponent={() => {
                    return (
                        <View style={{ width, height: 500, justifyContent: 'center', alignContent: 'center' }}>
                            <Icon
                                type='MaterialIcons'
                                name='add-a-photo'
                                size={200}
                            />
                            <Text style={{ textAlign: 'center' }}> AGREGAR FOTO DEL PRODUCTO </Text>
                        </View>
                    )
                }}
            />
            <View style={{ padding: 8, backgroundColor: '#1e1144f0', }}>
                <FlatList
                    ref={thumRef}
                    data={imageContext}
                    keyExtractor={index => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    /*  style={{ position: 'absolute', bottom: IMAGE_SIZE }} */
                    contentContainerStyle={{ paddingHorizontal: SPACING, }}
                    renderItem={({ item, index }) => {
                        setItemState(item)
                        setIndexIMG(index)

                        return <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: 15,
                                    marginRight: SPACING,
                                    borderWidth: 3,
                                    borderColor: index === activeIndex ? '#fff' : 'transparent'
                                }}
                            />
                        </TouchableOpacity>
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{
                                borderWidth: 3,
                                borderColor: '#fff'
                            }}>
                                <Icon
                                    style={{ padding: 5 }}
                                    type='MaterialIcons'
                                    name='insert-photo'
                                    size={80}
                                    color={'#fff'}
                                />
                            </View>
                        )
                    }}
                />

            </View>
            <Button
                containerStyle={{ margin: 5 }}
                title='Continuar'
                buttonStyle={{ backgroundColor: '#1e1144f0', width: '100%' }}
                onPress={envi}
            />
            <Button
                onPress={imageOnPress}
                containerStyle={{ margin: 5 }}
                buttonStyle={{ backgroundColor: '#fff' }}
                titleStyle={{ color: '#1e1144f0' }}
                title='Cargar Mas Fotos'
            />
            {/* 
            <View style={{ margin: 10 }}>
                <Image
                
                    style={{
                        width: '100%',
                        height: 550,

                    }}

                    source={
                        imagens.length !== 0 ?    
                        {uri: imagens[0]}  
                        :
                        {uri: imageSelect[0]}  
                
                    }
                    
                    resizeMode='contain'
                />
            </View>



            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{
                        width: 70,
                        height: 70,
                        margin: 5,
                    }}
                    resizeMode="cover"
                    source={{ uri: imagens[1] }}
                />
                <Image
                    style={{
                        width: 70,
                        height: 70,
                        margin: 5,
                    }}
                    resizeMode="cover"
                    source={{ uri: imagens[2] }}
                />
                <Image
                    style={{
                        width: 70,
                        height: 70,
                        margin: 5,
                    }}
                    resizeMode="cover"
                    source={{ uri: imagens[3] }}
                />
                <Image
                    style={{
                        width: 70,
                        height: 70,
                        margin: 5,
                    }}
                    resizeMode="cover"
                    source={{ uri: 'https://s1.1zoom.me/big3/471/Painting_Art_Back_view_Photographer_575380_3840x2400.jpg' }}
                />

            </View>

            <Button
                containerStyle={{ margin: 10 }}
                title='Continuar'
                buttonStyle={{ backgroundColor: '#1e1144f0', width: '100%' }}
                onPress={() => navigation.navigate('VenderDescripton', { title, category, state })}
            />
            <Button
                onPress={imageOnPress}
                containerStyle={{ margin: 10 }}
                buttonStyle={{ backgroundColor: '#fff' }}
                titleStyle={{ color: '#1e1144f0' }}
                title='Cargar Mas Fotos'
            /> */}
        </View>
    )
}

export default VenderAddPhoto

const styles = StyleSheet.create({

})
