import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements/dist/overlay/Overlay'
import { style } from 'styled-system'

const Modals = ({isVisible , setisVisible , children}) => {
    return (
       <Overlay
       isVisible={isVisible}
       style={style.overlay}
       onBackdropPress={ () => setisVisible(false) }
       >
           {
               children
           }

       </Overlay>
    )
}

export default Modals

const styles = StyleSheet.create({

    overlay:{
        height:'90%',
        width:'90%'
    }
})
