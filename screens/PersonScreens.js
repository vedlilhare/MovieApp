import { View, Text, Dimensions, Platform ,ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbaclPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

var {width , height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '': 'my-5'

const PersonScreens = () => {
    const {params : item} = useRoute();
    const navigation = useNavigation();
     const [isfavourite , toggleFavourite] = useState(false);
     const [personMovies ,setPersonMovies] = useState([]);
     const [person ,setPerson] = useState({});
     const [loading , setLoading] = useState(false);

     console.log(item);

     useEffect(()=> {
setLoading(true);
getPersonDetails(item.id);
getPersonMovies(item.id);
     },[item])


  const getPersonDetails = async id => {
    const data = await fetchPersonDetails(id);
    if(data) setPerson(data)
        setLoading(false)
    // console.log(data);
  }
  const getPersonMovies = async id => {
    const data = await fetchPersonMovies(id);
    if(data && data.cast) setPersonMovies(data.cast)
        setLoading(false)
    // console.log(data);
  }

  return (
   <ScrollView className='flex-1 bg-neutral-900' contentContainerStyle={{paddingBottom: 20}}>
{/* back button */}
<SafeAreaView className={"w-full z-20 flex-row justify-between items-center px-4"+verticalMargin} >
<TouchableOpacity  onPress={()=> navigation.goBack()} className='rounded-xl p-1 bg-yellow-300'>
    <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />
</TouchableOpacity>
<TouchableOpacity onPress={() => toggleFavourite(!isfavourite)}>
    <HeartIcon  size={35} color= {isfavourite?'red' : 'white'}/>
</TouchableOpacity>
    </SafeAreaView>
    {/* person details */}

    {
        loading?(
<Loading/>
        ): (
<View>
        <View className='flex-row justify-center' style= {{shadowColor :'gray' , shadowOpacity: 1 , shadowRadius: 50 , shadowOffset: {width: 0 , height: 5}}}>
            <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500'>
            <Image  
            // source={require("../assets/images/castPoster.jpg")}
            source={{uri: image342(person?.profile_path) || fallbaclPersonImage}}
             style={{height: height*0.35 , width: width*0.74}}/>
            </View>
            
        </View>
        <View className='mt-6'>
            <Text className='text-white font-bold text-3xl text-center'>
                {person?.name}
            </Text>
            <Text className='text-base text-neutral-500 text-center'>
            {person?.place_of_birth}
            </Text>

        </View>

<View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
<View className='border-r-2 border-r-neutral-400 px-2 items-center'>
    <Text className='font-semibold text-white'> Gender</Text>
    <Text className='font-sm text-neutral-300'> {person?.gender == 1 ?'Female':'Male'}</Text>

</View>
<View className='border-r-2 border-r-neutral-400 px-2 items-center'>
    <Text className='font-semibold text-white'> Birthday</Text>
    <Text className='font-sm text-neutral-300'> {person?.birthday}</Text>

</View>
<View className='border-r-2 border-r-neutral-400 px-2 items-center'>
    <Text className='font-semibold text-white'> Known for</Text>
    <Text className='font-sm text-neutral-300'> {person?.known_for_department}</Text>

</View>
<View className='px-2 items-center'>
    <Text className='font-semibold text-white'> Popularity</Text>
    <Text className='font-sm text-neutral-300'> {person?.popularity} %</Text>

</View>
</View>

<View className='my-6 mx-4 space-y-2'>
    <Text className='text-white text-lg'>
Biography
    </Text>
    <Text className='text-neutral-400 tracking-wide'>
   {person?.biography  || 'N/A'}
    </Text>
</View>

{/* movies */}
<MovieList title={'Movies'} hideSeeAll={true} data = {personMovies}/>

    </View>
        )
    }
    
   </ScrollView>
  )
}

export default PersonScreens