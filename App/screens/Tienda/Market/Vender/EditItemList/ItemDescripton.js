import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'


const ItemDescripton = ({ route }) => {
    const { descriptions  } = route.params
    const navigation = useNavigation();
   const [editsetDescriptions, setEditsetDescriptions] = useState('')

 
 
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
                >Describe tu producto</Text>

            </Animatable.View>
            <View style={{ flex: 5, }}>



                <Animatable.View animation="slideInUp" duration={2000} direction='alternate'>
                    <TextInput
                        style={{
                            backgroundColor: '#fff',
                            height: 100,

                        }}
                        placeholder='Ej... Celular nuevo 128gbRom 6gbRam'
                        defaultValue={descriptions}
                     
                        multiline
                        onChangeText={text => setEditsetDescriptions(text)}
                    />
                </Animatable.View>

            </View>

            <Button
                onPress={() => navigation.navigate('VenderPublic', { editsetDescriptions })}

                titleStyle={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 2 }}
                title={'Continuar'}
                buttonStyle={{
                    margin: 20,
                    backgroundColor: '#1e1144f0',

                }}
            />
        </Animatable.View>
    )
}

export default ItemDescripton


const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})


