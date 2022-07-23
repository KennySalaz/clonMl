import React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Surface } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native';



const AppBar = ({ navigation }) => {
    return (
        
            <Surface style={style.header} >
               
                <View style={style.view}>

                    <TouchableOpacity onPress={() => navigation.openDrawer()} >
                        <Feather name='menu' size={29} color={'#000'}  />
                    </TouchableOpacity>
                </View>

                <View style={[style.view, style.conimg]}>
                    <Image
                        style={style.img}
                        resizeMode='contain'
                        source={{
                            uri: 'https://e7.pngegg.com/pngimages/531/692/png-clipart-logo-graphic-design-art-online-shop-angle-text.png'
                        }}
                    />
                </View>

                <View style={[style.view, style.flexRigt]}>

                    <TouchableOpacity >
                        <AntDesign name='notification' size={25} color={'#000'} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Feather name='more-vertical' size={25} color={'#000'} />
                    </TouchableOpacity>
                </View>
               
            </Surface>

        




    )
}

export default AppBar


const style = StyleSheet.create({
    header: {
        height: 60,
        elevation: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
     /*    marginTop: 29, */
    },
    view: {
        flex: 1,
        /*  backgroundColor: 'yellow', */
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    flexRigt: {
        justifyContent: 'flex-end',
    },
    conimg: {
        width: '100%',
    },
    img: {
        width: '100%',
        height: 100,
    }
})
