import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { Input } from 'react-native-elements/dist/input/Input'
import Modals from '../../../Componentes/Modals'
import Icon from 'react-native-vector-icons/FontAwesome';
import { validateEmail } from '../../../utils/helpers'
import { isEmpty } from 'lodash'
import { UsarContext } from '../../../ContextApi/UseContext'
import Loading from '../../../Componentes/Loading'
import { onChangeEmailFirebase, reautenticar } from '../../../utils/actions'
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/core'
import { Alert } from 'react-native'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import firebaseApp from '../../../utils/firebase'
import { getAuth } from 'firebase/auth'

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const ChangeEmail = () => {

    const [{ user }] = UsarContext()
    const [shorModal, setShorModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formValue, setFormValue] = useState({
        newEmail: user.email,
        password: null,
    })

    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [loading, setLoading] = useState(false)
    const [underlineColor, setUnderlineColor] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const validateDataEmail = () => {
        setErrorEmail('')
        let isValid = true

        if (!validateEmail(formValue.newEmail)) {
            setErrorEmail('Ingrese un correo valido')
            setUnderlineColor(false)
            isValid = false
        }
        if (formValue.newEmail === user.email) {
            setErrorEmail('Debes ingresar un email diferente ')
            isValid = false
        }
        return isValid
    }

    const onSubmitEmail = () => {
        if (!validateDataEmail()) { return }
        setShorModal(true)
    }


    const validateDataPassword = () => {
        setErrorPassword('')
        let isValid = true

        if (isEmpty(formValue.password)) {
            setErrorPassword('Ingrese una contraseña')
            isValid = false
        }
        return isValid
    }

    const onChangeEmail = async () => {
        if (!validateDataPassword()) { return }
        const ref = doc(db, "Clients", auth.currentUser.uid);
        setLoading(true)

        const resultReautenticar = await reautenticar(formValue.password)
        if (!resultReautenticar.statusRespon) {
            setLoading(false)
            setErrorPassword('Contraseña Incorrecta')
            return
        }

        const resultOnChangeEmailFirebase = await onChangeEmailFirebase(formValue.newEmail)

        await updateDoc(ref, {
            email: formValue.newEmail
          });

        setLoading(false)

        if (!resultOnChangeEmailFirebase.statusRespon) {
            setErrorPassword('este correo esta en uso')
            return
        }
        setShorModal(false)
    }

    useEffect(() => {
        if (isEmpty(formValue.newEmail) && formValue.newEmail === '' && user.email !== '') {
            setUnderlineColor(false)
        } else {
            setUnderlineColor(true)
        }
    }, [formValue.newEmail])

 

    return (
        <View>
            <Loading isVisible={loading} text={'Espere...'} />

            {/*    <Input
                placeholderTextColor='#f50'
                label='Change Email'
                keyboardType='email-address'
                placeholder="Example@email.com"
                rightIcon={{ type: 'Fontisto', name: 'email' }}
                onChangeText={(value) => setFormValue({ ...formValue, newEmail: value })}
                defaultValue={user.email}
                errorMessage={errorEmail}
            />
            */}

            <View style={{
                padding: 10, borderStyle: 'solid', borderColor: underlineColor ? '#1e1144f0' : 'red', borderWidth: 1, shadowOpacity: 10,
                shadowRadius: 0,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowColor: '#000000',
                elevation: 1,
            }}>
                <Text style={{ color: '#878787d1', fontWeight: 'bold', fontSize: 16 }} >Email</Text>
                <TextInput
                    style={{ backgroundColor: '#fff', margin: 5 }}
                    defaultValue={user.email}
                    onChangeText={(value) => setFormValue({ ...formValue, newEmail: value })}
                    underlineColor={'#fff'}
                    keyboardType='email-address'
                    placeholder="Example@email.com"
                    error={errorEmail}

                    underlineColor={'#d7d7d778'}
                />

                <Animatable.Text animation="bounceInRight" duration={1000} direction='normal' style={{ marginBottom: 5, color: 'red' }}> {errorEmail}</Animatable.Text>
                <Button
                    onPress={onSubmitEmail}
                    title='Cambiar Email'
                    buttonStyle={{
                        backgroundColor: '#1e1144f0'
                    }}
                />
            </View>
            <Modals isVisible={shorModal} setisVisible={setShorModal} >

                <View style={{ width: 300, }}>
                    <Card.Title>
                        <Text>
                            Password Confirmation
                        </Text>
                    </Card.Title>

                    <Input
                        label='Enter Password'
                        placeholder={'Password'}
                        secureTextEntry={!showPassword}
                        rightIcon={
                            <Icon
                                size={24}
                                name='eye'
                                onPress={() => setShowPassword(!showPassword)}
                            />

                        }
                        onChangeText={(value) => setFormValue({ ...formValue, password: value })}
                        errorMessage={errorPassword}
                        password={true}
                    />
                    <Button
                        title={'Confirm'}
                        onPress={onChangeEmail}
                        buttonStyle={{
                            backgroundColor: '#1e1144f0'
                        }}
                    />
                </View>
            </Modals>
        </View>
    )
}


export default ChangeEmail
const styles = StyleSheet.create({
    card: {
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: {
            width: -4,
            height: -4,
        },
        shadowColor: '#000',
        elevation: 5,
        borderRadius: 10,
    }
})
