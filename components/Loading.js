import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

var {width , height} = Dimensions.get('window');

const Loading = () => {
  return (
    <View style={{height: height , width: width}} className='absolute flex-grow justify-center items-center'>
     <Progress.CircleSnail thickness={12} size={160} color="yellow" />
    </View>
  )
}

export default Loading