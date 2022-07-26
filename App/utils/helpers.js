import * as Permissions from 'expo-camera'
/* import * as Permissions from 'expo-location' */
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import { Alert, PermissionsAndroid } from 'react-native';

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}



export const loadImageGallery = async (array) => {
    const response = { status: false, image: null }

    const responsePermission = await  Permissions.getCameraPermissionsAsync(Permissions.CAMERA)

    if (responsePermission.status === 'denied') {
        Alert('Debes de dar permiso ')
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array,
        
    })

    if (result.cancelled) {
        return response
    }
    response.status = true
    response.image = result.uri
    return response

}


export const fileToBlob = async (path) => {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob

}



export const getCurrentLocation = async () => {
  const response = { status : false, location : null }




    const responsePermissionLocation = await Location.requestBackgroundPermissionsAsync()

    if(responsePermissionLocation.status === 'denied'){
        Alert.alert('debes dar permiso a la geolocalizaion')
    }

    const position = await Location.getCurrentPositionAsync({})

    const location = {
        latitude : position.coords.latitude,
        longitude : position.coords.longitude,
        latitudeDelta : 0.001,
        longitudeDelta : 0.001,
    }

    response.status = true
    response.location = location

}