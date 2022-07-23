import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable';
import { loadImageGallery } from '../../../../utils/helpers'
import { Alert } from 'react-native'
import Loading from '../../../../Componentes/Loading'

const VenderPhotoMessage = ({ route }) => {
    const navigation = useNavigation();
    const { title, category, state } = route.params
    const [imageSelect, setImageSelect] = useState([])
    const [loadings, setLoadings] = useState(null)



    const imageOnPress = async () => {
        const result = await loadImageGallery([1, 1])
      
        if (!result.status) {
            Alert('Error al subir las imagenes')
            return
        }
        setImageSelect([...imageSelect, result.image])
       
        navigation.navigate('VenderAddPhoto', { title, category, state, imageSelect })
        /*    RefImage.current.zoomIn() */
    

    }
    useEffect(() => {
        console.log(title, category, state, imageSelect)
    }, [])
    return (
        <Animatable.View 
        animation="zoomIn" duration={1500} direction='normal'
        style={{ flex: 1, backgroundColor: '#1e1144f0', justifyContent: 'center', alignItems: 'center' }}>
           
            <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
                <MaterialIcons

                    name='add-a-photo'
                    size={150}
                    color={'#fff'}
                    style={{ marginRight: 10 }}
                />
            </Animatable.View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff' }} >
                    Sube buenas fotos de tu producto
                </Text>
                <Text style={{ color: '#fff', textAlign: 'center', paddingTop: 10 }} >
                    Asegurate de que tu primera foto tenga fondo {"\n"}  blanco puro creado por un editor de fotos
                </Text>
            </View>

            <View style={{ marginTop: 20, }}>
                <Button
                    onPress={() => navigation.navigate('VenderAddPhoto', { title, category, state, imageSelect })}
                    buttonStyle={{
                        width: '100%',
                        backgroundColor: '#fff'
                    }}
                    title={'Agregar Fotos'}
                    titleStyle={{
                        color: '#1e1144f0',
                        fontSize: 13
                    }}
                />
            </View>


        </Animatable.View>
    )
}

export default VenderPhotoMessage

const styles = StyleSheet.create({})
