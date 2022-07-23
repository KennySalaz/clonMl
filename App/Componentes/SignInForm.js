import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, Image, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/core";
import firebaseApp from '../utils/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { UsarContext } from '../ContextApi/UseContext';
import { actionTypes } from '../ContextApi/reducer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from 'react-native-elements';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import Loading from './Loading';
import { isLogin } from '../utils/actions';
import { isEmpty } from 'lodash';
import { validateEmail } from '../utils/helpers';

const auth = getAuth(firebaseApp)

const SigninForm = () => {

    const [{ user }, dispatch] = UsarContext()
    const navigation = useNavigation();
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [formValue, setformValue] = useState({
        email: '',
        password: '',
    })

    const validateD = () => {
        setErrorEmail('')
        setErrorPassword('')
        let isValid = true

        if (!validateEmail(formValue.email)) {
            setErrorEmail('Ingrese un email valido')
            isValid = false
        }
        if (isEmpty(formValue.password)) {
            setErrorPassword('Ingrese una contraseña')
            isValid = false
        }
        return isValid
    }

    const signInFirebase = async () => {
        if (!validateD()) {
            return
        }
        setLoading(true)
        const result = await isLogin(formValue.email, formValue.password)
        setLoading(false)

        if (!result.statusResponse) {
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }

        navigation.navigate('MyDrawer')
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: '#fff' }}
        >
            <Loading isVisible={loading} />
            <ImageBackground
                source={{ uri: 'https://lh5.googleusercontent.com/proxy/G4tIhtRVUGFT1D_N-7aCqZ-JarNs-rgXHZs6HURdSrej4fZHwYjNIMtQ8kjQeuftqZfI1YOehctD3scxorsbOgs967I3R0XZVwpKltnouZs2j5rb4cs5NFAt7qNhwVX7BOnSyt99dxHy9wm-ixgxZTvDdSFpnhfbkw=s0-d' }}
                /*   source={require('../../assets/descarga.jpg')} */
                style={{
                    height: Dimensions.get('window').height / 2.7,
                }}
            >

            </ImageBackground>

            <View style={styles.bottoView}>
                <View style={{ padding: 30 }}>
                    <Text style={{ color: '#1e1144f0', fontSize: 34 }}>
                        Welcome
                    </Text>
                    <Text>
                        Don't hace an account?
                        <Text style={{ color: '#1e1144f0' }} onPress={() => navigation.navigate('SignUp')}> RegisterNow </Text>
                    </Text>
                </View>
                <View style={{ paddingLeft: 25, paddingRight: 25 }}>

                    <Input
                        placeholderTextColor='#1e1144f0'
                        label='Email'
                        keyboardType='email-address'
                        placeholder="Example@email.com"
                        rightIcon={{ type: 'Fontisto', name: 'email' }}
                        onChangeText={(value) => setformValue({ ...formValue, email: value })}
                        errorMessage={errorEmail}
                        defaultValue={formValue.email}
                        
                    />
                    <Input
                        label='Password'
                        placeholder="Password"
                        placeholderTextColor='#1e1144f0'
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <Icon
                                size={24}
                                name='eye'
                                onPress={() => setShowPassword(!showPassword)}
                            />}
                        onChangeText={(value) => setformValue({ ...formValue, password: value })}
                        errorMessage={errorPassword}
                        defaultValue={formValue.password}
                    />
                </View>
                <View style={styles.formwarVal}>
                    <View style={{ marginRight: 30, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}
                        />
                        <Text  >
                            Remember Me
                        </Text>
                    </View>
                    <View style={{ marginRight: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }} >
                        <Text >
                            Forgot Password
                        </Text>
                    </View>
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
                     buttonStyle={{ backgroundColor:'#1e1144f0' }}
                        title='Login'
                        onPress={signInFirebase}
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