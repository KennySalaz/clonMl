import React, { useEffect, useState, useRef } from 'react'
import { Text, View, StyleSheet, Image, Platform, TouchableOpacity, TextInput, Picker, Alert } from 'react-native'
import { Button, Divider, Overlay, Avatar, Accessory, Icon, } from 'react-native-elements'
import { size, map, filter, isEmpty } from 'lodash';
import { Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { getFirestore, doc, getDoc, addDoc, collection, serverTimestamp, setDoc, updateDoc } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import * as Animatable from 'react-native-animatable';
import uuid from 'random-uuid-v4'
import firebaseApp from '../../../utils/firebase';
import ModalsPrice from '../../ModalsPrice';
import { loadImageGallery } from '../../../utils/helpers'
import { firebaseStorage } from '../../../utils/actions';
import Select from 'react-native-advanced-select';
import Loading from '../../../Componentes/Loading';
import Map from './Map/Map';



const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const Market = () => {
    const navigation = useNavigation();
    const [errorSelecetImage, setErrorSelecetImage] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [errorEstado, setErrorEstado] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorDescription, setErrorDescription] = useState('')

    const [errorAnimatedCategory, seterrorAnimatedCategory] = useState(false)
    const [errorAnimatedEstado, seterrorAnimatedEstado] = useState(false)

    const [animateImage, setAnimateImage] = useState(true)

    const [loading, setLoading] = useState(false)
    const [urlImg, setUrlImg] = useState([])
    const [imageSelect, setImageSelect] = useState([])
    const [productForm, setProductForm] = useState({
        name: '',
        categoria: '',
        description: '',
        price: '',
        estado: '',
        img: [],
        crerateBy: auth.currentUser.email
    })



    const [productsData, setProductsData] = useState([])

    const animateRef = useRef()
    const animateRef2 = useRef()
    const RefImage = useRef()
    const RefAddImage = useRef()

    useEffect(() => {

        if (errorAnimatedCategory) {
            animateRef2.current.shake()
        } else {
            animateRef2.current.fadeOut()
        }

        if (errorAnimatedEstado) {
            animateRef.current.shake()
        } else {
            animateRef.current.fadeOut()
        }

        if (imageSelect !== 0) {

            setErrorSelecetImage(null)
        }

        if (productForm.categoria !== '' && productForm.categoria !== 'Categoria') {
            setErrorCategory(null)
            seterrorAnimatedCategory(false)

        }
        if (productForm.estado !== '' && productForm.estado !== 'Estado') {
            setErrorEstado(null)
            seterrorAnimatedEstado(false)

        }
    }, [errorAnimatedEstado, errorAnimatedCategory, productForm.categoria, productForm.estado], [imageSelect])



    const validateData = () => {
        setErrorSelecetImage('')
        setErrorName('')
        setErrorDescription('')
        let isValid = true

        if (size(imageSelect) === 0) {
            setErrorSelecetImage(' Debes agregar una imagen')
            RefAddImage.current.rubberBand()
            isValid = false
        }

        if (productForm.categoria === '' || productForm.categoria === 'Categoria') {
            setErrorCategory('Debes ingresar Una Categoria')
            seterrorAnimatedCategory(true)
            isValid = false
        } else {
            seterrorAnimatedCategory(false)
        }

        if (productForm.estado === '' || productForm.estado === 'Estado') {
            setErrorEstado('Debes ingresar un Estado')
            seterrorAnimatedEstado(true)
            isValid = false
        } else {
            seterrorAnimatedEstado(false)
        }


        if (isEmpty(productForm.description)) {
            setErrorDescription('Debes Ingresar Una Descripcion')
            isValid = false
        }
        if (isEmpty(productForm.name)) {
            setErrorName('Debes ingresar un titulo')
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
        setImageSelect([...imageSelect, result.image])
        RefImage.current.zoomIn()

    }

    const unploadFirestore = async () => {
        setLoading(true)
        await Promise.all(
            map(imageSelect, async (image) => {
                const response = await firebaseStorage(image, 'ImageProduct', 'Users', uuid())
                if (response.statusResponse) {
                    urlImg.push(response.url)
                }
            })
        )
        setUrlImg(urlImg)
        try {
            const idUser = auth.currentUser
            await addDoc(collection(db, "productos"),
                {
                    name: productForm.name,
                    categoria: productForm.categoria,
                    description: productForm.description,
                    price: productForm.price,
                    estado: productForm.estado,
                    createBy: idUser.email,
                    creado: serverTimestamp(),
                    img: urlImg,
                    photoURL: idUser.photoURL,
                }).then(async (data) => {
                    await addDoc(collection(db, "Clients", auth.currentUser.uid, "Products"),
                        {
                            productos_id: data.id,
                            createBy: idUser.email
                        }
                    )
                })
            alert('Publicado con exito ')
        } catch (error) {
            alert(error, 'error al subir datos')

        }
        setLoading(false)


        navigation.navigate('Tienda')
    }

    const removeImg = (image) => {
        const result = filter(imageSelect, (PorCadaImagen) => PorCadaImagen !== image)
        if (animateImage) {
            Alert.alert(
                'Eliminar Imagen',
                'Estas seguro de eliminar la imagen',
                [
                    {
                        text: 'No',
                        style: 'cancel'
                    },
                    {
                        text: 'Si',
                        onPress: () => {
                            setImageSelect(result)
                        }
                    }

                ],
                {}

            )
        }
        return RefImage.current.zoomOut()
    }

    const UploadImg = ({ imageOnPress }) => {

        return (
            <ScrollView
                horizontal
                style={styles.viewImg}
            >
                {
                    size(imageSelect) !== 0 ?
                        (
                            <>
                                {
                                    map(imageSelect, (imageMarket, index) =>
                                    (
                                        <Animatable.View
                                            ref={RefImage}

                                        >
                                            <Avatar
                                                key={index}
                                                style={styles.avatarContainer}
                                                source={{ uri: imageMarket }}
                                            >
                                                <Icon
                                                    type='material-community'
                                                    name='delete'
                                                    color='#ffffffb8'
                                                    size={25}
                                                    onPress={() => removeImg(imageMarket)}
                                                    containerStyle={styles.IconDelete}
                                                />
                                            </Avatar>
                                        </Animatable.View>

                                    ))
                                }
                                {
                                    size(imageSelect) < 10 && (
                                        <TouchableOpacity onPress={imageOnPress}>
                                            <Icon

                                                type='material-community'
                                                name='camera'
                                                color='#a7a7a7'
                                                containerStyle={styles.icon}
                                            />
                                        </TouchableOpacity>

                                    )
                                }
                            </>
                        )
                        :
                        (
                            <>
                                <TouchableOpacity onPress={imageOnPress}>
                                    <Icon

                                        type='material-community'
                                        name='camera'
                                        color='#a7a7a7'
                                        containerStyle={styles.icon}
                                    />
                                </TouchableOpacity>

                            </>
                        )
                }
            </ScrollView>
        )
    }



    return (
        <SafeAreaView>
            <ScrollView>
                <Loading isVisible={loading} text={'Publicando....'} />
                <View style={{ flex: 1 }}>
                    <Card>

                        <TextInput

                            onChangeText={(value) => setProductForm({ ...productForm, name: value })}
                            style={[styles.input_2, { height: 50, },]}
                            multiline={true}
                            placeholder={errorName ? 'Debes ingresar un titulo' : 'Titulo'}
                            placeholderTextColor={errorName && '#ff0000'}
                            defaultValue={productForm.name}

                        />
                        <Divider orientation="horizontal" />

                        {/*  <TouchableOpacity onPress={selectImage}>
                            <Card.Cover
                                style={{ padding: 5, height: 200 }}
                                source={{ uri: imageUri }} />
                        </TouchableOpacity> */}


                        <UploadImg imageOnPress={imageOnPress} />




                        <View style={{ width: '100%' }}>

                            {
                                size(imageSelect) > 9 ?

                                    (
                                        <Animatable.View
                                            style={{
                                                margin: 10,
                                                backgroundColor: '#DAFFDB',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                padding: 10

                                            }}
                                            animation='bounceIn'
                                        >
                                            <Text style={{ textAlign: 'center', fontSize: 15 }}> No puedes agregar mas fotos </Text>
                                            <Icon
                                                type='MaterialCommunityIcons'
                                                name='check-circle-outline'
                                                color='#009E05'

                                            />
                                        </Animatable.View>

                                    )
                                    :
                                    (
                                        < >
                                            < Animatable.View
                                                ref={RefAddImage}
                                                style={{ padding: 10, }}>
                                                <TouchableOpacity
                                                    style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end',
                                                        backgroundColor: errorSelecetImage ? '#FFB9B9' : '#c3c3c3bd',
                                                        padding: 10,

                                                    }}
                                                    onPress={imageOnPress}
                                                >
                                                    <Text style={{ opacity: 0.5, }}>
                                                        {
                                                            errorSelecetImage ? errorSelecetImage : '+ Agregar Imagen'
                                                        }
                                                    </Text>
                                                </TouchableOpacity>

                                            </Animatable.View>
                                            <Text style={{ fontSize: 12, padding: 9, }}> Elige primero la foto principal de la publicacion </Text>
                                        </>
                                    )
                            }
                            <Divider orientation="horizontal" />
                            <View style={{ paddingLeft: 5 }}>
                                <Picker

                                    selectedValue={productForm}
                                    style={{ height: 50 }}
                                    onValueChange={(itemValue, itemIndex) => setProductForm({ ...productForm, categoria: itemValue })}
                                >
                                    <Picker.Item label="Categoria" value="Categoria" color='#000'  ></Picker.Item>
                                    <Picker.Item label="Tecnologia" value='Tecnologia' />
                                    <Picker.Item label="Shoes" value="Shoes" />
                                    <Picker.Item label="Watches" value="Watches" />
                                    <Picker.Item label="Accesorios" value="Accesorios" />

                                </Picker>
                                <View style={[errorAnimatedCategory === false && { display: 'none' }]}>
                                    <Animatable.Text
                                        style={{ color: 'red' }}
                                        ref={animateRef2}
                                    /*   iterationCount='infinite'
                                      direction="alternate" */
                                    >   {errorCategory}   </Animatable.Text>

                                </View>
                            </View>
                            <View style={{ paddingLeft: 5 }}>
                                <Picker
                                    selectedValue={productForm}
                                    style={{ height: 50 }}
                                    onValueChange={(itemValue, itemIndex) => setProductForm({ ...productForm, estado: itemValue })}
                                >
                                    <Picker.Item label="Estado" value="Estado" color='#000' />
                                    <Picker.Item label="New" value='New' />
                                    <Picker.Item label="Used" value='Used' />
                                </Picker>
                                <View style={[errorAnimatedEstado === false && { display: 'none' }]} >
                                    <Animatable.Text
                                        style={{ color: 'red' }}
                                        ref={animateRef}
                                    /*   iterationCount='infinite'
                                      direction="alternate" */
                                    >   {errorEstado}   </Animatable.Text>

                                </View>
                            </View>
                        </View>
                        <Divider orientation="horizontal" />
                      {/*   <Map /> */}

                        <Divider orientation="horizontal" />
                        <Card.Content>
                            <TextInput
                                defaultValue={productForm.description}
                                onChangeText={(value) => setProductForm({ ...productForm, description: value })}
                                style={
                                    [
                                        styles.input, {
                                            height: 200,
                                            paddingVertical: 10,
                                            textAlignVertical: 'top',
                                            marginTop: 10,
                                        },
                                    ]
                                }
                                multiline={true}
                                placeholder={errorDescription ? 'Ingresa Una Descripcion' : 'Description'}
                                placeholderTextColor={errorDescription && 'red'} />

                            {<ModalsPrice
                                setProductForm={setProductForm}
                                productForm={productForm}
                                unploadFirestore={unploadFirestore}
                                validateData={validateData}
                            />}
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Market


const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 44,
        backgroundColor: '#c3c3c3bd',
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    input_2: {
        width: '100%',
        height: 10,
        paddingHorizontal: 20,

    },

    viewImg: {


        flexDirection: 'row',
        marginHorizontal: 10,
        marginTop: 20,

    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        width: 200,
        height: 200,
        backgroundColor: '#e3e3e3'

    },
    avatarContainer: {
        width: 100,
        height: 100,
        marginRight: 5,

    },
    IconDelete: {
        flexDirection: 'row',
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: '#e9e9e969',
        position: 'absolute',
        zIndex: 999,
        right: 0,
        left: 165,
        top: 5,
    },
    errorMessage: {
        color: '#ff0000'
    }
})