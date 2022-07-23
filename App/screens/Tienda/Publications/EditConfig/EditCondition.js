import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View, Picker } from 'react-native'
import { Card } from 'react-native-elements'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { Input } from 'react-native-elements'
import { doc, updateDoc, collection, getFirestore } from 'firebase/firestore'
import firebaseApp from '../../../../utils/firebase'
import { getAuth } from 'firebase/auth'
import Loading from '../../../../Componentes/Loading'
import { isEmpty } from 'lodash'
import { Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)


const EditCondition = ({ route }) => {
    const { estado, id } = route.params
    const [formValue, setFormValue] = useState({
        state: ''
    })
    const [loading, setLoading] = useState(false)
    const [errorState, setErrorState] = useState(null)
    const [errorAnimatedEstado, seterrorAnimatedEstado] = useState(false)
    const navigation = useNavigation();


    const validDataAmount = () => {
        setErrorState('')
        let isVaid = true
        if (formValue.state === 'Estado') {
            setErrorState('Debes Ingresar el estado de tu producto')
            seterrorAnimatedEstado(true)
            isVaid = false
        } else {
            seterrorAnimatedEstado(false)
        }
        return isVaid
    }


    const updateAmount = async () => {
        if (!validDataAmount()) {
            return
        }
        const docRef = doc(db, 'productos', id)
        setLoading(true)
        await updateDoc(docRef, {
            estado: formValue.state
        })
        setLoading(false)
        navigation.goBack('EditConfig')
    }

    const animateRef = useRef()

    useEffect(() => {


        if (errorAnimatedEstado) {
            animateRef.current.shake()
        } else {
            animateRef.current.fadeOut()
        }

        if (formValue.state !== 'Estado') {
            setErrorState(null)
            seterrorAnimatedEstado(false)

        }
    }, [errorAnimatedEstado, formValue.state])

    return (

        <Animatable.View
            animation="slideInLeft" duration={1700} direction='normal'
            style={{ flex: 1 }}>
            <Animatable.View
                animation="slideInDown" duration={2000} direction='normal'
                style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}

                />
                <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#FFF' }}
                >¿Cual es el Estado?</Text>

            </Animatable.View>
            <Loading isVisible={loading} text={'Actualizando'} />

            <View style={{ justifyContent: 'center', padding: 20 }}>


                <View style={{ paddingLeft: 5 }}>
                    <Picker
                        selectedValue={formValue.state}
                        style={{ height: 50, }}
                        onValueChange={(itemValue, itemIndex) => setFormValue({ ...formValue, state: itemValue })}
                    >
                        <Picker.Item label="Estado" value="Estado" color='#000' />
                        <Picker.Item label="New" value='New' />
                        <Picker.Item label="Used" value='Used' />
                    </Picker>

                </View>
                <View style={[errorAnimatedEstado === false && { display: 'none' }]} >
                    <Animatable.Text
                        style={{ color: 'red', }}
                        ref={animateRef}
                    >
                        {errorState}
                    </Animatable.Text>

                </View>
            </View>

            <Animatable.View
                animation="slideInUp" duration={2000} direction='alternate'
                style={{ flex: 7 }}>

                <Button
                    title={'Guardar'}
                    buttonStyle={{
                        margin: 20,
                        backgroundColor: '#1e1144f0'
                    }}
                    onPress={updateAmount}
                />
            </Animatable.View>


        </Animatable.View>




    )
}

export default EditCondition
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
