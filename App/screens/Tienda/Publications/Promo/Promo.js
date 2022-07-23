import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://review.chinabrands.com/chinabrands/seo/image/20181224/promocion_ventas.jpg',
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://s3.amazonaws.com/cdncreativos/2016/08/promociones-irresistibles.png',
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://cdn.1001cuponesdedescuento.com.mx/thumbnails/7q57mp2nppk4s0kgwg.jpg',
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://www.easypromosapp.com/blog/wp-content/uploads/header_repartir_cupones_descuento_en_prestashop.jpg',
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://www.easypromosapp.com/blog/wp-content/uploads/header_codigos_promocionales_como_ofrecerlos.jpg',
    },
];
const { width: screenWidth } = Dimensions.get('window');

const Promo = props => {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage

                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    /* parallaxFactor={0.4} */
                    {...parallaxProps}
                />

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1e1144f0', 'transparent']}
                style={styles.background}
            />
            <TouchableOpacity onPress={goForward}>

            </TouchableOpacity>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={200}
                itemWidth={screenWidth - 60}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
                
            />
        </View>
    );
};

export default Promo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#dddddd6e'

    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 240,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 150,
    },
});