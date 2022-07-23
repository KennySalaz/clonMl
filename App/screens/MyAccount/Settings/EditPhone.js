import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements'
import Modals from '../../../Componentes/Modals';
const EditPhone = () => {

    const [showModals, setShowModals] = useState(false)
    const [showPassword, setShowPassword] = useState(false);





    return (


        <Card containerStyle={[styles.card, {}]}  >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                <Button
                    containerStyle={styles.shadow_}
                    buttonStyle={{
                        backgroundColor: '#E9E9E9',
                        padding: 15,
                    }}
                    title={'0424-153-9300'}
                    titleStyle={{
                        color: '#8E8E8E'
                    }}
                />
                <Button
                    containerStyle={styles.shadow_}
                    buttonStyle={{
                        backgroundColor: '#E9E9E9',
                        padding: 15,
                    }}
                    title={'Editar'}
                    titleStyle={{
                        color: '#000'
                    }}
                    onPress={() => setShowModals(true)}
                />
            </View>

            <Modals isVisible={showModals} setisVisible={setShowModals}  >
                <View style={{ width: 300, }}>
                    <Input
                        label='Enter Password'
                        placeholder={'Password'}
                        rightIcon={
                            <Icon
                                secureTextEntry={!showPassword}
                                size={24}
                                name='eye'
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                    />
                    <Button
                        title={'Confirm'}
                    />
                </View>

            </Modals>

        </Card>
    )
}

export default EditPhone
const styles = StyleSheet.create({


    card: {
        shadowOpacity: 10,
        shadowRadius: 0,
        shadowOffset: {
            width: -3,
            height: -5,
        },
        shadowColor: '#000000',
        elevation: 3,
        borderRadius: 10,
    },
    shadow_: {
        shadowOpacity: 10,
        shadowRadius: 10,
        shadowOffset: {
            width: -4,
            height: -4,
        },
        shadowColor: '#000000',
        elevation: 5,
        borderRadius: 10,


    }


})
