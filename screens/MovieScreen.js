import { View, Text, Dimensions, Platform , ScrollView, SafeAreaView, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import { colorScheme } from 'nativewind';

var {width , height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios? '': ' mt-15';
let movieName = "Ant man and the wasp : Quantumainia";

const MovieScreen = () => {

   const {params : item} = useRoute();
   const navigation = useNavigation();
   const [isfavourite , toggleFavourite] = useState(false);
   const [cast , setCast] = useState([]);
   const [similarmovies , setSimilarmovies] = useState([]);
   const [loading , setLoading] = useState(false);
   const [movie , setMovie] = useState({})

   useEffect(() =>{

    // call the movie detail api here
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);

   }, [item])


   const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id);
    if(data) setMovie(data)
    setLoading(false);

   }

   const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id)
    // console.log(data.cast)
    if(data && data.cast) setCast(data.cast)
   }

   const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id)
    // console.log(data.result)
    if(data && data.results) setSimilarmovies(data.results)
   }

    
  return (
    <ScrollView
    contentContainerStyle = {{paddingBottom: 20}}
    className = 'flex-1 bg-neutral-900'
    >
{/* back button and movie poster */}

<View className='w-full'>
    <SafeAreaView className={"absolute w-full z-20 flex-row justify-between items-center px-4"+topMargin} >
<TouchableOpacity  onPress={()=> navigation.goBack()} className='rounded-xl p-1 bg-yellow-300'>
    <ChevronLeftIcon size={28} strokeWidth={2.5} color='white' />

</TouchableOpacity>
<TouchableOpacity onPress={() => toggleFavourite(!isfavourite)}>
    <HeartIcon  size={35} color= {isfavourite?'red' : 'white'}/>
</TouchableOpacity>
    </SafeAreaView>
{
    loading ?(
<Loading/>
    ): (
        <View>
        <Image  
        // source={require('../assets/images/image2.jpg')}
        source={{uri: image500(movie?.poster_path || fallbackMoviePoster)}}
         style={{width: width , height: height*0.55}}/>
        <LinearGradient
        className="bottom-0"
colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
style={{width: width , height: height*0.40}}
start={{x: 0.5 , y: 0}}
end= {{x: 0.5 , y: 1}}

/>
    </View>
    )
}

 

</View>

{/* Movie details */}

<View style={{marginTop: -(height*0.40)}} className='space-y-3'>
    {/* title name */}
    <Text className='text-white text-center text-3xl font-bold tracking-wider'>
        {movie?.title}
    </Text>

    {/* status , relase , runtime */}

    {
        movie?.id?(
            <Text className='text-neutral-400 font-semibold text-base text-center mt-4'>
            {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
               </Text>
        ):null
    }

  

    {/* genres */}

<View className='flex-row justify-center mx-4 space-x-2'>

    {
        movie?.genres?.map((genre , index)=>{
            return (<Text key={index} className='text-neutral-400 font-semibold text-base text-center mt-4'>
                {genre?.name} .
                   </Text>)
        })
    }

    {/* <Text className='text-neutral-400 font-semibold text-base text-center mt-4'>
Thrill .
    </Text>
    
    <Text className='text-neutral-400 font-semibold text-base text-center mt-4'>
Comedy 
    </Text> */}
    
    </View>
    {/* description */}

    <Text className='text-neutral-400 mx-4 tracking-wide mt-4'>
    {
        movie?.overview
    }
    </Text>
</View>

{/* cast  */}
{ cast.length > 0 && <Cast cast={cast} navigation ={navigation}/>}

{/* similar movie */}
{ similarmovies.length > 0 &&<MovieList title="Similar Movies"  data = {similarmovies} hideSeeAll = {true}/>}

    </ScrollView>
  )
}

export default MovieScreen