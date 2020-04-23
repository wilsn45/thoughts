import React, { useState,useEffect } from 'react';
import {View,
        Image,
        StyleSheet,
        TouchableOpacity,
        Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
var Spinner = require('react-native-spinkit');

export default function UserList ({closeCallBack,username,showFollowing=true}) {
  const[isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(username)
    console.log(showFollowing)
  });

return (

  <View style = {styles.main}>
  <TouchableOpacity
           style = {{marginLeft : 10,marginTop : 10}}
           onPress={() => closeCallBack()}>
           <Icon name={"x"}  size={32}  color={"gray"} style = {{marginTop : 10}}  />
      </TouchableOpacity>

  </View>
   );
};


const styles = StyleSheet.create({
    main : {
        flex : 0.95,
        width: '100%',
        backgroundColor : "purple",
        alignSelf : "center",
        borderRadius : 25,
    },



});
