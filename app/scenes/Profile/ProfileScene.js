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



export default function ProfileScene(props) {
  const [locationViewWidth, setLocationViewWidth] = useState(100);
  const [newThought, showNewThought] = useState(false);
  const [picData, setPicData] = useState(null);
  const { navigate } = useNavigation();

    toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    closeNewThoughtModal = () => {
        showNewThought(false)
    }

  useEffect(() => {

    userStorage.getUserProfileMinBase64()
    .then(data => {
      setPicData(data)
    })
    .catch(err => {
      console.log("error is " +err)
    })


  });

  return (

    <View style = {styles.main}>
      <View style = {styles.topView}>


      </View>

      <View style = {styles.thoughtsView}>

      </View>


      <View style={styles.bottomView}>
      </View>


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

});

ProfileScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
