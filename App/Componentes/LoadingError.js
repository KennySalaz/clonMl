import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import LottieView from 'lottie-react-native';
export default function LoadingError({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            /*  backdropStyle="rgba(0,0,0,0.5)"
             overlayBackgroundColor="transparent" */
            overlayStyle={styles.overlay}
        >
            <View style={styles.carga} >
                <LottieView
                    source={require('./Lottie/notC.json')}
                    autoPlay
                    loop
                />
            </View>

        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: 300,
        width: 300,
        /*   backgroundColor: 'transparent', */
        borderColor: '#442484',
        borderWidth: 2,
        borderRadius: 10,

    },
    carga: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
