import React, { useEffect, useState } from 'react'
import { Divider, TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/core';



const ItemState = () => {
   

    const navigation = useNavigation();

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
                    style={{ fontSize: 20, fontWeight: '700', color: '#fff' }}
                >Tu producto es...</Text>

            </Animatable.View>
            <View style={{ flex: 5 }}>



                <Animatable.View animation="slideInUp" duration={2000} direction='alternate'>
                    <Button

                        onPress={() => navigation.navigate('VenderPublic', { stateEdit : 'Nuevo'})}
                        titleStyle={{ fontSize: 20, letterSpacing: 2, color: '#000' }}
                        title={'Nuevo'}
                        buttonStyle={{
                            backgroundColor: '#fff',
                        }}
                    />
                    <Divider style={{ height: 2 }} />
                    <Button
                        onPress={() => navigation.navigate('VenderPublic',  {stateEdit : 'Usado'})}
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

export default ItemState

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})

