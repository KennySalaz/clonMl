import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Image } from 'react-native-elements'
import { ActivityIndicator } from 'react-native'
import { size } from 'lodash'
import { Dimensions } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'


const CarouselImg = ({ images, width, height, }) => {

    const [activeSlide, setActiveSlide] = useState(0)

    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardView}>
                <Image
                    style={{ width: '100%', height, borderRadius: 50, }}
                    PlaceholderContent={<ActivityIndicator color='#fff' />}
                    source={{ uri: item }}
                />
            </View>
        )
    }

    const MyPagination = ({ data, activeSlide }) => {
        const [index, setIndex] = useState(null)
        const RenderImg = ({ image }) => {
            return (
                <>
                    {
                        image.map((img, inde) => {
                            return (
                                <ScrollView>
                                    <Text> Hola </Text>
                                    <TouchableOpacity onPress={() => setIndex(inde)} >
                                        <Image
                                            containerStyle={{ width: 100, height: 100 }}
                                            style={{ width: 100, height: 100 }}
                                            resizeMode='cover'
                                            source={{ uri: img }}
                                        />
                                    </TouchableOpacity>
                                </ScrollView>
                            )
                        })
                    }

                </>
            )
        }

        return (
            <Pagination
                dotsLength={size(data)}
                activeDotIndex={activeSlide}
                containerStyle={styles.containerPagination}
                dotStyle={styles.dotActive}
                inactiveDotStyle={styles.dotInactive}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.6}
            /*  dotElement={<RenderImg image={data} />} */

            />
        )
    }

    return (
        <View >
            <Carousel
                layout={'default'}
                data={images}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width}
                itemHeight={height}
                onSnapToItem={(index) => setActiveSlide(index)}
            />

            <MyPagination
                data={images}
                activeSlide={activeSlide}

            />

        </View>


    )
}


export default CarouselImg

const styles = StyleSheet.create({

    containerPagination: {
        backgroundColor: "transparent",
        /*    zIndex: 1, */
        /*   position: "absolute", */
        bottom: 0,
        alignSelf: "center"
    },
    dotActive: {
        width: 20,
        height: 15,
        borderRadius: 10,
        marginHorizontal: 2,
        backgroundColor: "#FCC6BB"
    },
    dotInactive: {
        width: 10,
        height: 10,
        borderRadius: 7,
        marginHorizontal: 2,
        backgroundColor: "#c2c2c2"
    },
    cardView: {


        backgroundColor: 'white',
        margin: 10,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1.5,
        shadowRadius: 3,
        elevation: 5,
    },
})
