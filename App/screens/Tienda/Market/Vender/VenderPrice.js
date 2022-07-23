import React, { useEffect, useState } from 'react'
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



const VenderPrice = ({ route }) => {
    const { title, category, state, descriptions, imageContext } = route.params
    const navigation = useNavigation();

    const [price, setPrice] = useState('')
    useEffect(() => {
        console.log(title, category, state, descriptions,imageContext)

    }, [])

    const [disableState, setDisableState] = useState(true)
    useEffect(() => {

        if (price !== '') {
            setDisableState(false)
        } else {
            setDisableState(true)
        }
    }, [price])
    return (
        <Animatable.View
            animation="fadeInRight" duration={1500} direction='normal'
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
                    style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}
                >Cueal es el precio ?</Text>

            </Animatable.View>
            <View style={{ flex: 5, }}>
                <Animatable.View animation="slideInUp" duration={2000} direction='alternate' style={{ marginTop: 70, flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, }} > U$S </Text>
                    </View>
                    <TextInput

                        onChangeText={value => setPrice(value)}
                        keyboardType='numeric'
                        style={{
                            backgroundColor: '#fff',
                            width: 100,
                            fontSize: 25
                        }}
                    />
                </Animatable.View>
                <View style={{ alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 12 }}> Ingresa el precio final, con IVA incluido </Text>
                </View>
            </View>
            <Button
                disabled={disableState}
                onPress={() => navigation.navigate('VenderPublic', { title, category, state, descriptions, price, imageContext})}
                titleStyle={{ fontSize: 20, letterSpacing: 2 }}
                title={'Continuar'}
                buttonStyle={{
                    margin: 20,
                    backgroundColor: '#1e1144f0',

                }}
            />
        </Animatable.View>
    )
}

export default VenderPrice


const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
