import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SigninForm from '../../Componentes/SignInForm';
import { View } from 'react-native';
import SignupForm from '../../Componentes/SingUpForm';

/* const Stack = createNativeStackNavigator() */
const SignIn = () => {
    return (
        <View>
            <SigninForm/>
            </View>
    )
}

export default SignIn
