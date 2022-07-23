import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
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


const EditAmount = ({ route }) => {
    const { price, id } = route.params
    const [formValue, setFormValue] = useState({
        amount: ''
    })
    const [loading, setLoading] = useState(false)
    const [errorAmount, setErrorAmount] = useState(null)
    const navigation = useNavigation();
    const validDataPrice = () => {
        setErrorAmount('')
        let isVaid = true
        if (isEmpty(formValue.amount)) {
            setErrorAmount('Debes Ingresar una cantidas')
            isVaid = false
        }
        return isVaid
    }
    const updateAmount = async () => {
        if (!validDataPrice()) {
            return
        }
        const docRef = doc(db, 'productos', id)
        setLoading(true)
        await updateDoc(docRef, {
            amount: formValue.amount
        })
        setLoading(false)
        navigation.goBack('EditConfig')
    }

    return (

        <Animatable.View
            animation="slideInLeft" duration={1700} direction='normal'
            style={{ flex: 1, backgroundColor: '#fff' }}>

            <Animatable.View animation="slideInDown" duration={2000} direction='normal' 
            style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}

                />
                <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}
                >¿Ingrese la cantidad?</Text>

            </Animatable.View>
            <Loading isVisible={loading} text={'Actualizando'} />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 50 , marginTop: 20,}}>


                <Input
                    containerStyle={{
                        alignItems: 'center',
                        
                    }}
                    inputContainerStyle={{
                        width: '40%'

                    }}
                    inputStyle={{
                        fontSize: 25,
                        fontWeight: 'bold',

                    }}
                    keyboardType='numeric'
                    errorMessage={errorAmount}
                    /* leftIcon={
                        <Icon
                            size={20}
                            name='attach-money'
                        />
                    } */


                    /*   defaultValue={amount} */
                    onChangeText={value => setFormValue({ ...formValue, amount: value })}

                />



            </View>

            <View style={{ flex: 7 }}>
                <Text style={{ textAlign: 'center' }}> Monto Maximo 250 </Text>
                <Animatable.View
                    animation="slideInUp" duration={2000} direction='alternate'
                >
                    <Button
                        title={'Guardar'}
                        buttonStyle={{
                            margin: 20,
                            backgroundColor: '#1e1144f0'
                        }}
                        onPress={updateAmount}
                    />
                </Animatable.View>

            </View>


        </Animatable.View>




    )
}

export default EditAmount

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
