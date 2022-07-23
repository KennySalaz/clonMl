import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { UsarContext } from '../ContextApi/UseContext';
import { actionTypes } from '../ContextApi/reducer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from 'react-native-elements';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { getFirestore, collection, addDoc, doc, setDoc, } from 'firebase/firestore'
import firebaseApp from '../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import Loading from './Loading';
import { validateEmail } from '../utils/helpers';
import { isEmpty, size } from 'lodash';
import { firebaseStorage, userRegister } from '../utils/actions';

const SigninForm = () => {

    const auth = getAuth(firebaseApp)
    const db = getFirestore(firebaseApp)
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navegation = useNavigation()
    const [{ user }, dispatch] = UsarContext()
    const [loading, setLoading] = useState(false)

    //Vaidaciones
    const [errorName, setErrorName] = useState('')
    const [erroremail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')
    const [errorLastname, setErrorLastname] = useState('')

    const [formValue, setformValue] = useState({
        name: '',
        LastName: '',
        email: '',
        password: '',
        confirmPassword: '',

    })

    const navigation = useNavigation();


    const userFirestore = async () => {
        try {
            const userId = auth.currentUser
            await setDoc(doc(db, 'Clients', userId.uid), {
                name: formValue.name,
                LastName: formValue.LastName,
                email: formValue.email,
                password: formValue.password,
                img: auth.currentUser.photoURL,
                phone: '',
            })
        } catch (e) {
            console.error('error al registrar el personal', e)
        }
    }
    const signUp = async () => {
        if (!validateData()) {
            return
        }
        setLoading(true)
        const result = await userRegister(formValue.email, formValue.password)
        userFirestore()
        setLoading(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
            return

        }
        navigation.navigate('Tienda')
    }

    const validateData = () => {
        setErrorName('')
        setErrorEmail('')
        setErrorPassword('')
        setErrorConfirm('')
        setErrorLastname('')
        let isValid = true

        if (formValue.name === '') {
            setErrorName('Debes ingresar una nombre')
            isValid = false
        }

        if (formValue.LastName === '') {
            setErrorLastname('Debes ingresar una lastname')
            isValid = false
        }

        if (!validateEmail(formValue.email)) {
            setErrorEmail('Debes ingresar un email valido')
            isValid = false
        }
        if (size(formValue.password) < 6) {
            setErrorPassword('Debes ingresar una contraseña con mas de 6 caracteres')
            isValid = false
        }

        if (formValue.password !== formValue.confirmPassword) {
            setErrorPassword('Las contraseñas no coinciden')
            setErrorConfirm('Las contraseñas no coinciden')
            isValid = false
        }
        return isValid
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#fff' }}
        >
            <Loading isVisible={loading} text={'Registrando'} />
            <ImageBackground
                source={{
                    uri:
                        'https://lh5.googleusercontent.com/proxy/G4tIhtRVUGFT1D_N-7aCqZ-JarNs-rgXHZs6HURdSrej4fZHwYjNIMtQ8kjQeuftqZfI1YOehctD3scxorsbOgs967I3R0XZVwpKltnouZs2j5rb4cs5NFAt7qNhwVX7BOnSyt99dxHy9wm-ixgxZTvDdSFpnhfbkw=s0-d'
                }}
                /*   source={require('../../assets/descarga.jpg')} */
                style={{

                    height: Dimensions.get('window').height / 2.9,
                }}
            >
            </ImageBackground>

            <View style={styles.bottoView}>
                <View style={{ padding: 30 }}>
                    <Text style={{ color: '#f50', fontSize: 34 }}>
                        Welcome
                    </Text>
                    <Text>

                        already have an  account?

                        <Text style={{ color: '#f50' }} onPress={() => navigation.navigate('Signin')}> Sign In </Text>
                    </Text>
                </View>
                <View style={{ paddingLeft: 25, paddingRight: 25 }}>

                    <Input

                        placeholderTextColor='#f50'
                        label='Name'
                        rightIcon={{ type: 'font-awesome', name: 'user-circle' }}
                        onChangeText={(value) => setformValue({ ...formValue, name: value })}
                        errorMessage={errorName}
                        defaultValue={formValue.name}
                    />

                    <Input
                        placeholderTextColor='#f50'
                        label='Last Name'
                        rightIcon={{ type: 'font-awesome', name: 'user-circle' }}
                        onChangeText={(value) => setformValue({ ...formValue, LastName: value })}
                        errorMessage={errorLastname}
                        defaultValue={formValue.LastName}
                    />
                    <Input
                        label='Email'
                       
                        rightIcon={{ type: 'Fontisto', name: 'email' }}
                        onChangeText={(value) => setformValue({ ...formValue, email: value })}
                        errorMessage={erroremail}
                        defaultValue={formValue.email}
                    />
                    <Input
                        errorMessage={errorPassword}
                        defaultValue={formValue.password}
                        label='Password'
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <Icon
                                size={24}
                                name='eye'
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                        onChangeText={(value) => setformValue({ ...formValue, password: value })}

                    />
                    <Input
                        label='Confirm Password'
                        errorMessage={errorConfirm}
                        defaultValue={formValue.confirmPassword}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <Icon
                                size={24}
                                name='eye'
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }

                        onChangeText={(value) => setformValue({ ...formValue, confirmPassword: value })}

                    />

                </View>

                <View
                    style={{
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Button
                        containerStyle={{
                            width: Dimensions.get('window').width / 1.2,
                            /*  justifyContent: 'center',
                             alignItems: 'center', */
                        }}
                        title='Login'
                        onPress={signUp}

                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'center', marginTop: -20, paddingBottom: 10 }}>
                        or Login With
                    </Text>
                    <View style={styles.socialRedes}>
                        <Button
                            containerStyle={{ width: '30%', }}
                            icon={
                                <Icon
                                    name="facebook-square"
                                    size={25}
                                    color="white"
                                />
                            } />
                        <Button
                            containerStyle={{ width: '30%' }}
                            buttonStyle={{ backgroundColor: '#db4a39' }}
                            icon={
                                <Icon
                                    name="google"
                                    size={26}
                                    color="white" />
                            } />
                    </View>
                </View>
            </View>

        </ScrollView>


    )
}
const styles = StyleSheet.create({
    formContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    btnContainerStyle: {
        marginTop: 20,
        width: "95%",
        //alignItems: "center"
    },
    btnRegister: {
        backgroundColor: "#00a680"
    },

    bottoView: {
        flex: 1.5,
        backgroundColor: '#fff',
        bottom: 50,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
    },
    formwarVal: {
        height: 40,
        marginTop: -20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    socialRedes: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
    },
})

export default SigninForm