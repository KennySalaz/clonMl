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


const EditPrice = ({ route }) => {
    const { price, id } = route.params
    const [formValue, setFormValue] = useState({
        price: ''
    })
    const [loading, setLoading] = useState(false)
    const [errorPrice, setErrorPrice] = useState(null)
    const navigation = useNavigation();
    const validDataPrice = () => {
        setErrorPrice('')
        let isVaid = true
        if (isEmpty(formValue.price)) {
            setErrorPrice('Debes Ingresar un monto')
            isVaid = false
        }
        return isVaid
    }
    const updatePrice = async () => {
        if (!validDataPrice()) {
            return
        }
        const docRef = doc(db, 'productos', id)
        setLoading(true)
        await updateDoc(docRef, {
            price: formValue.price
        })
        setLoading(false)
        navigation.goBack('EditConfig')
    }

    return (

        <Animatable.View
        animation="slideInLeft" duration={1700} direction='normal'
            style={{ flex: 1,  backgroundColor:'#fff'}}>
            <Animatable.View 
          animation="slideInDown" duration={2000} direction='normal' 
            style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                  <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}

                />
                <Text
                    style={{ fontSize: 18, fontWeight: '700', color:'#FFF' }}
                >¿Cual es el Precio?</Text>

            </Animatable.View>
            <Loading isVisible={loading} text={'Actualizando'} />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 50 }}>


                <Input
                    containerStyle={{
                        alignItems: 'center'
                    }}
                    inputContainerStyle={{
                        width: '40%'

                    }}
                    inputStyle={{
                        fontSize: 25,
                        fontWeight: 'bold',

                    }}
                    keyboardType='numeric'
                    errorMessage={errorPrice}
                    leftIcon={
                        <Icon
                            size={20}
                            name='attach-money'
                        />
                    }


                    defaultValue={price}
                    onChangeText={value => setFormValue({ ...formValue, price: value })}

                />



            </View>

            <Animatable.View 
            animation="slideInUp" duration={2000} direction='alternate'
            style={{ flex: 7 }}>
                <Text style={{ textAlign: 'center' }}> Ingresa el precio final, con IVA incluido </Text>
                <Button
                    title={'Guardar'}
                    buttonStyle={{
                        margin: 20,
                        backgroundColor:'#1e1144f0',
                    }}
                    onPress={updatePrice}
                />
            </Animatable.View>


        </Animatable.View>




    )
}

export default EditPrice

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
