import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import LottieView from 'lottie-react-native';


export default function LadingTop({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            backdropStyle="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View style={styles.carga} >
                {/*   <ActivityIndicator
                    size='large'
                    color='#00b'
                /> */}
                <View style={{ width: '100%', height: '50%' }}>
              {/*   {
                        text && <Text> {text} </Text>
                    } */}
                    <LottieView
                        source={require('./Lottie/TopLoading.json')}
                        autoPlay
                        loop
                        speed={0.7}



                    />
                    

                </View>

            </View>

        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '200%',
        backgroundColor: 'transparent'
    },
    carga: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
