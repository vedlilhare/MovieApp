import { View, Text, StatusBar, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import  {Bars3CenterLeftIcon, MagnifyingGlassIcon}  from 'react-native-heroicons/outline'
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomigMovies } from '../api/moviedb';
import UserList from '../components/UserList';

const ios = Platform.OS == 'ios';

const HomeScreen = () => {

  const [trending ,setTrending] = useState([]);
  const [upcoming ,setUpcoming] = useState([]);
  const [toprated ,setToprated] = useState([]);
  const [loading , setLoading] = useState(true);
  const navigation = useNavigation();

 useEffect (()=>{
getTrendingMovies();
getUpcomingMovies();
getTopratedMovies();
 },[])


 const getTrendingMovies = async () => {
  const data = await fetchTrendingMovies();
  // console.log('got trending movies' , data);
  if(data && data.results) setTrending(data.results);
  setLoading(false)
 }
 const getUpcomingMovies = async () => {
  const data = await fetchUpcomigMovies();
  console.log('got Upcoming movies' , data);
  if(data && data.results) setUpcoming(data.results);
 }

 const getTopratedMovies = async () => {
  const data = await fetchTopRatedMovies();
  console.log('got Toprated movies' , data);
  if(data && data.results) setToprated(data.results);
 }


  return (
   
    <View className='flex-1 bg-neutral-800'> 
     {/* Search bar and logo */}
     <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
<StatusBar style="light"/>
<View className='flex-row justify-between items-center mx-4'>

<Bars3CenterLeftIcon color="white" size='30' strokeWidth={2}/>
<Text className='text-white text-3xl font-bold'><Text className='text-yellow-300'>M</Text>ovies</Text>
<TouchableOpacity onPress={() => navigation.navigate('Search')}>
    <MagnifyingGlassIcon color='white' size={30} strokeWidth={2}/>
</TouchableOpacity>
</View> 
     </SafeAreaView>

     {
      loading ? (
<Loading/>
      ):(
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>
{/* Trending movies carousel */}
{trending.length > 0 && <TrendingMovies  data = {trending}/>}

{/* upcoming movies row */}
<MovieList title = 'Upcoming' data = {upcoming}/>

{/* toprated movies row */}
<MovieList title = 'Top rated' data = {toprated}/>
     </ScrollView>
      ) 
     }

     {/* Dummy user List with redux toolkit and thunk example */}

     {/* <UserList/> */}
     
    </View>
   
  )
}

export default HomeScreen