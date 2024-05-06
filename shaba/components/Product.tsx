import React from 'react';
import { StyleSheet } from 'react-native';
import { View,StarIcon,Box,Card,Image,Heading,Text,Icon,FavouriteIcon, VStack,HStack } from '@gluestack-ui/themed';
const Product:React.FC =()=>{
    return(
        <Box w={"$full"} h={"$full"}>
            <VStack alignItems="center" w={"$full"} h={"$full"}>
<Card p="$5" borderRadius="$lg" w={"$full"} h={"$full"} m="$3" bg='$amber200'>

<Image
          style={styles.image}
          source={{
            uri: 'https://ae01.alicdn.com/kf/He0634bf6016e4f2a9987640eee7937004.jpg_640x640Q90.jpg_.webp',
          }}  
        />
        <Box>
      <HStack>
      <Text style={styles.productName}>Arm Chair & Pillow</Text>
         
         <Icon  style={styles.favoriteIcon} as={FavouriteIcon} m="$2" w="$4" h="$4" />
         
         
         </HStack>
         </Box>
         <Text style={styles.productPrice}>$250.00</Text>
         <Text style={styles.productDescription}>
           This is a comfortable arm chair with a matching pillow. Perfect for your living room!
         </Text>
        
         <View style={styles.ratingContainer}>
        {/* hstack */}
        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
        <Icon as={StarIcon} m="$1" w="$4" h="$4" />
      </View>
    </Card>
    </VStack>
    </Box>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
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
    
    marginRight:90,
  },
  
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // color: 'yellow', /* color amarillo para estrellas llenas */
  },
  });
  
export default Product;