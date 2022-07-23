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

const VenderPublicEnd = () => {
    const navigation = useNavigation();
  
    return (

        <Animatable.View
            animation="fadeIn" duration={1500} direction='normal'
            style={{ flex: 1, backgroundColor: '#fff' }}>
            <View animation="slideInDown" duration={2000} direction='normal'
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <LinearGradient
                    start={{ x: 1, y: 0 }} end={{ x: 1, y: 1.0 }}
                    locations={[0.80, 0.80, 0.82]}
                    colors={['#1e1144f0', '#1e1144f0', 'transparent']}
                    style={styles.background}

                />
                <Text
                    style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}
                >Ya Terminaste tu publicacion </Text>

            </View>
            <View style={{ flex: 5, justifyContent:'center', alignItems:'center' }}>
             <Button
             title='Ver Publicacion'
             onPress={ () => navigation.navigate('Publications')  }
             />

            </View>

        </Animatable.View>

    )
}

export default VenderPublicEnd


const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
