import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import { Input } from 'react-native-elements/dist/input/Input'
import Modals from '../../../Componentes/Modals'

import { isEmpty, size } from 'lodash'
import { onChangePasswordFirebase, reautenticar } from '../../../utils/actions'
import { Alert } from 'react-native'
import Loading from '../../../Componentes/Loading'
import { TextInput } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
const ChangePassword = () => {

    const [formValue, setformValue] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''

    })


    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)


    const [shorModal, setShorModal] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)



    const validatePassword = () => {

        setErrorConfirmPassword('')
        setErrorCurrentPassword('')
        setErrorNewPassword('')
        let isValid = true

        if (isEmpty(formValue.currentPassword)) {
            setErrorCurrentPassword('Debes ingresar la conraseña actual')
        }

        if (size(formValue.newPassword) < 6) {
            setErrorNewPassword(' Debes ingresar una contraseña con mas de 6 caracteres ')
            isValid = false
        }

        if (size(formValue.confirmPassword) < 6) {
            setErrorConfirmPassword('Debes ingresar una contraseña con mas de 6 caracteres ')
            isValid = false
        }

        if (formValue.newPassword !== formValue.confirmPassword) {
            setErrorNewPassword('Las contraseñas no coninciden')
            setErrorConfirmPassword('Las contraseñas no coninciden')

            isValid = false
        }

        if (formValue.newPassword === formValue.currentPassword) {
            Alert('Ingresa una contraseña diferente a la actual')
            isValid = false
        }

        return isValid
    }



    const ChangePassword = async () => {

        if (!validatePassword()) {
            return
        }

        setLoading(true)




        const resultReautenticar = await reautenticar(formValue.currentPassword)
        if (!resultReautenticar.statusRespon) {
            setLoading(false)
            setErrorCurrentPassword('Contraseña Incorrecta')
            return
        }


        const resultonChangePasswordFirebase = await onChangePasswordFirebase(formValue.newPassword)
        setLoading(false)
        if (!resultonChangePasswordFirebase.statusRespon) {
            setLoading(false)
            Alert('No se a podido cambiar la contraseña')

            return

        }
    }
    return (
        <View style={{ backgroundColor: '#1e1144f0', flex: 1 }}>
            <View style={{ borderTopStartRadius: 40, borderTopEndRadius: 40, backgroundColor: '#fff', marginTop: 60, flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', padding: 30 }}>
                    <View style={{ display: 'flex', alignItems: 'center', paddingRight: 15 }} >
                        <Icon
                            type='font-awesome'
                            name="lock"
                            size={50}
                            color="black"
                            style={{
                                paddingRight: 5,
                                paddingTop: 2,
                            }} />
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Configuracion</Text>
                        <Text>Manage your profile informations</Text>
                    </View>
                </View>


                <Loading isVisible={loading} text={'Update...'} />
                <View style={{ padding: 15 }}>
                    <TextInput
                        style={{
                            backgroundColor: '#fff'
                        }}
                        placeholderTextColor='#E5E8E8'
                        label='Current Password'
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        right={
                            <TextInput.Icon
                                name={() =>
                                    <Icon
                                        containerStyle={{
                                            backgroundColor: '#fff'
                                        }}
                                        size={24}
                                        type='ant-design'
                                        name='eye'
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }

                            />

                        }
                        error={errorCurrentPassword}
                        onChangeText={(value) => setformValue({ ...formValue, currentPassword: value })}
                    />
                    <Animatable.Text animation="bounceIn" easing="ease-in-back" duration={1000} direction='normal'> {errorCurrentPassword} </Animatable.Text>
                    <TextInput
                        style={{ backgroundColor: '#fff' }}
                        placeholderTextColor='#E5E8E8'
                        label='New Password'
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        right={
                            <TextInput.Icon
                                name={() =>
                                    <Icon
                                        type='ant-design'
                                        size={24}
                                        name='eye'
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }
                            />
                        }

                        error={errorNewPassword}
                        onChangeText={(value) => setformValue({ ...formValue, newPassword: value })}
                    />
                    <Animatable.Text animation="bounceIn" easing="ease-in-back" duration={1000} direction='normal'>{errorNewPassword} </Animatable.Text>
                    <TextInput
                        style={{ backgroundColor: '#fff' }}
                        placeholderTextColor='#E5E8E8'
                        label='Confirm Password'
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        right={
                            <TextInput.Icon
                                name={() =>
                                    <Icon
                                        type='ant-design'
                                        size={24}
                                        name='eye'
                                        onPress={() => setShowPassword(!showPassword)}
                                    />
                                }
                            />
                        }

                        error={errorConfirmPassword}
                        onChangeText={(value) => setformValue({ ...formValue, confirmPassword: value })}
                    />
                      <Animatable.Text animation="bounceIn" easing="ease-in-back" duration={1000} direction='normal'>{errorConfirmPassword} </Animatable.Text>
                    <Button
                        containerStyle={{ marginTop: 20 }}
                        title={'Save'}
                        /*      onPress={() => setShorModal(true)} */
                        onPress={ChangePassword}
                        buttonStyle={{
                            padding: 20,
                            backgroundColor: '#1e1144f0',
                            justifyContent: 'space-between'
                        }}
                        icon={{
                            name: 'arrow-right',
                            type: 'font-awesome',
                            size: 20,
                            color: 'white',
                        }}
                        iconRight
                    />
                </View>



            </View>

        </View>

    )
}

export default ChangePassword

const styles = StyleSheet.create({


})

