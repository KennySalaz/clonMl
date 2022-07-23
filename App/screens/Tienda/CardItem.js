import * as React from "react";
import { Button, Card, Icon } from "react-native-elements";
import { View, Image, Text, ScrollView } from "react-native";


import { useNavigation } from "@react-navigation/core";


const CardItem = () => {


    const navigation = useNavigation();

    return (
        <View>
            <Card>
                <Card.Title>HELLO WORLD</Card.Title>
                <Card.Divider />
                <Card.Image source={{
                    uri:
                        "https://avatars0.githubusercontent.com/u/32242596?s=460&u=1ea285743fc4b083f95d6ee0be2e7bb8dcfc676e&v=4"
                }}>

                </Card.Image>
                <Text style={{ marginBottom: 10 }}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
           
            </Card>
            {/*       <Card>
                <Card.Title>HELLO WORLD</Card.Title>
                <Card.Divider />
                <Card.Image source={require('../images/pic2.jpg')}>
                    <Text style={{ marginBottom: 10 }}>
                        The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                        icon={<Icon name='code' color='#ffffff' />}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='VIEW NOW' />
                </Card.Image>
            </Card> */}
        </View>
    )
}

export default CardItem
