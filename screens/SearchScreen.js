import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading';
import axios from 'axios';
import { useDebounce } from '../hooks/useDebounce';
import { debounce } from 'lodash'
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios? '': ' mt-15';
const api = 'https://dummyjson.com/users';

const SearchScreen = () => {

  const navigation = useNavigation();
  const [inputVal, setInputVal] = useState('')
  // const debouncedValue = useDebounce(inputVal, 1000); // 500ms delay
  const [results, setResults] = useState([]);
  const [userdata, setUserdata] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  let movieName = "Ant man and the wasp : Quantumainia";

  const handelSearch = value => {
    console.log(value);
    if(value && value.length > 2){
      setLoading(true);
      searchMovies({
        query : value,
        include_adlut : 'false',
        langauge: 'en-US',
        page: '1'
      }).then(data => {
        setLoading(false);
        if(data && data.results) setResults(data.results);
      }) 
    }else{
      setLoading(false);
      setResults([])
    }
  }

  const handelTextDebounce = useCallback(debounce(handelSearch , 400) ,[])

  // useEffect(() => {
  //   inputRef.current?.focus();
  //   fetchUsers();
  // }, [debouncedValue])


  // const fetchUsers = async () => {
  //   if (debouncedValue) {
  //     try {
  //       const response = await axios.get(api);
  //       console.log(response.data.users[0]);

  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   }

  // }

  return (
    <SafeAreaView className={'bg-neutral-800 flex-1'+topMargin}>
      <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
        <TextInput ref={inputRef} placeholder='Search Movie'
          placeholderTextColor={'lightgray'}
          onChangeText={handelTextDebounce}
          className='pd-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className='rounded-full p-3 m-1 bg-neutral-500'
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>

      </View>
      {/* result */}
      {
        loading ? (
          <Loading />
        ) : results.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            className='space-y-3'
          >

            <Text className='text-white font-semibold ml-1'> Result ({results.length})</Text>

            <View className='flex-row justify-between flex-wrap'>
              {
                results.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push("Movie", item)}
                    >
                      <View className='space-y-2 mb-4'>
                        <Image className='rounded-3xl'
                          // source={require('../assets/images/image2.jpg')}
                          source = {{uri : image185(item.poster_path)|| fallbackMoviePoster}}

                          style={{ width: width * 0.44, height: height * 0.3 }}
                        />
                        <Text className='text-neutral-300 ml-1'>{movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })
              }

            </View>
          </ScrollView>
        ) : (
          <View className='flex-row justify-center'>
            <Image source={require('../assets/images/movieTime.webp')}
              style={{ width: width, height: height * 0.35 }} />

          </View>
        )
      }

    </SafeAreaView>
  )
}

export default SearchScreen