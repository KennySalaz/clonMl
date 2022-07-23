import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/core';




export default function Splash({ isVisible, text , onLayoutRootView }) {

    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('MyDrawer')
        }, 3000);
    }, [navigation])

    return (
        <Overlay
            isVisible={isVisible}
            /*  backdropStyle="rgba(0,0,0,0.5)" */
            /*  overlayBackgroundColor="transparent" */
            overlayStyle={styles.overlay}
        >
            <View style={styles.carga}  >
                <LottieView
                onLayout={onLayoutRootView}
                    style={{ width: 300, height: 300, }}
                    source={require('./Lottie/spash2.json')}
                    autoPlay
                    loop
                    speed={0.90}
                /*   duration={3000} */
                /*  onAnimationFinish={() => navigation.navigate('MyDrawer')} */
                />
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',

         backgroundColor: '#1e1144f0',
        /* borderColor: '#442484', */
        /*   borderWidth: 2,
          borderRadius: 10, */

    },
    carga: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
