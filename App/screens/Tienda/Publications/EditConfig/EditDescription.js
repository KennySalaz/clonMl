import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { isEmpty } from 'lodash'
import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import firebaseApp from '../../../../utils/firebase'
import { getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/core'
import Loading from '../../../../Componentes/Loading'
import { LinearGradient } from 'expo-linear-gradient'



const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const EditDescription = ({ route }) => {

    const { id, description } = route.params
    const [errorDescriptions, setErrorDescriptions] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formValue, setFormValue] = useState({
        description: ''
    })
    const navigation = useNavigation();

    const validDataDescripcion = () => {
        setErrorDescriptions('')
        let isValid = true

        if (isEmpty(formValue.description)) {
            setErrorDescriptions('Ingresa una descripcion')
            isValid = false

        }
        if (formValue.description === '') {
            setErrorDescriptions('Ingresa Una Descripcion Diferente')
            isValid = false
        }

        return isValid
    }


    const updateDescription = async () => {
        if (!validDataDescripcion()) {
            return
        }

        const refDescription = doc(db, 'productos', id)
        setLoading(true)
        await updateDoc(refDescription, {
            description: formValue.description
        })
        setLoading(false)
        navigation.goBack('EditConfig')

    }






    return (

        <Animatable.View
            animation="slideInLeft" duration={1700} direction='normal'
            style={{ flex: 1 , backgroundColor:'#fff' }}>
            <Animatable.View
                animation="slideInDown" duration={2000} direction='normal'
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>

                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}

                />
                <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#FFF' }}
                >Inidica la description de tu articulo</Text>

            </Animatable.View>
            <Loading isVisible={loading} text={'Actualizando.....'} />
            <View style={{ flex: 5 }}>

                <TextInput
                    onChangeText={value => setFormValue({ ...formValue, description: value })}
                    label="Description"
                    defaultValue={description}
                    style={{
                        width: '100%',
                        backgroundColor: '#fff',
                        height: 300,
                        textAlignVertical: 'top',
                        fontSize: 15
                    }}
                    activeUnderlineColor={errorDescriptions ? 'red' : '#000'}
                    multiline={true}
                    error={errorDescriptions}
                />

                <Animatable.View animation="bounceIn" direction="alternate" style={{
                    padding: 10
                }} >
                    <Text style={{ color: 'red' }}> {errorDescriptions && errorDescriptions} </Text>
                </Animatable.View>
                <Animatable.View
                    animation="slideInUp" duration={2000} direction='alternate'
                >
                    <Button
                        onPress={updateDescription}
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

export default EditDescription
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
