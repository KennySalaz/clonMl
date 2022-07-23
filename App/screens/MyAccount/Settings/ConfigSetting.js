import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ChangeEmail from './ChangeEmail'
import EditPhone from './EditPhone'


const ConfigSetting = () => {

    return (
        <View style={styles.container}>
           
            <ChangeEmail />
        </View>

    )
}
export default ConfigSetting

const styles = StyleSheet.create({
    container: {
        flex: 1,
       /*  backgroundColor: '#FDF5EC', */
    },

})
