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
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as api from "thoughts/app/services/ProfileServices";
import UserListModal from "./UserListModal";
var Spinner = require('react-native-spinkit');

import { firebase } from '@react-native-firebase/storage';


export default function ProfileScene(props) {
  const[isLoading, setIsLoading] = useState(true);
  const[showUserList, setShowUserList] = useState(false);
  const[showOptions, setShowOptions] = useState(false);
  const[showFollowing, setShowFollowing] = useState(true);
  const { navigate } = useNavigation();
  let uid = useNavigationParam('uid');
  const[username, setUsername] = useState("");
  const[followerCount, setFollowerCount] = useState(0);
  const[followingCount, setFollowingCount] = useState(0);
  const[sex, setSex] = useState("");
  const[profileURL, setProfileURL] = useState();
  const[useruid, setUseruid] = useState(useruid);

  const[status, setStatus] = useState(null);
  const[isPrivate, setIsPrivate] = useState(true);
  const[buttonStyleCode, setButtonStyleCode] = useState(1);

  const[blockText, setBlockText] = useState("Block");

  useEffect(() => {
    getUserProfileData()
  }, []);

async function getUserProfileData () {
  try {

    setUseruid(uid)
    let response = await api.getUserProfileOverView(uid)

    if(response.youareblocked) {
      setIsLoading(false)
      navigatePop()
    }
    else if(response.isFollowing) {
      setStatus("Following")
      setButtonStyleCode(2)
    }
    else if(response.isRequested) {
      setStatus("Requested")
      setButtonStyleCode(3)
    }
    else {
      setStatus("Follow")
      setButtonStyleCode(1)
    }
    if(response.youblocked) {
      setBlockText("Unblock")
    }
    let followerCount = response.followersCount
    let followingCount = response.followingsCount
    setUsername(response.username)
    setSex(response.sex)
    setIsPrivate(response.isPrivate)

    if (followerCount) {
      setFollowerCount(followerCount)
    }

    if(followingCount) {
      setFollowingCount(followingCount)
    }
    let profileURl = await api.getMaxProfileUrl(uid)
    setProfileURL(profileURl)
    setIsLoading(false)

  }
  catch (err) {
    console.log("here error is "+err)
  }

}

async function actionPerform() {
  if(status == "Following") {
    let status = await api.unfollow(useruid)
    if(status) {
      setFollowerCount(followerCount-1)
      setStatus("Follow")
      setButtonStyleCode(1)
    }
  }
  else if(status == "Requested") {
    let status = await api.cancelRequest(useruid)
    if(status) {
      setStatus("Follow")
      setButtonStyleCode(1)
    }
  }
  else if(status == "Follow" && isPrivate) {
    let status = await api.follow(useruid,username)
    if(status) {
      setStatus("Requested")
      setButtonStyleCode(3)
    }
  }
  else {
    let status = await api.follow(useruid,username)
    if(status) {
      setFollowerCount(followerCount+1)
      setStatus("Following")
      setButtonStyleCode(2)
    }
  }
}

async function blockUnblock() {
  if (blockText == "Block") {
    let status = await api.block(useruid,username)
    if(status) {
      setFollowerCount(followerCount-1)
      setStatus("Follow")
      setButtonStyleCode(1)
      setBlockText("Unblock")
    }
  }else {
    let status = await api.unblock(useruid)
    if(status) {
      setBlockText("Block")
    }
  }
  setShowOptions(false)
}

function modalCloseCallBack () {
    setShowUserList(false)
}

function navigateToHome() {
    navigate('Home')
}

 function modalNavigateCallBack (newuid) {
  try {
    updateFlags(newuid)
  }catch(err) {
    console.log("err is "+err)
  }
}
 function updateFlags(newuid) {
   uid = newuid
   setIsLoading(true)
   setShowUserList(false)
   getUserProfileData()
}

function navigateToFollowerCount() {
  setShowFollowing(false)
  setShowUserList(true)
}

function navigateToFollowingCount() {
  setShowFollowing(true)
  setShowUserList(true)
}

function openOptions() {
    setShowOptions(true)
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
      <TouchableWithoutFeedback onPress={() => {setShowOptions(false)}} accessible={false}>
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
        onPress={() => openOptions()}
        underlayColor='#fff'
       >
       <Icon name={'menu'}  style = {styles.messageView} size={30} />
      </TouchableOpacity>


      </View>

      <View style = {styles.centerView}>
      <View style= {styles.upperView}>
       <View style = {styles.userView}>
        <Image style={sex == "female" ? styles.imageViewFemale : styles.imageViewMale} source={{uri: profileURL}}/>
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
    </TouchableWithoutFeedback>
   }
   <Modal isVisible={showUserList} swipeArea={50} style = {{alignSelf : "flex-end",width : '65%'}} >
      <UserListModal  closeCallBack = {modalCloseCallBack} navigateCallBack = {modalNavigateCallBack} uid = {useruid} showFollowing = {showFollowing}/>
   </Modal>
   {showOptions &&
     <View style = {styles.optionView}>
              <TouchableOpacity
              onPress={() => hideView()}
              underlayColor='#fff'
              style = {styles.optionButtonView}
              >
                <Text style={styles.optionButtonText}> Hide Posts </Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={() => blockUnblock()}
              underlayColor='#fff'
              style = {styles.optionButtonView}
              >
                <Text style={styles.optionButtonText}> {blockText} </Text>
              </TouchableOpacity>

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
