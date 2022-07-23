import React, { useEffect, useState } from 'react'
import { Divider, TextInput } from 'react-native-paper'
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



const VenderState = ({route}) => {
    const { title, category } = route.params

    const navigation = useNavigation();

    useEffect(() => {

        console.log( title , category)
        
    }, [])
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
                >Tu producto es...</Text>

            </Animatable.View>
            <View style={{ flex: 5 }}>



                <Animatable.View animation="slideInUp" duration={2000} direction='alternate'>
                    <Button

                        onPress={() => navigation.navigate('VenderPhotoMessage', {title, category, state : 'Nuevo'})}
                        titleStyle={{ fontSize: 20, letterSpacing: 2, color: '#000' }}
                        title={'Nuevo'}
                        buttonStyle={{
                            backgroundColor: '#fff',
                        }}
                    />
                    <Divider style={{ height: 2 }} />
                    <Button
                        onPress={() => navigation.navigate('VenderPhotoMessage',  {title, category, state : 'Usado'})}
                        titleStyle={{ fontSize: 20, letterSpacing: 2, color: '#000' }}
                        title={'Usado'}
                        buttonStyle={{
                            backgroundColor: '#fff',
                        }}
                    />
                    <Divider style={{ height: 2 }} />
                </Animatable.View>

            </View>

        </Animatable.View>
    )
}

export default VenderState

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})

