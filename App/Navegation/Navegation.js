import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, HeaderBackButton } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UsarContext } from '../ContextApi/UseContext';
import InfoProduct from '../screens/Tienda/InfoProduct/InfoProduct'
import Shopping from '../screens/Shopping';
import Contact from '../screens/Contact';
import { addCollectionClients, deleteFavorite, getDocumentIdClients, getIsFavorite, userLogged } from '../utils/actions'
import Loading from '../Componentes/Loading';
import Welcome from '../screens/MyAccount/Welcome';
import MyAccount from '../screens/MyAccount/MyAccount';
import Signin from '../screens/Account/SignIn';
import SignUp from '../screens/Account/SignUp';
import Tienda from '../screens/Tienda/Tienda';
import CardItem from '../screens/Tienda/CardItem';
import AddCard from '../screens/Tienda/AddCard';
import Tabs from './Tabs'
import Header from './Header';
import Favorite from '../screens/Tienda/Favorite'
import CustomDrawer from './CustomDrawer'
import Market from '../screens/Tienda/Market/Market';
import ChangePassword from '../screens/MyAccount/ChangePassword/ChangePassword';
import ConfigSetting from '../screens/MyAccount/Settings/ConfigSetting';
import InfoSeller from '../screens/Tienda/InfoSeller/InfoSeller';
import Publications from '../screens/Tienda/Publications/Publications';
import EditConfig from '../screens/Tienda/Publications/EditConfig';
import EditTitle from '../screens/Tienda/Publications/EditConfig/EditTitle';
import EditPrice from '../screens/Tienda/Publications/EditConfig/EditPrice';
import EditDescription from '../screens/Tienda/Publications/EditConfig/EditDescription';
import EditImage from '../screens/Tienda/Publications/EditConfig/EditImage';
import EditAmount from '../screens/Tienda/Publications/EditConfig/EditAmount';
import EditCondition from '../screens/Tienda/Publications/EditConfig/EditCondition';
import { Icon, Button } from 'react-native-elements';
import { filter, truncate } from 'lodash';
import AppBar from '../Componentes/AppBar';
import Home from '../screens/Tienda/Home';
import { Alert, View } from 'react-native';
import { Text } from 'react-native';
import { TextInput } from 'react-native';
import Category from '../screens/Tienda/Category/Category';
import EditCategory from '../screens/Tienda/Publications/EditConfig/EditCategory';
import * as Animatable from 'react-native-animatable';
import MyProfile from '../screens/MyAccount/MyProfile';
import { Divider } from 'react-native-paper';
import VenderCategory from '../screens/Tienda/Market/Vender/VenderCategory';
import VenderState from '../screens/Tienda/Market/Vender/VenderState';
import VenderPhotoMessage from '../screens/Tienda/Market/Vender/VenderPhotoMessage';
import VenderAddPhoto from '../screens/Tienda/Market/Vender/VenderAddPhoto';
import VenderDescripton from '../screens/Tienda/Market/Vender/VenderDescripton';
import VenderPrice from '../screens/Tienda/Market/Vender/VenderPrice';
import VenderPublic from '../screens/Tienda/Market/Vender/VenderPublic';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import VenderScreen from '../screens/Tienda/Market/Vender/VenderScreen';
import VenderTitle from '../screens/Tienda/Market/Vender/VenderTitle';
import VenderPublicEnd from '../screens/Tienda/Market/Vender/VenderPublicEnd';
import ComponentImg from '../screens/Tienda/ComponentImg';
import { AuthContext } from '../ContextApi/useImage';
import ItemTittle from '../screens/Tienda/Market/Vender/EditItemList/ItemTittle';
import ItemPrice from '../screens/Tienda/Market/Vender/EditItemList/ItemPrice';
import ItemState from '../screens/Tienda/Market/Vender/EditItemList/ItemState';
import ItemDescripton from '../screens/Tienda/Market/Vender/EditItemList/ItemDescripton';
import itemCategory from '../screens/Tienda/Market/Vender/EditItemList/itemCategory';
import ItemImg from '../screens/Tienda/Market/Vender/EditItemList/ItemImg';
import Splash from '../Componentes/Splash';
import LottieView from 'lottie-react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../utils/firebase';
import { actionTypes } from '../ContextApi/reducer';
const auth = getAuth(firebaseApp)
const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
function MyDrawer() {

    const [{ user }, dispatch] = UsarContext()
    const [clientsDocuemntId, setClientsDocuemntId] = useState(null)

    /*    useEffect(() => {
           userLogged()
           console.log(user, 'AQUIIII')
       }, [])
    */
    return (

        <Drawer.Navigator


            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                /*  drawerActiveBackgroundColor:'#ccc', */
                drawerActiveTintColor: '#fff',
                drawerLabelStyle: { marginLeft: -25, fontWeight: 'bold' },
                drawerInactiveTintColor: '#ffffff47',


            }}>

            <Drawer.Screen name="Home" component={Home}
                options={({ navigation }) => ({
                    drawerIcon: ({ color }) => (
                        <MaterialCommunityIcons name='home' size={25} color={color} style={{ marginRight: 10 }} />
                    ),
                    drawerLabel: 'Home',
                    headerLeft: () =>
                        <Icon name='menu' type='Entypo' color={'#fff'} size={25} onPress={() => navigation.openDrawer()} containerStyle={{ marginLeft: 15 }}
                        />,
                    headerTitleContainerStyle: {
                        width: '100%',
                    },

                    headerTitle: () => (
                        <>
                            <TextInput
                                placeholder='Buscar Producto'
                                style={{
                                    width: '100%',
                                    borderRadius: 20,
                                    backgroundColor: '#fff',
                                    padding: 5,
                                    margin: 5,
                                }}
                                inlineImageLeft={'search_icon'}
                                maxLength={20}
                            />
                        </>
                    ),
                    headerTitleAlign: 'left',
                    headerStyle: {
                        backgroundColor: '#1e1144f0',
                        /*   height: 100, */
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 6,
                        },
                        shadowOpacity: 0.39,
                        shadowRadius: 8.30,
                        elevation: 5,
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: '600',

                    },
                })} />
            {
                user && (
                    <>
                        <Drawer.Screen name='VenderScreen' component={VenderScreen}
                            options={{
                                headerTitle: 'Vender',
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <Ionicons name='pricetags' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                        <Drawer.Screen name='ComponentImg' component={ComponentImg}
                            options={{
                                headerTitle: 'Vender',
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <Ionicons name='pricetags' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                        <Drawer.Screen name='Market' component={Market}
                            options={{
                                headerTitle: 'Vender',
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <Ionicons name='pricetags' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                        <Drawer.Screen name="Tus Compras" component={Shopping}
                            options={{
                                headerTitle: 'Compras',
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <Fontisto name='shopify' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                        <Drawer.Screen name="Favorite" component={Favorite}
                            options={{
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <MaterialIcons name='favorite' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                        {/*   <Drawer.Screen name='Myaccount' component={MyAccount}
                            options={{
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <MaterialCommunityIcons name='account' size={25} color={color } style={{marginRight:10}}  />
                                )
                            }}
                        /> */}
                        <Drawer.Screen name='Publications' component={Publications}
                            options={{
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <FontAwesome name='bookmark' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />

                        <Drawer.Screen name='ChangePassword' component={ChangePassword}
                            options={{
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <FontAwesome name='cogs' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                        <Drawer.Screen name='Category' component={Category}
                            options={{
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <FontAwesome name='th-list' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                        <Drawer.Screen name='MyProfile' component={MyProfile}
                            options={{
                                headerTintColor: '#fff',
                                headerStyle: {
                                    backgroundColor: '#1e1144f0',
                                    height: 100,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 6,
                                    },
                                    shadowOpacity: 0.39,
                                    shadowRadius: 8.30,
                                    elevation: 5,
                                },
                                drawerIcon: ({ color }) => (
                                    <FontAwesome name='user-circle' size={25} color={color} style={{ marginRight: 10 }} />
                                )
                            }}
                        />
                    </>
                )}

            <Drawer.Screen name="Tienda" component={Tienda}
                options={{

                    drawerIcon: ({ color }) => (
                        <Feather name='shopping-bag' size={25} color={color} style={{ marginRight: 10 }} />
                    )
                }}
            />

            <Drawer.Screen name="Contact" component={Contact}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name='comments-o' size={25} color={color} style={{ marginRight: 10 }} />
                    )
                }}
            />

        </Drawer.Navigator>
    )
}

const Navigation = ({ onLayoutRootView, loading, setLoading }) => {

    const [{ favoriteID, deleteImg, imageDelete, indexImg }, dispatch] = UsarContext()
    const [editFvorite, setEditFvorite] = useState(false)
    const [imageContext, setImageContext] = useContext(AuthContext)
    const [loadinsFvorite, setLoadinsFvorite] = useState(false)

    const userLogged = () => {

        onAuthStateChanged(auth, (userCredentials) => {
            if (userCredentials) {
                dispatch({
                    type: actionTypes.USER_FIREBASE,
                    user: userCredentials
                })
            }
        })
    }

    const addFavorite = async () => {
        setLoadinsFvorite(true)
        const result = await addCollectionClients('Clients', 'Favorite', favoriteID)

        if (result.statusRespon) {
            setEditFvorite(true)

        } else {
            Alert.alert('no se puedo agregar a favoritos')
        }
        setLoadinsFvorite(false)
    }

    const whyIsFavorite = async () => {

        const response = await getIsFavorite(favoriteID)
        if (response.statusRespon) {
            setEditFvorite(response.isFavorite)

        } else {
            console.log('este es el error', response.error)
        }
    }

    const removeFavorite = async () => {
        const result = await deleteFavorite(favoriteID)
        if (result.statusRespon) {
            setEditFvorite(false)
            Alert.alert('se borro')
        } else {
            Alert.alert('no se pudo borrar')
        }
    }

    const removeImg = (imageProps, indexPros) => {
        const result = filter((imageContext), (PorCadaImagen) => PorCadaImagen !== imageProps)


        result.splice(indexPros, 1)
        setImageContext(result)

    }

    useEffect(() => {
        whyIsFavorite()
    }, [favoriteID])

    useEffect(() => {
        userLogged()
    }, [])
    return (
        <>
            {
                loading ?
                    (
                        <View style={{ height: '100%', width: '100%', backgroundColor: '#1e1144f0', }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <LottieView
                                    onLayout={onLayoutRootView}
                                    style={{ width: 230, height: 230 }}
                                    source={require('../Componentes/Lottie/spash2.json')}
                                    loop
                                    speed={0.85}
                                    autoPlay
                                />
                            </View>
                        </View>

                    )
                    :
                    (
                        <NavigationContainer >
                            <Stack.Navigator initialRouteName='MyDrawer'  >
                                {/*   <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} /> */}
                                <Stack.Screen name="MyDrawer" component={MyDrawer} options={{ headerShown: false }} />
                                <Stack.Screen name="SignUp" component={SignUp} />
                                <Stack.Screen name="InfoProduct" component={InfoProduct} options={{
                                    headerStyle: {
                                        backgroundColor: '#1e1144f0',
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5,
                                    }

                                    , headerTitle: 'Producto', headerTintColor: '#fff',
                                    headerRight: () => (
                                        <Animatable.View animation="pulse" duration={1700} direction='normal'>
                                            <Loading isVisible={loadinsFvorite} />
                                            <Icon
                                                type='entypo'
                                                name={editFvorite ? 'heart' : 'heart-outlined'}
                                                size={editFvorite ? 25 : 20}
                                                onPress={editFvorite ? removeFavorite : addFavorite}
                                                color={'white'}
                                            />
                                        </Animatable.View>
                                    )
                                }}
                                />
                                <Stack.Screen name="Signin" component={Signin} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTintColor: '#fff' }} />
                                <Stack.Screen name="AddCard" component={AddCard} />
                                <Stack.Screen name="CardItem" component={CardItem} />
                                <Stack.Screen name="ConfigSetting" component={ConfigSetting} />
                                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                                <Stack.Screen name="InfoSeller" component={InfoSeller} />
                                <Stack.Screen name="EditConfig" component={EditConfig} options={{ headerStyle: { backgroundColor: '#1e1144f0', }, headerTitle: 'Configuracion', headerTitleAlign: 'center', headerTintColor: '#fff' }} />
                                <Stack.Screen name="EditTitle" component={EditTitle} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: 'Titulo', headerTitleAlign: 'center', headerTintColor: '#fff' }} />
                                <Stack.Screen name="EditPrice" component={EditPrice} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: 'Price', headerTitleAlign: 'center', headerTintColor: '#fff' }} />
                                <Stack.Screen name="EditDescription" component={EditDescription} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: 'Descripcion', headerTitleAlign: 'center', headerTintColor: '#fff' }} />
                                <Stack.Screen name="EditImage" component={EditImage} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTintColor: '#fff' }} />
                                <Stack.Screen name="EditAmount" component={EditAmount} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTintColor: '#fff' }} />
                                <Stack.Screen name="EditCondition" component={EditCondition} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTintColor: '#fff' }} />
                                <Stack.Screen name="EditCategory" component={EditCategory} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTintColor: '#fff' }} />
                                <Stack.Screen name="Welcome" component={Welcome}/*  options={{ headerShown: false }} */ />
                                <Stack.Screen name="VenderTitle" component={VenderTitle} />
                                <Stack.Screen name="VenderCategory" component={VenderCategory} />
                                <Stack.Screen name="VenderState" component={VenderState} />
                                <Stack.Screen name="VenderPhotoMessage" component={VenderPhotoMessage} />
                                <Stack.Screen name="VenderAddPhoto" component={VenderAddPhoto}
                                    options={{
                                        headerRight: () => (
                                            <Icon
                                                name='delete'
                                                type='ant-design'
                                                onPress={() => removeImg(deleteImg, indexImg)}
                                            />
                                        ),
                                        headerTitle: '',
                                    }}
                                />
                                <Stack.Screen name="VenderDescripton" component={VenderDescripton} />
                                <Stack.Screen name="VenderPrice" component={VenderPrice} />
                                <Stack.Screen name="VenderPublic" component={VenderPublic} />
                                <Stack.Screen name="VenderPublicEnd" component={VenderPublicEnd} options={{ headerShown: false }} />
                                <Stack.Screen name="ItemTittle" component={ItemTittle} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: '' }} />
                                <Stack.Screen name="ItemPrice" component={ItemPrice} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: '' }} />
                                <Stack.Screen name="ItemState" component={ItemState} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: '' }} />
                                <Stack.Screen name="ItemDescripton" component={ItemDescripton} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: '' }} />
                                <Stack.Screen name="itemCategory" component={itemCategory} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: '' }} />
                                <Stack.Screen name="ItemImg" component={ItemImg} options={{ headerStyle: { backgroundColor: '#1e1144f0' }, headerTitle: '' }} />
                            </Stack.Navigator>
                        </NavigationContainer>

                    )
            }

        </>
    )
}



export default Navigation
