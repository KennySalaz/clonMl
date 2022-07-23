import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignupForm from '../../Componentes/SingUpForm'
import { View } from 'react-native'



/* const Stack = createNativeStackNavigator() */

const SignUp = () => {
    return(
        <View>
            <SignupForm/>
            </View>
    )

}

export default SignUp