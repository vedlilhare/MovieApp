import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fallbaclPersonImage, image185, image500 } from '../api/moviedb';

const Cast = ({cast , navigation}) => {
  return (
    <View className='my-6'>
      <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
      <ScrollView 
      horizontal
      showsHorizontalScrollIndicator = {false}
      contentContainerStyle = {{paddingHorizontal : 15}}
      > 
      {
        cast && cast.map((person , index) => {
            return(
<TouchableOpacity
key={index}
className='mr-4 items-center'
onPress={()=> navigation.navigate('Person', person)}
>
  <View className='overflow-hidden rounded-full h-24 w-24 border border-neutral-500 items-center'>
  <Image  className='rounded-2xl h-24 w-20'
  
  source={{uri: image185(person?.profile_path) || fallbaclPersonImage}}
  />
  </View>
 
<Text className='text-white text-xm mt-1'>
{ person?.character
    ? person.character.length > 10 
      ? person.character.slice(0, 10) + "..." 
      : person.character
    : "N/A"
}
</Text>
<Text className='text-neutral-400 text-xm mt-1'>
{ person?.original_name
    ? person.original_name.length > 10 
      ? person.original_name.slice(0, 10) + "..." 
      : person.original_name
    : "N/A"
  }
</Text>
</TouchableOpacity>
            )
        })
      }
        </ScrollView>
    </View>
   
  )
}

export default Cast