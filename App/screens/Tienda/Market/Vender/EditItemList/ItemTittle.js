import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import { LinearGradient } from 'expo-linear-gradient'




const ItemTittle = ({route}) => {


    const {title} = route.params
    const navigation = useNavigation();
    const [EditTitle, setEditTitle] = useState('')

    const [disableState, setDisableState] = useState(true)
    const nav = () => {
        navigation.navigate('VenderPublic', { EditTitle })
        setEditTitle('')
    }
    useEffect(() => {

        if (EditTitle !== '') {
            setDisableState(false)
        } else {
            setDisableState(true)
        }
    }, [EditTitle])

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
                    style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}
                >Inidica tu producto , marca o modelo</Text>

            </Animatable.View>
            <View style={{ flex: 5 }}>
                <TextInput
                    /*   label="Titulo" */
                    style={{
                        backgroundColor: '#fff',

                    }}
                    placeholder='Ej... Celular nuevo 128gbRom 6gbRam'
                    onChangeText={text => setEditTitle(text)}
                    defaultValue={title}
                />
                <Animatable.View animation="bounceIn" direction="alternate" style={{
                    padding: 10
                }} >

                </Animatable.View>

                <Animatable.View animation="slideInUp" duration={2000} direction='alternate'>
                    <Button
                        onPress={nav}
                        disabled={disableState}
                        titleStyle={{ fontSize: 20, fontWeight: 'bold', letterSpacing: 2 }}
                        title={'Continuar'}
                        buttonStyle={{
                            margin: 20,
                            backgroundColor: '#1e1144f0',

                        }}
                    />
                </Animatable.View>

            </View>

        </Animatable.View>

    )
}

export default ItemTittle


const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,

    },

})
