import React, { useState,useEffect } from 'react';
import { View,
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableOpacity,
        SafeAreaView,
        FlatList,
      TouchableWithoutFeedback } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as api from "thoughts/app/services/ProfileServices";
import UserListModal from "./UserListModal";
var Spinner = require('react-native-spinkit');
import  * as User  from "thoughts/app/User";

export default function ProfileScene(props) {
  const[isLoading, setIsLoading] = useState(true);
  const[showUserList, setShowUserList] = useState(false);
  const[showFollowing, setShowFollowing] = useState(true);
  const { navigate } = useNavigation();
  let uid = useNavigationParam('uid');
  const[username, setUsername] = useState("");
  const[userInfo, setUserInfo] = useState();
  const[followerCount, setFollowerCount] = useState(0);
  const[followingCount, setFollowingCount] = useState(0);
  const[sex, setSex] = useState("");
  const[profileURL, setProfileURL] = useState();


  const[status, setStatus] = useState(null);
  const[isPrivate, setIsPrivate] = useState(true);
  const[buttonStyleCode, setButtonStyleCode] = useState(1);

  const[blocked, setBlocked] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    getUserProfileData()
  }, []);

async function getUserProfileData () {
  try {
    let response = await api.getUserProfileOverView(uid)
    setIsLoading(false)

    if(response.data.youareblocked) {
      navigatePop()
    }
    else if(response.data.isFollowing) {
      setStatus("Following")
      setButtonStyleCode(2)
    }
    else if(response.data.isRequested) {
      setStatus("Requested")
      setButtonStyleCode(3)
    }
    else {
      setStatus("Follow")
      setButtonStyleCode(1)
    }
    if(response.data.youblocked) {
      setBlocked(true)
      setButtonStyleCode(2)
      setStatus("Unblock")
    }
    let _userInfo = {
      followers : response.data.followers,
      followings : response.data.followings
    }
    setUserInfo(_userInfo)

    let _followingsCount = 0
    let _followersCount = 0

    for (item in response.data.followings) {
      _followingsCount++
    }

    for (item in response.data.followers) {
      _followersCount++
    }

    setFollowerCount(_followersCount)
    setFollowingCount(_followingsCount)

    setUsername(response.data.username)
    setSex(response.data.sex)
    setIsPrivate(response.data.isPrivate)

    let profileURl = await api.getProfileURL(uid,true)
    setProfileURL(profileURl)
    setIsLoading(false)

  }
  catch (err) {
    console.log("here error is "+err)
  }

}

async function actionPerform() {
  if(status == "Unblock") {
    let res = await api.unblock(uid)
    if(res.success) {
      setStatus("Follow")
      setButtonStyleCode(1)
      setBlocked(false)
    }
  }
  else if(status == "Following") {
    let res = await api.unfollow(uid)
    if(res.success) {
      setStatus("Follow")
      setButtonStyleCode(1)
    }
  }
  else if(status == "Requested") {
    let res = await api.cancelRequest(uid,User.uid)
    if(res.success) {
      setStatus("Follow")
      setButtonStyleCode(1)
    }
  }
  else if(status == "Follow" && isPrivate) {
    let res = await api.follow(uid,username)
    if(res.success) {
      setStatus("Requested")
      setButtonStyleCode(3)
    }
  }
  else {
    let res = await api.follow(uid,username)
    if(res.success) {
      setStatus("Following")
      setButtonStyleCode(2)
    }
  }
  getUserProfileData()
}

async function blockUnblock() {
  let res = await api.block(uid,username)
  if(res.success) {
    setStatus("Unblock")
    setButtonStyleCode(2)
    setBlocked(true)
    getUserProfileData()
  }
}

function modalCloseCallBack () {
    setShowUserList(false)
}

function navigateBack() {
  navigation.goBack()
}

 function modalNavigateCallBack (navUid) {
  try {
    setShowUserList(false)
    if(navUid == User.uid) {
      navigate('MyProfile')
      return
    }
    navigate( {
      routeName :'Profile',
      params : {uid : navUid},
      key : navUid
    })
  }catch(err) {
    console.log("err is "+err)
  }
}


function showFollowers() {
  setShowFollowing(false)
  setShowUserList(true)
}

function showFollowings() {
  setShowFollowing(true)
  setShowUserList(true)
}

function buttonStyle() {
  if(buttonStyleCode == 1) {
    return {  color : "#149cea",
          fontSize: 17,
          fontFamily: "Thonburi",
          fontWeight : "100",
    }
  }
  else if(buttonStyleCode == 2) {
    return {  color : "grey",
          fontSize: 17,
          fontFamily: "Thonburi",
          fontWeight : "100",
    }
  }
  else  {
    return {
          fontSize: 17,
          fontFamily: "Thonburi",
          fontWeight : "100",
    }
  }
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
        onPress={() => navigateBack()}
        underlayColor='#fff'
       >

        <Icon name={'chevron-left'}  style = {styles.messageView} size={40} />
      </TouchableOpacity>

     { !blocked &&
       <TouchableOpacity
         style = {styles.superViewHeader}
         onPress={() => blockUnblock()}
         underlayColor='#fff'
        >
        <Icon name={'slash'}  style = {styles.messageView} size={30} />
       </TouchableOpacity>
     }



      </View>

      <View style = {styles.centerView}>
      <View style= {styles.upperView}>
       <View style = {styles.userView}>
        <Image style={sex == "female" ? styles.imageViewFemale : styles.imageViewMale} source={{uri: profileURL}}/>
      </View>
       <View style = {styles.userinfoView}>
        <TouchableOpacity
         onPress={() => showFollowers()}
         disabled={followerCount < 1 }
         underlayColor='#fff'
         >
         <Text style = {styles.followerText}> {followerCount > 0 ? "Followers " +followerCount : "Followers" } </Text>
         </TouchableOpacity>

         <TouchableOpacity
         onPress={() => showFollowings()}
         disabled={followingCount < 1 }
         underlayColor='#fff'
         >
           <Text style = {styles.followerText}> {followingCount > 0 ? "Followings " +followingCount : "Followings" } </Text>
        </TouchableOpacity>

          <TouchableOpacity
          onPress={() => actionPerform()}
          underlayColor='#fff'
          >
            <Text style={buttonStyle()}> {status} </Text>
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
      <UserListModal  closeCallBack = {modalCloseCallBack} navigateCallBack = {modalNavigateCallBack} uid = {uid} userInfo = {userInfo} showFollowing = {showFollowing}/>
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
    // borderColor  : "purple",
    // borderWidth : 1,
  },
  optionView : {
    width : 120,
    height : 130,
    marginTop : 40,
    marginRight : 10,
    backgroundColor : "#fff",
    borderColor : "black",
    borderWidth : 1,
    borderRadius : 7,
    position: 'absolute',
    right : -1,
    top : 0,
    justifyContent : 'center'
  },
  optionButtonView : {
    flex : 0.5,
    borderColor : "grey",
    borderBottomWidth : 1,
    alignItems : "center",
    justifyContent : "center"
  },
  optionButtonText : {
    fontSize: 20,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },


});

ProfileScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


// <Modal isVisible={showOptions} swipeArea={50} style = {{alignSelf : "flex-end",width : '25%', height : '10%'}} onBackdropPress={() => setShowOptions(false)} >
