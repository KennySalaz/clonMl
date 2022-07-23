import React from 'react'
import { View, Text } from 'react-native'

const EditCategory = ({route}) => {
    const { categoria, id } = route.params
    return (
        <View>
            <Text>{categoria} </Text>
        </View>
    )
}

export default EditCategory
