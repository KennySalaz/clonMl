import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, Alert, StyleSheet, Text,ScrollView , TouchableOpacity } from 'react-native'
import { Button, Input, Avatar, Card } from 'react-native-elements'
import { getAuth, signOut } from '@firebase/auth'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { Icon } from 'react-native-elements';
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


const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

const MyAccount = () => {
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
    const [updateComponent, setUpdateComponent] = useState(false)

    /*     const [formLasName, setFormLasName] = useState(LastName) */

    const [errorLastNameClients, setErrorLastNameClients] = useState(null)
    const [errorNameClients, setErrorNameClients] = useState(null)



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

        const refClients = doc(db, 'Clients', auth.currentUser.uid)
        await getDoc(refClients).then(doc => {
            setDataClients(doc.data())

        })
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

    const animateRef = useRef()

    /*  useEffect(() => {
       
 
     }, []) */

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
        <ScrollView>
           <View style={styles.container}>
            <Loading isVisible={loading} text={'Espere...'} />
            <Loading isVisible={loadingSignUp} text={'Cerrando Session'} />

            <View style={styles.avatarContainer}>
                <Avatar
                    containerStyle={{ width: 150, height: 150, }}
                    avatarStyle={{
                        borderRadius: 100,
                        width: 150,
                        height: 150,
                    }}
                    onPress={ChangePhoto}
                    rounded
                    source={
                        photoURL ?
                            { uri: photoURL } :
                            { uri: 'https://anuario.misionesonline.net/wp-content/uploads/2018/01/300.png' }
                    }
                />
            </View>

            <View style={{ alignItems: 'center', marginTop: -10 }}>

                <Text> Name </Text>
                <Text> {user.email} </Text>
            </View>

            <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: 'bold' }} >Mis Datos</Text>
            <Card containerStyle={[styles.shadow,]} >
                <View style={styles.viewContainer}>
                    <Input
                        label={'Name'}
                        defaultValue={dataClients?.name}
                        rightIcon={
                            {
                                Component: IconRef
                            }

                        }

                        /* rightIcon={{
                            containerStyle: {
                                display: activeInputName ? 'flex' : 'none'
                            },
                            type: 'ant-design',
                            name: activeInputName ? 'checkcircle' : 'closecircle',
                            color: activeInputName ? 'green' : 'red',
                            onPress: activeInputName && alertName
                        }} */
                        onChangeText={(value) => setFormrValue({ ...formrValue, name: value })}
                    />
                    {/*   <Text> {errorNameClients} </Text> */}
                    <Input
                        label={'Last Name'}
                        defaultValue={dataClients?.LastName}

                        rightIcon={{
                            containerStyle: {
                                display: activeInput ? 'flex' : 'none'
                            },
                            type: 'ant-design',
                            name: activeInput ? 'checkcircle' : 'closecircle',
                            color: activeInput ? 'green' : 'red',
                            onPress: activeInput && alertLastName
                        }}
                        onChangeText={(value) => setFormrValue({ ...formrValue, lastName: value })}
                    />
                    {/*  <Text style={{ color: 'red' }} > {errorLastNameClients} </Text>
 */}

                </View>
            </Card>

            <Text style={{ marginLeft: 15, paddingTop: 10, fontSize: 18, fontWeight: 'bold' }} >Ajustes</Text>
            <Card
                containerStyle={[styles.shadow, {}]}
            >
                <TouchableOpacity onPress={() => navigate.navigate('ConfigSetting')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10, paddingBottom: 20, paddingTop: 18, }} >

                        <Icon
                            type='octicons'
                            name="settings"
                            size={20}
                            color="black"
                            style={{
                                paddingRight: 5,
                                paddingTop: 2,
                            }} />

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: '#000',
                            paddingLeft: 20,
                        }}>
                            Configuracion
                        </Text>
                    </View>
                </TouchableOpacity>
                <Card.Divider />
                <TouchableOpacity onPress={() => navigate.navigate('ChangePassword')}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10, }} >

                        <Icon
                            type='octicons'
                            name="sync"
                            size={20}
                            color="black"
                            style={{
                                paddingRight: 5,
                                paddingTop: 2,
                            }} />

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: '#000',
                            paddingLeft: 20,
                        }}>
                            Cambiar Contraseña
                        </Text>
                    </View>
                </TouchableOpacity>
            </Card>
            <Card
                containerStyle={[styles.shadow, {marginBottom:20}]}
            >
                <TouchableOpacity onPress={exitUser}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 10,  }} >
                        <Icon
                            type='font-awesome'
                            name="sign-out"
                            size={20}
                            color="black"
                            style={{
                                paddingRight: 5,
                                paddingTop: 2,
                            }} />

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: '#000',
                            paddingLeft: 20,
                        }}> Cerrar Session </Text>
                    </View>
                </TouchableOpacity>
            </Card>
        </View> 
        </ScrollView>
        
    )
}

export default MyAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#FDF5EC'
    },

    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -10,

        /*    shadowOpacity: 10,
           shadowRadius: 0,
           shadowOffset: {
               width: -3,
               height: -5,
           },
           shadowColor: '#000000',
           elevation: 3, */
    },
    viewContainer: {


        /*    backgroundColor:'#FF9F3F', */


    },

    shadow: {
        shadowOpacity: 10,
        shadowRadius: 0,
        shadowOffset: {
            width: -3,
            height: -5,
        },
        shadowColor: '#000000',
        elevation: 3,
        borderRadius: 8,
    }

})
