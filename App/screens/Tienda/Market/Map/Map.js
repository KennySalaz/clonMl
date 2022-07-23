import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Modals from '../../../../Componentes/Modals'
import { getCurrentLocation } from '../../../../utils/helpers'


const Map = () => {
    const [mapModal, setMapModal] = useState(false)
    const [location, setLocation] = useState(false)


    const currentLocations =async () => {
        const response = await getCurrentLocation()

        if (response.status) {
            setLocation(response.location)
            console.log(response)
            console.log('HOLA')
        }

    }


    useEffect(() => {
        currentLocations()
    }, [])


    return (
        <>

            <View style={{
                padding: 20
            }}>
                <Button
                    onPress={() => setMapModal(true)}
                    containerStyle={{

                    }}
                    buttonStyle={{
                        backgroundColor: '#E8E7E7'
                    }}
                    title='Agregar Ubicacion'
                    titleStyle={{
                        color: '#000'
                    }}
                />
            </View>
            <Modals

                isVisible={mapModal} setisVisible={setMapModal} >

            </Modals>
        </>
    )
}

export default Map

const styles = StyleSheet.create({})
