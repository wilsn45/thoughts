import React, { useState,useEffect } from 'react';
import { View,
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableOpacity,
        SafeAreaView,
        FlatList } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as api from "thoughts/app/services/ProfileServices";
var Spinner = require('react-native-spinkit');



export default function ProfileScene(props) {
  const[isLoading, setIsLoading] = useState(true);
  const { navigate } = useNavigation();

    useEffect(() => {
      getUserProfileData()
    });

async function getUserProfileData () {
  if(!isLoading) {
      return;
  }
  await api.getProfileOverView()
  .then(response => {
     console.log("response is "+JSON.stringify(response))
     setIsLoading(false)
  })
  .catch(err => {
    console.log("Error is "+err)
    setIsLoading(false)
  })
}

  return (

    <View style = {styles.main}>
    {
      isLoading &&
      <Spinner  isVisible={true} size={50} type="Arc" color="#189afd"/>
    }
    { !isLoading &&
    <View style = {styles.superView}>
      <View style = {styles.headerView}>

      <TouchableOpacity
        style = {styles.superViewHeader}
        onPress={() => navigateToProfile()}
        underlayColor='#fff'
       >

        <Icon name={'chevron-left'}  style = {styles.messageView} size={40} />
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewHeader}
        onPress={() => navigateToAMessages()}
        underlayColor='#fff'
       >
       <Icon name={'settings'}  style = {styles.messageView} size={30} />
      </TouchableOpacity>


      </View>

      <View style = {styles.centerView}>

      </View>

      <View style={styles.thoughtsView}>
      </View>

    </View>
  }
    </View>
    );
}

const styles = StyleSheet.create({

  main : {
      flex : 1,
      alignItems : "center",
      justifyContent : "center",
      backgroundColor : "#fff",
  },
  superView : {
      flex : 1,
      width : '100%',
  },
  headerView : {
    flex : 0.1,
    width : '100%',
    marginTop : 40,
    justifyContent : "space-between",
    flexDirection : "row",
  },
  superViewHeader : {
    width : 50,
    height : 50,
  },
  centerView : {
    flex : 0.3,
    width : '100%',
    borderColor  : "purple",
    borderWidth : 1,
  },
  thoughtsView : {
    flex : 0.6,
    width : '100%',
    borderColor  : "purple",
    borderWidth : 1,
  }

});

ProfileScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
