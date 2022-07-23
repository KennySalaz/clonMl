import React, { useCallback, useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native-paper';
import { View, Alert, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Button, Input, Avatar, Card, Icon } from 'react-native-elements'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebaseApp from '../../utils/firebase'
import { UsarContext } from '../../ContextApi/UseContext'
import { actionTypes } from '../../ContextApi/reducer'
import { loadImageGallery } from '../../utils/helpers'
import { firebaseStorage, updateProfileAvtar } from '../../utils/actions'
import Loading from '../../Componentes/Loading'
import { getFirestore, doc, updateDoc, collection, getDoc, getDocs } from 'firebase/firestore'
import { isEmpty } from 'lodash'
import * as Animatable from 'react-native-animatable';
import { getAuth, signOut } from '@firebase/auth'
import ConfigSetting from './Settings/ConfigSetting';


const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

const MyProfile = () => {


    const navigate = useNavigation()
    const [{ user }, dispatch] = UsarContext()
    const [loading, setLoading] = useState(false)
    const [loadingSignUp, setLoadingSignUp] = useState(false)
    const [photoURL, setPhotoURL] = useState(user.photoURL)
    const [dataClients, setDataClients] = useState([])
    const [activeInput, setActiveInput] = useState(null)
    const [activeInputName, setActiveInputName] = useState(null)
    const [formrValue, setFormrValue] = useState({
        name: '',
        lastName: '',
    })
    const [errorLastNameClients, setErrorLastNameClients] = useState(null)
    const [errorNameClients, setErrorNameClients] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const exitUser = () => {
        setLoadingSignUp(true)
        signOut(auth).then(() => {
            dispatch({
                type: actionTypes.USER_FIREBASE,
                user: null
            })
            navigate.navigate('Tienda')
        }).catch(error => {
            setLoadingSignUp(false)
            Alert(error)
        })
    }

    const ChangePhoto = async () => {
        const result = await loadImageGallery([1, 1])

        if (!result.status) {
            return
        }
        setLoading(true)
        const responseFirebaseStorage = await firebaseStorage(result.image, 'avatars', 'User', user.email)
        console.log(responseFirebaseStorage.url)
        if (!responseFirebaseStorage.statusResponse) {
            setLoading(false)
            Alert('Error')
            return
        }
        const resultUpdateProfile = await updateProfileAvtar(responseFirebaseStorage.url)
        setLoading(false)


        if (resultUpdateProfile.statusResponse) {
            setPhotoURL(responseFirebaseStorage.url)
        } else {
            Alert('error al actualizar la imagen')
        }

        const Ref = doc(db, "Clients", auth.currentUser.uid);

        await updateDoc(Ref, {
            img: photoURL
        });


    }
    const clientsData = async () => {
          setRefresh(true)
        const refClients = doc(db, 'Clients', auth.currentUser.uid)
        await getDoc(refClients).then(doc => {
            setDataClients(doc.data())

        })
          setRefresh(false)
    }

    const validateLastName = () => {
        setErrorLastNameClients('')
        let isValid = true

        if (formrValue.lastName === dataClients.LastName) {
            setErrorLastNameClients('Debes ingresar Un apellido diferente al actual ')
            isValid = false
        }
        return isValid

    }

    const validateName = () => {
        setErrorNameClients('')
        let isValid = true

        if (formrValue.name === dataClients.name) {
            setErrorNameClients('Debes ingresar Un nombre diferente al actual ')
            isValid = false
        }
        return isValid

    }

    const editLastNameClients = async () => {
        if (!validateLastName()) {
            return
        }
        setLoading(true)
        const refName = doc(db, 'Clients', auth.currentUser.uid)
        await updateDoc(refName, {
            LastName: formrValue.lastName
        })

        setActiveInput(false)
        setLoading(false)
    }

    const editNameClients = async () => {
        if (!validateName()) {
            return
        }

        setLoading(true)

        const refName = doc(db, 'Clients', auth.currentUser.uid)
        await updateDoc(refName, {
            name: formrValue.name
        })

        setActiveInputName(false)
        setLoading(false)

        /*   navigate.goBack('Myaccount') */


    }

    const xEdite = () => {
        setFormrValue(formLasName)
    }
    const alertLastName = () => {
        Alert.alert(
            'LastName',
            'Desea cambiar el apellido',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Si',
                    onPress: editLastNameClients
                }

            ]

        )
    }

    const alertName = () => {
        Alert.alert(
            'Nombre',
            'Desea cambiar el nombre',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Si',
                    onPress: editNameClients
                }

            ]

        )
    }

    useEffect(() => {
        if (formrValue.lastName === '') {
            setActiveInput(false)
        } else {
            setActiveInput(true)
        }


    }, [formrValue.lastName])

    useEffect(() => {
        if (formrValue.name === '') {
            setActiveInputName(false)


        } else {
            setActiveInputName(true)

        }
    }, [formrValue.name])

    useFocusEffect(
        useCallback(() => {

            clientsData()


        }, [])
    )

    const IconRef = () => {
        return (
            /*  containerStyle: {
                 display: activeInputName ? 'flex' : 'none'
             }, */
            /*   type: 'ant-design',
              name: activeInputName ? 'checkcircle' : 'closecircle',
              color: activeInputName ? 'green' : 'red',
              onPress: activeInputName && alertName */

            <Animatable.View  >
                <AntDesign
                    onPress={activeInputName && alertName}
                    style={{
                        color: activeInputName ? 'green' : 'red',
                        display: activeInputName ? 'flex' : 'none',

                    }}
                    name='checkcircle'
                    color={'#000'}
                    size={20}
                    onPress={activeInputName && alertName}
                />
            </Animatable.View>

        )
    }



    return (
        <Animatable.View animation="bounceInRight" duration={2000} direction='normal' style={{ flex: 1 }} >
            <Loading isVisible={loading} text={'Espere...'} />
            <Loading isVisible={loadingSignUp} text={'Cerrando Session'} />
            <Loading isVisible={refresh} text={'Cargando'} />
            
            <ScrollView style={{ backgroundColor: '#1e1144f0', }}>

                <View style={{ borderTopStartRadius: 40, borderTopEndRadius: 40, backgroundColor: '#fff', marginTop: 60 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 30 }}>
                        <View style={{ display: 'flex', alignItems: 'center', paddingRight: 15 }} >
                            <Icon
                                type='font-awesome'
                                name="user"
                                size={50}
                                color="black"
                                style={{
                                    paddingRight: 5,
                                    paddingTop: 2,
                                }} />
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Profile</Text>
                            <Text>Manage your profile informations</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 40 }}>
                        <Avatar
                            size={220}
                            rounded
                            source={
                                photoURL ?
                                    { uri: photoURL } :
                                    { uri: 'https://anuario.misionesonline.net/wp-content/uploads/2018/01/300.png' }
                            }

                            title="Bj"
                            containerStyle={{
                                borderColor: '#fff',
                                borderStyle: 'solid',
                                borderWidth: 2,
                                backgroundColor: 'grey', shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,
                                elevation: 6,
                            }}
                        >
                            <Avatar.Accessory
                                onPress={ChangePhoto}
                                size={25}
                                style={{
                                    backgroundColor: '#fff',
                                    shadowOffset: {
                                        width: 0,
                                        height: 3,
                                    },
                                    shadowOpacity: 0.27,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                }}
                                color={'#000'}

                            />
                        </Avatar>

                    </View>
                    <View style={{ padding: 20 }} >
                        <View style={{ padding: 10, }}>
                            <Text style={{ color: '#878787d1', fontWeight: 'bold', fontSize: 16 }} >Name</Text>
                            <TextInput
                                style={{ backgroundColor: '#fff' }}
                                defaultValue={dataClients?.name}
                                underlineColor={'#d7d7d778'}
                                onChangeText={(value) => setFormrValue({ ...formrValue, name: value })}
                                right={
                                    <TextInput.Icon
                                        name={() =>
                                            <IconRef />
                                        }
                                    >

                                    </TextInput.Icon>

                                }
                            />
                        </View>
                        <View style={{ padding: 10, }}>
                            <Text style={{ color: '#878787d1', fontWeight: 'bold', fontSize: 16 }} >Last Name</Text>
                            <TextInput
                                onChangeText={(value) => setFormrValue({ ...formrValue, lastName: value })}
                                style={{ backgroundColor: '#fff', padding: 1 }}
                                defaultValue={dataClients?.LastName}
                                underlineColor={'#d7d7d778'}
                                right={
                                    <TextInput.Icon
                                        name={() =>
                                            <Icon
                                                containerStyle={
                                                    { display: activeInput ? 'flex' : 'none' }
                                                }
                                                type='ant-design'
                                                name={activeInput ? 'checkcircle' : 'closecircle'}
                                                color={activeInput ? 'green' : 'red'}
                                                onPress={activeInput && alertLastName}


                                            />
                                        }

                                    />

                                }
                            /*   right={
                                <TextInput.Icon
                                    name={() =>
                                        <Icon
                                            type='octicons'
                                            name="settings"
                                            size={20} />
                                    }
                                />
                            } */
                            />
                        </View>
                        <ConfigSetting />

                    </View>
                </View>
                <View style={{ borderTopStartRadius: 40, borderTopEndRadius: 40 }}>
                    <Button
                        title='Cerrar Session'
                        containerStyle={{

                        }}
                        buttonStyle={{
                            backgroundColor: '#1e1144f0', padding: 20
                        }}
                        onPress={exitUser}
                    />
                </View>

            </ScrollView>
        </Animatable.View>
    )
}

export default MyProfile
