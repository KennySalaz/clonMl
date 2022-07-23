import React from 'react'
import { Button } from 'react-native-elements'
import { Text, View } from 'react-native'
import { UsarContext } from '../ContextApi/UseContext'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import AntDesign from 'react-native-vector-icons/AntDesign'


const Tabs = () => {

  cosnt = [{ user, addCardPlus }, dispatch] = UsarContext()
  const cardsPlus = addCardPlus.length
  const navigation = useNavigation();


  return (

    <>

      {
        user && (
          <>
            {
              addCardPlus.length !== 0 && (
                <Button
                  buttonStyle={{

                    height: 50,
                    backgroundColor: '#c3c3c3bd',
                  }}
                  containerStyle={{
                    position: 'absolute',
                    bottom: 20,
                    right: 100,
                    left: 100,
                    borderRadius: 30,
                  }}
                  title={'View Out' + ' ' + `(${cardsPlus})`}
                  onPress={() => navigation.navigate('AddCard')}
                  titleStyle={{ color: '#f50' }}
                  icon={
                    <AntDesign
                      style={{
                        paddingRight: 10
                      }}
                      name="arrowright"
                      size={15}
                      color="black"
                    />}
                />
              )}

          </>
        
  )
}
</>




  )
}
export default Tabs
