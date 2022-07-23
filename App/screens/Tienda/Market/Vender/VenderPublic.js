import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Avatar } from 'react-native-elements'
import { Button } from 'react-native-elements'
import LadingTop from '../../../../Componentes/LadingTop'
import LoaderAnimated from '../../../../Componentes/LoaderAnimated'
import { getFirestore, doc, getDoc, addDoc, collection, serverTimestamp, setDoc, updateDoc } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import uuid from 'random-uuid-v4'
import firebaseApp from '../../../../utils/firebase'
import { size } from 'lodash'


const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const VenderPublic = ({ route }) => {

    const {
        title,
        category,
        state,
        descriptions,
        price,
        imageContext,
        EditTitle,
        editsetDescriptions,
        Editprice,
        categoryEdit,
        stateEdit
    } = route.params


    const navigation = useNavigation();
    const [loaderTrue, setLoaderTrue] = useState(null)
    const [loadingTop, setLoadingTop] = useState(null)


    const [saveTittle, setSaveTittle] = useState(title)
    const [savecategory, setSavecategory] = useState(category)
    const [savePrice, setSavePrice] = useState(price)
    const [saveState, setSaveState] = useState(state)
    const [saveDescrptions, setSaveDescrptions] = useState(descriptions)
    const [saveImge, setSaveImge] = useState(imageContext)

    /* 
        const updateSave = () => {
            setSaveTittle(EditTitle)
            setSavecategory(categoryEdit)
            setSavePrice(Editprice)
            setSaveState(stateEdit)
        }
     */
    useEffect(() => {
        /*  updateSave() */

        if (EditTitle !== undefined) {
            setSaveTittle(EditTitle)
        }
        if (categoryEdit !== undefined) {
            setSavecategory(categoryEdit)
        }
        if (Editprice !== undefined) {
            setSavePrice(Editprice)
        }
        if (editsetDescriptions !== undefined) {
            setSaveDescrptions(editsetDescriptions)
        }
        if (stateEdit !== undefined) {
            setSaveState(stateEdit)
        }
        if (imageContext !== undefined) {
            setSaveImge(imageContext)
        }



        console.log(
            categoryEdit,
            savecategory,

        )

    }, [EditTitle, Editprice,categoryEdit,editsetDescriptions,stateEdit,imageContext])
   


    const nav = async () => {
        setLoadingTop(true)
        try {
            const idUser = auth.currentUser
            await addDoc(collection(db, "productos"),
                {
                    title: saveTittle,
                    categoria: savecategory,
                    description: saveDescrptions,
                    price: savePrice,
                    estado: saveState,
                    createBy: idUser.email,
                    creado: serverTimestamp(),
                    img: saveImge,
                    photoURL: idUser.photoURL,
                }).then(async (data) => {
                    await addDoc(collection(db, "Clients", auth.currentUser.uid, "Products"),
                        {
                            productos_id: data.id,
                            createBy: idUser.email
                        }
                    )
                })

        } catch (error) {
            alert(error)
           
        }
        setLoadingTop(false)
        setLoaderTrue(true)
        setTimeout(() => {
            setLoaderTrue(false)
            navigation.navigate('VenderPublicEnd')
        }, 3000);
    }
    return (
        <View>
            <LoaderAnimated isVisible={loaderTrue} />
            <LadingTop isVisible={loadingTop} text={'Publicando'} />
            <ListItem bottomDivider onPress={() => navigation.navigate('ItemImg', {saveImge})} >
                <Avatar
                    containerStyle={{
                        width: 100,
                        height: 100
                    }}
                    source={
                        size(saveImge) !== 0 ?
                        { uri: saveImge?.[0] }
                        :
                        {uri: 'https://image.pngaaa.com/768/791768-middle.png'}
                      
                    }
                />
                <ListItem.Content>
                    <ListItem.Title>Fotos</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider onPress={() => navigation.navigate('ItemTittle', { title })} >
                <ListItem.Content>
                    <ListItem.Title>Titulo </ListItem.Title>
                    <ListItem.Subtitle>{saveTittle}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider onPress={() => navigation.navigate('ItemPrice', { price })} >
                <ListItem.Content >
                    <ListItem.Title>Precio</ListItem.Title>
                    <ListItem.Subtitle>${savePrice}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider onPress={() => navigation.navigate('ItemState')} >
                <ListItem.Content>
                    <ListItem.Title>Condicion</ListItem.Title>
                    <ListItem.Subtitle>{saveState}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider onPress={() => navigation.navigate('ItemDescripton', { descriptions })} >
                <ListItem.Content>
                    <ListItem.Title>Descripcion</ListItem.Title>
                    <ListItem.Subtitle>{saveDescrptions}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <ListItem bottomDivider onPress={() => navigation.navigate('itemCategory', { descriptions })} >
                <ListItem.Content>
                    <ListItem.Title>Categoria</ListItem.Title>
                    <ListItem.Subtitle>{savecategory}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            <View style={{ padding: 20 }}>
                <Button
                    title='Publicar'
                    buttonStyle={{
                        backgroundColor: '#1e1144f0',
                    }}
                    onPress={nav}
                />
            </View>
        </View>
    )
}

export default VenderPublic
const styles = StyleSheet.create({})
