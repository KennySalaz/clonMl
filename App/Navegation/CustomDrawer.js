import React from 'react'
import { ImageBackground, Text, View, Image, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/core";
import { UsarContext } from '../ContextApi/UseContext'
import { getAuth } from 'firebase/auth'
import firebaseApp from '../utils/firebase'

const auth = getAuth(firebaseApp)
const CustomDrawer = (props) => {
    const navigation = useNavigation();
    const [{ user }, dispatch] = UsarContext()
    const userCurrent = auth.currentUser

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ height: '100%', backgroundColor: '#fff' }}
            >

                <ImageBackground
                    resizeMode={'cover'}
                    style={{ padding: 20, }}
                    source={{
                        uri:
                            user ?
                                'https://cdn3.notifyvisitors.com/blog/wp-content/uploads/2019/01/11064310/Top-5-Push-Notifications-Templates-For-Ecommerce-Website-banner1.jpg'
                                :
                                'https://www.nicepng.com/png/detail/8-81779_png-images-download-welcome-png.png'
                    }}
                >
                    <TouchableOpacity onPress={ () => navigation.navigate('Myaccount') } >
                        <Image

                            style={{ height: 100, width: 100, borderRadius: 70, marginBottom: 10 }}
                            source={
                                userCurrent?.photoURL === null ?
                                    { uri: 'https://anuario.misionesonline.net/wp-content/uploads/2018/01/300.png' }
                                    :
                                    { uri: user?.photoURL }}
                        />
                    </TouchableOpacity>
                    {/* <Text style={{ fontWeight: 'bold', color: '#fff' }}> Nombre y Apellido  </Text> */}
                    <Text style={{ fontWeight: 'bold', color: '#fff' }}> {user?.email}  </Text>

                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#1e1144f0', padding: 5 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>



            {
                user === null && (
                    <TouchableOpacity onPress={() => navigation.navigate("Signin")} >
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#1e1144f0', paddingVertical: 15 }}>
                            <Ionicons name='exit-outline' size={25} color={'#fff'} />
                            <Text style={{ fontSize: 15, marginLeft: 5, color:'#fff' }} > Sign In </Text>
                        </View>
                    </TouchableOpacity>
                )
            }




        </View>

    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center"

    }
})
