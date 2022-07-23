import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StatusBar } from 'react-native'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Header from '../../Navegation/Header'


const Welcome = ({navigation}) => {
   
    return (
        <>
      
        <View style={styles.container}>
                <View style={styles.img}>
                    <Image
                        resizeMode='cover'
                        style={{ width: '100%', height: 200, }}
                        source={require('../../../assets/wl.jpg')} />
                </View>
                <Button
                    style={styles.button}
                    containerStyle={{
                        width: '100%',
                        position: 'absolute',
                        bottom: 100,
                        borderRadius: 20,
                        padding: 20,
                    }}
                    buttonStyle={{
                        backgroundColor: '#FDA223'
                    }}

                    onPress={() => navigation.navigate('MyProfile')} title='Perfil' />
            </View>
        </>
       
            
      
    )
}
export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    img: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
})
