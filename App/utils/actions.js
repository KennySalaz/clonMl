import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updateEmail,
    updatePassword,
    AuthCredential,

} from '@firebase/auth';
import {
    getFirestore,
    getDoc,
    collection,
    orderBy,
    limit,
    getDocs,
    startAfter,
    doc,
    addDoc,
    where,
    query,
    deleteDoc
} from 'firebase/firestore';
import { actionTypes } from '../ContextApi/reducer';
import firebaseApp from "./firebase"
import { getStorage, ref, getDownloadURL, uploadBytes, } from 'firebase/storage'
import { fileToBlob } from './helpers';
import { Alert } from 'react-native';

import { map } from 'lodash';
import { useState } from 'react';
import { UsarContext } from '../ContextApi/UseContext';

const auth = getAuth(firebaseApp)
const storage = getStorage(firebaseApp)
const db = getFirestore(firebaseApp)


/* 
export const userLogged = () => {
   
    onAuthStateChanged(auth, (userCredentials) => {
        if (userCredentials) {
            dispatch({
                type: actionTypes.USER_FIREBASE,
                user: userCredentials
            })
        }
    })
} */

export const userRegister = async (email, password) => {
    const result = { statusResponse: true, error: null }
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        /*  .then(userCredentials => {
             const userId = userCredentials.user.uid
            
         }) */
    } catch (error) {
        result.statusResponse = false
        result.error = 'Este usuario ya esta registrado'
    }
    return result
}


export const isLogin = async (email, password) => {
    const result = { statusResponse: true, error: null, }
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = 'Email o Password Invalido'
    }
    return result
}


export const firebaseStorage = async (image, NameRoute, IdUser, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const blob = await fileToBlob(image)
    try {
        const refStorage = ref(storage, `${NameRoute}/${IdUser}/${name}`)
        await uploadBytes(refStorage, blob)
        const url = await getDownloadURL(refStorage)
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = Alert(error)
    }
    return result
}

export const updateProfileAvtar = async (url) => {
    const result = { statusResponse: true, error: null }
    try {
        await updateProfile(auth.currentUser, {
            photoURL: url
        }
        )
    } catch (error) {
        result.statusResponse = false
        result.error = error

    }
    return result
}
export const addCollectionClients = async (collectionClients, collectionNew, data) => {

    const result = { statusRespon: true, error: null }
    try {
        await addDoc(collection(db, collectionClients, auth.currentUser.uid, collectionNew,), {
            favoriteID: data,

        })
    } catch (error) {
        result.statusRespon = false
        result.error = error

    }
    return result
}

export const getIsFavorite = async (id) => {
    const result = { statusRespon: true, error: null, isFavorite: false, data: [] }
    try {
        const refFav = collection(db, "Clients", auth.currentUser.uid, 'Favorite')
        const q = query(refFav, where('favoriteID', '==', id))
        const respon = await getDocs(q)
        result.isFavorite = respon.docs.length > 0

    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}


export const deleteFavorite = async (id) => {
    const result = { statusRespon: true, error: null }

    try {
        const refFav = collection(db, "Clients", auth.currentUser.uid, 'Favorite')
        const q = query(refFav, where('favoriteID', '==', id))
        const respon = await getDocs(q)
        respon.forEach(async (date) => {
            const favoiteIDCollection = date.id
            await deleteDoc(doc(db, "Clients", auth.currentUser.uid, 'Favorite', favoiteIDCollection));
            return result
        })

    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}





export const reautenticar = async (password) => {

    const result = { statusRespon: true, error: null }
    const user = auth.currentUser
    const credencials = EmailAuthProvider.credential(user.email, password)
    try {
        await reauthenticateWithCredential(user, credencials, AuthCredential)
    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}


export const onChangeEmailFirebase = async (email) => {
    const result = { statusRespon: true, error: null }
    const user = auth.currentUser
    try {
        await updateEmail(user, email)
    } catch (error) {

        result.statusRespon = false,
            result.error = error
    }
    return result
}

export const onChangePasswordFirebase = async (password) => {
    const result = { statusRespon: true, error: null }
    try {
        await updatePassword(auth.currentUser, password)
    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}


export const getCollectionProduct = async (limiteProducts) => {

    const response = {
        status: true,
        error: null,
        products: [],
        startProduct: null
    }
    try {
        const result = await getDocs(collection
            (db, 'productos'),
            orderBy('creado', "desc"),
            limit(limiteProducts))

        if (result.docs.length > 0) {
            response.startProduct = result.docs[result.docs.length - 1]
        }

        result.forEach(doc => {
            const product = doc.data()
            product.id = doc.id
            response.products.push(product)
        })
    } catch (error) {
        response.status = false
        response.error = error

    }
    return response


}

export const getMoreCollectionProduct = async (limiteProducts, startProduct) => {
    const response = {
        status: true,
        error: null,
        products: [],
        startProduct: null
    }
    try {
        const result = await getDocs(collection
            (db, 'productos'),
            orderBy('creado', "desc"),
            startAfter(startProduct.data().creado),
            limit(limiteProducts))
        if (result.docs.length > 0) {
            response.startProduct = result.docs[result.docs.length - 1]
        }
        result.forEach(doc => {
            const product = doc.data()
            product.id = doc.id
            response.products.push(product)
        })
    } catch (error) {
        response.status = false
        response.error = error

    }
    return response


}

export const getDocumentIdClients = async (collection, id) => {
    const result = { statusRespon: true, error: null, document: null }
    const docRef = doc(db, collection, id)
    try {
        const response = await getDoc(docRef);
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}

export const listFavorites = async () => {
    const result = { statusRespon: true, error: null, favorites: [] }

    try {
        const refFav = collection(db, "Clients", auth.currentUser.uid, 'Favorite')
        const q = query(refFav)
        const respon = await getDocs(q)
        const productID = []
        respon.forEach(async (doc) => {
            const favoiteIDCollection = doc.data()
            productID.push(favoiteIDCollection.favoriteID)
        })
        await Promise.all(
            map(productID, async (productsID) => {
                const respon2 = await getDocumentId("productos", productsID)
                if (respon2.statusRespon) {
                    result.favorites.push(respon2.document)
                }
            })
        )
    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}


export const getDocumentId = async (collection, id) => {
    const result = { statusRespon: true, error: null, }
    const docRef = doc(db, collection, id)
    try {
        const response = await getDoc(docRef);
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}

export const getIDProdut = async () => {
    const result = { statusRespon: true, error: null, idProductClients: [] }
    const refIDProduct = collection(db, "Clients", auth.currentUser.uid, 'Products')
    try {
        const response = await getDocs(refIDProduct)
        response.forEach(async (data) => {
            const idProd = data.id
            result.idProductClients.push(idProd)
        })
    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}


export const deleteDocProducts = async (id, idCProdts) => {
    const result = { statusRespon: true, error: null, }

    try {
        /*    await deleteDoc(doc(db, 'Clients', auth.currentUser.uid, 'Products', idCProdts)); */
        await deleteDoc(doc(db, 'productos', id));
    } catch (error) {
        result.statusRespon = false
        result.error = error
    }
    return result
}







export const getMoreCollectionProductUSERS = async () => {
    const result = {
        status: true,
        error: null,
        products: [],
        startProduct: null,

    }
    try {

        const refProduct = collection(db, "Clients", auth.currentUser.uid, 'Products')
        const q = query(refProduct)
        const respon = await getDocs(q);
        const productsID = []


        respon.forEach(async (doc) => {
            const productIdCollection = doc.data()
            productsID.push(productIdCollection.productos_id)
        })

        await Promise.all(
            map(productsID, async (productsID) => {
                const respon2 = await getDocumentId('productos', productsID)
                if (respon2.statusRespon) {
                    result.products.push(respon2.document)
                }
            })
        )

        /*   const result = await
              getDocs(collection(db, 'Clients', auth.currentUser.uid,),
                  orderBy('creado', "desc"),
                  startAfter(startProduct.data().creado),
                  limit(limiteProducts))
          if (result.docs.length > 0) {
              response.startProduct = result.docs[result.docs.length - 1]
          } */
        /*  result.forEach(doc => {
             const product = doc.data()
             product.id = doc.id
             result.products.push(product)
 
         }) */
    } catch (error) {
        result.status = false
        result.error = error
    }
    return result
}






/* export const dataUser = async () => {
    await getDoc(collection(db, "Clients", auth.currentUser))
} */