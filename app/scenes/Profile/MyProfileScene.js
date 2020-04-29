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
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as realm from "thoughts/app/storage/Realm/Realm";
import * as api from "thoughts/app/services/ProfileServices";
import MyUserListModal from "./MyUserListModal";
var Spinner = require('react-native-spinkit');
import PendingListModal  from "./PendingListModal";
import { firebase } from '@react-native-firebase/storage';


export default function MyProfileScene(props) {
  const[isLoading, setIsLoading] = useState(false);
  const[showUserList, setShowUserList] = useState(false);
  const[showFollowing, setShowFollowing] = useState(true);
  const[showPendings, setShowPendings] = useState(false);
  const { navigate } = useNavigation();
  const uid = useNavigationParam('uid');

  const[username, setUsername] = useState("");
  const[followerCount, setFollowerCount] = useState(0);
  const[followingCount, setFollowingCount] = useState(0);
  const[sex, setSex] = useState("");
  const [picData, setPicData] = useState();
  const[token, setToken] = useState("");


  useEffect(() => {
    loadProfile()
    //getUserProfileInfo()
    getUserFoProfileData()
  }, []);

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

async function loadProfile() {
  let followers = await realm.getFollowers()
  let followings = await realm.getFollowings()
  setFollowerCount(followers.length)
  setFollowingCount(followings.length)
  let picData = await userStorage.getUserProfileMinBase64()
  setPicData(picData)
  let username = await userStorage.getUserName()
  let sex = await userStorage.getUserSex()
  setUsername(username)
  setSex(sex)
}

async function getUserProfileInfo () {
  try {

    let picData = await api.getMaxProfileUrl(uid)
    setPicData(picData)

    let getProfilePromise = api.getProfileOverView(uid)
    let snapshot = await getProfilePromise;

    let followerCount = snapshot.get('followersCount')
    let followingCount = snapshot.get('followingsCount')
    if (followerCount) {
      setFollowerCount(followerCount)
    }
    if(followingCount) {
      setFollowingCount(followingCount)
    }
  }
  catch (err) {
    console.log("here error is "+err)
  }
}

async function getUserFoProfileData () {
  try {
    let followingPromise =  api.getUserList(uid,true)
    let flgList = await followingPromise
    realm.updateFollowings(flgList)

    let followerPromise =  api.getUserList(uid,false)
    let flwrList = await followerPromise
    realm.updateFollowers(flwrList)
  }
  catch (err) {
    console.log("here error is "+err)
  }
  setIsLoading(false)
}



function modalCloseCallBack () {
    setShowUserList(false)
}

function navigateToSettings() {
   navigate('Settings',{uid : uid})
}


function navigateToHome() {
    navigate('Home')
}

async function modalNavigateCallBack (uid) {
   setShowUserList(false)
   navigate('Profile',{uid : uid})
}

function navigateToFollowerCount() {
  setShowFollowing(false)
  setShowUserList(true)
}

function navigateToFollowingCount() {
  setShowFollowing(true)
  setShowUserList(true)
}

function showPendingRequets() {
  setShowPendings(true)
}

function closePendingRequets() {
  setShowPendings(false)
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
        onPress={() => navigateToHome()}
        underlayColor='#fff'
       >

        <Icon name={'chevron-left'}  style = {styles.messageView} size={40} />
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.superViewHeader}
        onPress={() => navigateToSettings()}
        underlayColor='#fff'
       >
       <Icon name={'settings'}  style = {styles.messageView} size={30} />
      </TouchableOpacity>


      </View>

      <View style = {styles.centerView}>
      <View style= {styles.upperView}>
       <View style = {styles.userView}>
        <Image style={sex == "Female" ? styles.imageViewFemale : styles.imageViewMale} source={{uri: picData}}/>
      </View>
       <View style = {styles.userinfoView}>
          <TouchableOpacity
          onPress={() => navigateToFollowerCount()}
          disabled={followerCount < 1 }
          underlayColor='#fff'
          >
            <Text style = {styles.followerText}> {followerCount > 0 ? "Followers " +followerCount : "Followers" } </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => navigateToFollowingCount()}
          disabled={followingCount < 1 }
          underlayColor='#fff'
          >
            <Text style = {styles.followerText}> {followingCount > 0 ? "Followings " +followingCount : "Followings" } </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => showPendingRequets()}
            disabled={followingCount < 1 }
            underlayColor='#fff'
            >
              <Text style = {styles.followerText}> Pending Requests </Text>
              </TouchableOpacity>
       </View>
       </View>
       <View>
        <Text style = {styles.userNameText}> {username}</Text>
       </View>



      </View>

      <View style={styles.thoughtsView}>
      </View>

    </View>
   }
   <Modal isVisible={showUserList} swipeArea={50} style = {{alignSelf : "flex-end",width : '65%'}} >
      <MyUserListModal  closeCallBack = {modalCloseCallBack} navigateCallBack = {modalNavigateCallBack} uid = {uid} showFollowing = {showFollowing}/>
   </Modal>

   <Modal isVisible={showPendings} swipeArea={50} style = {{alignSelf : "center",width : '85%'}} >
     <PendingListModal  closeCallBackBlock = {closePendingRequets} uid ={uid} />
  </Modal>
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
    flex : 0.07,
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
    flex : 0.2,
    width : '100%',

    // borderColor : "#149cea",
    // borderWidth : 2,
  },
  upperView : {
      width : '100%',
      flexDirection : 'row',
      // borderColor : "#149cea",
      // borderWidth : 2,
  },
  userView : {
    width : '40%',
    alignItems : "center",
    justifyContent : "center",
    marginLeft : 40
    // borderColor : "#149cea",
    // borderWidth : 2,
  },
  userinfoView : {
    width : '55%',
    justifyContent : "center",
    // borderColor : "#149cea",
    // borderWidth : 2,
  },
  imageViewMale : {
    width : 100,
    height : 100,
    borderRadius : 50,
    borderColor : "#149cea",
    borderWidth : 3,
    alignSelf : "flex-start",
    marginBottom : 20,

  },
  imageViewFemale : {
    width : 100,
    height : 100,
    borderRadius : 50,
    borderColor : '#e6007b',
    borderWidth : 3,
    marginBottom : 20,
  },
  userNameText : {
    fontSize: 23,
    fontFamily: "Thonburi",
    fontWeight : "400",
    marginBottom : 5,
    marginLeft : 25
  },
  followerText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
    marginBottom : 15,
  },
  thoughtsView : {
    flex : 0.81,
    width : '100%',
  }

});

MyProfileScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
