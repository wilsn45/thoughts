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
import * as api from "thoughts/app/services/ProfileServices";
import UserListModal from "./UserListModal";
var Spinner = require('react-native-spinkit');

import { firebase } from '@react-native-firebase/storage';


export default function ProfileScene(props) {
  const[isLoading, setIsLoading] = useState(true);
  const[showUserList, setShowUserList] = useState(false);
  const[showFollowing, setShowFollowing] = useState(true);
  const { navigate } = useNavigation();
  let uid = useNavigationParam('uid');
  const[username, setUsername] = useState("");
  const[followerCount, setFollowerCount] = useState("Followers _");
  const[followingCount, setFollowingCount] = useState("Followings _");
  const[sex, setSex] = useState("");
  const[profileURL, setProfileURL] = useState(null);

  const[status, setStatus] = useState(null);
  const[isPrivate, setIsPrivate] = useState(true);




  useEffect(() => {
    getUserProfileData()
    }, []);

async function getUserProfileData () {
  try {

    console.log("here")
    let response = await api.getUserProfileOverView(uid)
    if(response.youareblocked) {
      setIsLoading(false)
      navigatePop()

    }
    if(response.isFollowing) {
      setStatus("Following")
      setIsPrivate(false)
    }
    else if(response.isRequested) {
      setStatus("Requested")
      setIsPrivate(true)
    }
    else if(response.isPrivate) {
      setStatus("Follow")
      setIsPrivate(true)
    }else {
      setStatus("Follow")
      setIsPrivate(false)
    }

    let username = response.username
    let sex = response.sex
    let followerCount = response.followersCount
    let followingCount = response.followingsCount
    setUsername(username)
    setSex(sex)
    if (followerCount) {
      setFollowerCount("Followers "+followerCount)
    }else {
      setFollowerCount("Followers _")
    }
    if(followingCount) {
      setFollowingCount("Followings "+followingCount)
    }else {
        setFollowingCount("Followings _")
    }
    let profileURl = await api.getMaxProfileUrl(uid)
    setProfileURL(profileURl)
    setIsLoading(false)

  }
  catch (err) {
    console.log("here error is "+err)
  }

}

function modalCloseCallBack () {
    setShowUserList(false)
}

function navigatePop() {
    navigate('Home')
}

async function modalNavigateCallBack (newuid) {
  try {
    setShowUserList(false)
     navigate('Profile',{uid : newuid})
  }catch(err) {
    console.log("err is "+err)
  }
}
//  function updateFlags(newuid) {
//   setUid(newuid)
//    setIsLoading(true)
//    setShowUserList(false)
//    getUserProfileData()
// }

function navigateToFollowerCount() {
  setShowFollowing(false)
  setShowUserList(true)
}

function navigateToFollowingCount() {
  setShowFollowing(true)
  setShowUserList(true)
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
        onPress={() => navigateToAMessages()}
        underlayColor='#fff'
       >
       <Icon name={'settings'}  style = {styles.messageView} size={30} />
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
          underlayColor='#fff'
          >
          <Text style = {styles.followerText}> {followerCount} </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => navigateToFollowingCount()}
          underlayColor='#fff'
          >
            <Text style = {styles.followerText}> {followingCount} </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => navigateToFollowingCount()}
          underlayColor='#fff'
          >
            <Text style = {status == "Follow"? styles.statusTextFollow : styles.statusTextFollowing}> {status} </Text>
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
      <UserListModal  closeCallBack = {modalCloseCallBack} navigateCallBack = {modalNavigateCallBack} uid = {uid} showFollowing = {showFollowing}/>
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
  statusTextFollowing : {
    fontSize: 17,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },
  statusTextFollow : {
    color : "#149cea",
    fontSize: 17,
    fontFamily: "Thonburi",
    fontWeight : "100",
  },

});

ProfileScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
