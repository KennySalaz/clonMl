import React, { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { FlatList } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const { width, height } = Dimensions.get('screen')

const IMAGE_SIZE = 80
const SPACING = 5

const data =
    [
        { id: 1, image: 'https://s1.1zoom.me/big3/471/Painting_Art_Back_view_Photographer_575380_3840x2400.jpg' },
        { id: 2, image: 'https://neliosoftware.com/es/wp-content/uploads/sites/3/2018/07/aziz-acharki-549137-unsplash-1200x775.jpg' },
        { id: 3, image: 'https://blog.hootsuite.com/wp-content/uploads/2019/02/photographer-865295_1920-e1550084906860.jpg' },
        { id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHtWNeSg0gK2G7S7Etp_JcJRqcxVoJrkmKbRuwAtnerDeq_4kFTcHdir8ypoAgv5cWarE&usqp=CAU' },
        { id: 5, image: 'https://www.blogdelfotografo.com/wp-content/uploads/2019/02/camara-escritorio.jpg' },
        { id: 6, image: 'https://www.escueladesarts.com/wp-content/uploads/fotografia-a-color.jpg' },
        { id: 7, image: 'https://i0.wp.com/hipertextual.com/wp-content/uploads/2020/02/hipertextual-digitaliza-tus-viejas-fotografias-con-estas-aplicaciones-android-y-ios-2020171352.jpg?fit=1920%2C1271&ssl=1' },
    ]


const ComponentImg = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const topRef = useRef()
    const thumRef = useRef()


    const scrollToActiveIndex = (index) => {
        setActiveIndex(index)
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true
        })
        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            thumRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        } else {
            thumRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })
        }

    }
    useEffect(() => {
        console.log(activeIndex)
    }, [activeIndex])


    return (
        <View style={{ flex: 1 }}>

            <FlatList
                ref={topRef}
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={ev => {
                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, height }}>
                            <Image

                                source={{ uri: item.image }}
                                style={[StyleSheet.absoluteFillObject]}
                            />

                        </View>

                    )
                }}
            />
            <View style={{ padding: 8, backgroundColor: '#1e1144f0', }}>
                <FlatList
                    ref={thumRef}
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    /*  style={{ position: 'absolute', bottom: IMAGE_SIZE }} */
                    contentContainerStyle={{ paddingHorizontal: SPACING, }}
                    renderItem={({ item, index }) => {

                        return <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: 15,
                                    marginRight: SPACING,
                                    borderWidth: 3,
                                    borderColor: index === activeIndex ? '#fff' : 'transparent'

                                }}
                            />
                        </TouchableOpacity>
                    }}
                />
            </View>


            <Button
                containerStyle={{ margin: 5 }}
                title='Continuar'
                buttonStyle={{ backgroundColor: '#1e1144f0', width: '100%' }}
            /*  onPress={() => navigation.navigate('VenderDescripton', { title, category, state })} */
            />
            <Button
                /*   onPress={imageOnPress} */
                containerStyle={{ margin: 5 }}
                buttonStyle={{ backgroundColor: '#fff' }}
                titleStyle={{ color: '#1e1144f0' }}
                title='Cargar Mas Fotos'
            />
        </View>
    )
}

export default ComponentImg

const styles = StyleSheet.create({})
