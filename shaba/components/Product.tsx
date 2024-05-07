import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Importa LinearGradient desde expo-linear-gradient
import { View,StarIcon,Box,Card,Image,Heading,Text,Icon,FavouriteIcon, VStack,HStack } from '@gluestack-ui/themed';

const Product: React.FC = () => {
    return (
        <LinearGradient
            colors={['#FFC0CB', '#FFFFFF']} // Colores del degradado, inverso al de Home
            style={styles.container} // Estilo para el contenedor
        >
            <View style={styles.contentContainer}>
                {/* Contenido de tu componente */}
                <Image
                    style={styles.image}
                    resizeMode="cover" // Ajusta la imagen para que cubra todo el contenedor
                    source={{
                        uri: 'https://th.bing.com/th/id/OIP.rFVs_R5SMm40tO3LI8VUrgHaJ3?rs=1&pid=ImgDetMain',
                    }}  
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.productName}>Blusa</Text>
                    <Icon style={styles.favoriteIcon} as={FavouriteIcon} m="$2" w="$4" h="$4" />
                    <Text style={styles.productPrice}>$250.00</Text>
                    <Text style={styles.productDescription}>Blusa de mujer roja, etc, etc</Text>
                    <View style={styles.ratingContainer}>
                        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
                        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
                        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
                        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
                        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: '100%',
        height: 300,
    },
    infoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green',
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    favoriteIcon:{
        marginRight: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: 'pink', 
    },
});

export default Product;
