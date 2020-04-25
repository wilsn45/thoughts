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
import NewThought from "./NewThoughtModal";
import Modal from 'react-native-modal';


export default function HomeScene(props) {
  const [locationViewWidth, setLocationViewWidth] = useState(100);
  const [newThought, showNewThought] = useState(false);
  const [picData, setPicData] = useState(null);
  const [uid, setUID] = useState(null);
  const { navigate } = useNavigation();

    toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    closeNewThoughtModal = () => {
        showNewThought(false)
    }

  useEffect(() => {
    getUID()
    userStorage.getUserProfileMinBase64()
    .then(data => {
      setPicData(data)
    })
    .catch(err => {
      console.log("error is " +err)
    })
  },[]);

  async function getUID() {
    let uid = await userStorage.getUserToken()
    setUID(uid)
  }

  async function navigateToProfile() {
    navigate('MyProfile', {uid : uid})
  }

  return (

    <View style = {styles.main}>
      <View style = {styles.headerView}>
      <TouchableOpacity
        style = {styles.superViewHeader}
        onPress={() => navigateToProfile()}
        underlayColor='#fff'
       >

       {picData && <Image style={styles.profileView} source={{uri: picData}}/>}
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewHeader}
        onPress={() => navigateToAMessages()}
        underlayColor='#fff'
       >
       <Icon name={'message-square'}  style = {styles.messageView} size={40} />
      </TouchableOpacity>


      </View>

      <View style = {styles.centerView}>

      </View>


      <View style={styles.bottomView}>

      <TouchableOpacity
        style = {styles.superViewBottom}
        onPress={() => navigateToProfile()}
        underlayColor='#fff'
       >
        <Icon name={'slack'}  style = {styles.slackView} size={50} />
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewBottom}
        onPress={() => navigateToProfile()}
        underlayColor='#fff'
       >
        <Icon name={'circle'}  style = {styles.thoughtsView} size={80} />
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewBottom}
        onPress={() => navigateToAMessages()}
        underlayColor='#fff'
       >
       <Icon name={'zap'}  style = {styles.zapView} size={50} />
      </TouchableOpacity>

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
  headerView : {
    flex : 0.15,
    width : '100%',
    marginTop : 40,
    justifyContent : "space-between",
    flexDirection : "row"
  },
  centerView : {
    flex : 0.8,
    width : '100%',
    // borderColor  : "purple",
    // borderWidth : 1,
  },
  bottomView : {
    flex : 0.1,
    width : '100%',
    marginBottom : 10,
    justifyContent : "space-around",
    flexDirection : "row"
  },
  superViewHeader : {
    marginLeft : 10,
    marginRight : 20,
    width : 50,
    height : 50,
  },
  profileView : {
      width : 50,
      height : 50,
      borderRadius : 25,
      alignSelf : "flex-start"
  },
  messageView : {
      alignSelf : "flex-end"
  },
  superViewBottom : {
    width : 80,
    height : 80,

    // borderColor  : "purple",
    // borderWidth : 1,
  },
  slackView : {
      alignSelf : "flex-start"
  },
  thoughtsView : {
      alignSelf : "center"
  },
  zapView : {
      alignSelf : "flex-end"
  }

});

HomeScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
