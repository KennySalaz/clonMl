import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { doc, getFirestore, updateDoc, collection } from "firebase/firestore";
import firebaseApp from '../../../../utils/firebase'
import { getAuth } from 'firebase/auth'
import Loading from '../../../../Componentes/Loading'
import { isEmpty } from 'lodash'
import { Input } from 'react-native-elements/dist/input/Input'
import { LinearGradient } from 'expo-linear-gradient'


const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const EditTitle = ({ route }) => {

    const navigation = useNavigation();
    const { id, title } = route.params
    const [formValue, setFormValue] = useState({
        title: ''
    })

    const [errorTitle, setErrorTitle] = useState(null)
    const [loading, setLoading] = useState(false)

    const validDataTittle = () => {
        setErrorTitle('')
        let isValid = true
        if (formValue.title === '') {
            setErrorTitle('Ingresa un nuevo titulo')
            isValid = false
        }
        return isValid
    }
    const updateTitle = async () => {
        if (!validDataTittle()) {
            return
        }
        const docRefProductClients = doc(db, 'productos', id)
        setLoading(true)
        await updateDoc(docRefProductClients, {
            title: formValue.title
        });
        setLoading(false)
        navigation.goBack('EditConfig')

    }
    return (
        <Animatable.View
            animation="slideInLeft" duration={1500} direction='normal'
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <Animatable.View animation="slideInDown" duration={2000} direction='normal'
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}

                />
                <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}
                >Inidica tu producto , marca o modelo</Text>
            </Animatable.View>
            <Loading isVisible={loading} text={'Actualizando'} />
            <View style={{ flex: 5 }}>
                <TextInput
                    onChangeText={value => setFormValue({ ...formValue, title: value })}
                    label="Titulo"
                    defaultValue={title}
                    style={{
                        backgroundColor: '#fff',
                        padding: 10
                    }}
                    activeUnderlineColor={errorTitle ? 'red' : '#000'}
                />
                <Animatable.View animation="bounceIn" direction="alternate" style={{
                    padding: 10
                }} >
                    <Text style={{ color: 'red' }}> {errorTitle && errorTitle} </Text>
                </Animatable.View>
                {/*  <Input
                  onChangeText={value => setFormValue({ ...formValue, title: value })}
                  label="Titulo"
                  defaultValue={name}
                  style={{
                      backgroundColor: '#fff',
                      padding: 20
                  }}
                errorMessage={errorTitle}
                /> */}
                <Animatable.View animation="slideInUp" duration={2000} direction='alternate'>
                    <Button
                        onPress={updateTitle}
                        title={'Guardar'}
                        buttonStyle={{
                            margin: 20,
                            backgroundColor: '#1e1144f0'
                        }}
                    />
                </Animatable.View>
            </View>
        </Animatable.View>
    )
}
export default EditTitle
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})