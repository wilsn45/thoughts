import React, { useState,useEffect } from 'react';
import { View, 
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableOpacity,
        FlatList } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import NewThought from "./NewThoughtModal";
import Modal from 'react-native-modal';
import * as fileHelper from "thoughts/app/helper/FileHelper";

export default function Home(props) {
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
      console.log("home data is "+ picData)
    })
    .catch(err => {
      console.log("error is " +err)
    })
    

  });

  return (
      
    <View style = {styles.main}>
       { picData && 

      <Image style={{width: 100, height: 50, borderWidth: 1}} source={{uri: picData}}/> 
       }
     

    </View>
    );
}

const styles = StyleSheet.create({

  main : {
        flex : 1,
  },
  headerView : {
    marginTop : 50,
    flex : 0.05,
    flexDirection : "row",
    justifyContent: 'space-between',
    marginLeft : 20,
    marginRight : 20,
  },
  userNameText : {
    fontSize : 25,
    fontWeight: 'bold'
  },
  thoughtsView : {
    marginTop : 10,
    flex : 0.95,
    marginBottom : 5,
    width : '90%',
    borderColor : "purple",
    borderWidth : 0,
    alignSelf: "center",
    flexDirection : "column-reverse",
  },
  thoughtsListView : {
    width : '100%',
    height : '100%',
  },

  newThoughtView : {
    height : 90,
    width : 90,
    position : 'absolute',
    alignSelf: "flex-end",
  },

  featherView : {
    width : 80,
    height : 80,
    backgroundColor : "#fff",
    borderRadius : 40,
    borderColor : "grey",
    borderWidth : 1.5,
    alignItems : "center",
    justifyContent : "center"
  }
  

  

  });
