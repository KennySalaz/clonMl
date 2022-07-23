import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
const VenderScreen = () => {
    const navigation = useNavigation();
    return (
        <Animatable.View  animation="bounceIn" duration={1500} direction='normal'
         style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#1e1144f0' }}>
            <Text style={{ color:'#fff' }}> Recuerda especificar bien tu productos </Text>
            <Button
                title='Continuar'
                containerStyle={{ margin: 20 }}
                onPress={() => navigation.navigate('VenderTitle') }

            />
        </Animatable.View>
    )
}

export default VenderScreen

const styles = StyleSheet.create({})
