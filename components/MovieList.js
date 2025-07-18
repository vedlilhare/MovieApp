import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../api/moviedb';
var {width , height} = Dimensions.get('window');

const MovieList = ({title , data ,hideSeeAll}) => {
let movieName = 'Ant man and the wasp : Quantumainia';
const navigation = useNavigation();

  return (
    <View className='mb-8 space-y-4'>
        <View className='mx-4 flex-row justify-between items-center'>
        <Text className='text-white text-xl'>{title}</Text>
       { !hideSeeAll && (
 <TouchableOpacity>
 <Text className='text-lg text-yellow-400'>See All</Text>
</TouchableOpacity>
)} 
       
        </View>
        {/* Moviw row */}
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle = {{paddingHorizontal: 15}}
        >
          {
            data.map((item , index)=>{
                return <TouchableWithoutFeedback 
                key = {index}
                onPress={()=> navigation.push('Movie',item)}
                >
<View  className='space-y-1 mr-4'>
    <Image 
    // source={require('../assets/images/image2.jpg')}
    source={{uri : image185(item.poster_path) || fallbackMoviePoster}}
    className='rounded-3xl'
    style={{width: width*0.33 , height: height*0.22}}
    />
<Text className='text-neutral-300 ml'>{item.title.length > 14 ? item.title.slice(0, 14)+'...': item.title}</Text>
</View>

         
                </TouchableWithoutFeedback>

            })
          }  
        </ScrollView>
      
    </View>
  )
}

export default MovieList