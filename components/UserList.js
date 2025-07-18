import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { fetchUsers } from '../redux/userSlice';

const UserList = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.users);
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, [dispatch]);
  
    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>Error: {error}</Text>;
  
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View  className='flex-1 justify-center items-center bg-neutral-400'>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    );
}

  

export default UserList;