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




export default function ProfileScene(props) {
  const[isLoading, setIsLoading] = useState(true);
  const[showUserList, setShowUserList] = useState(false);
  const[showFollowing, setShowFollowing] = useState(true);
  const { navigate } = useNavigation();

  const[username, setUsername] = useState("");
  const[followerCount, setFollowerCount] = useState("");
  const[followingCount, setFollowingCount] = useState("");
  const[sex, setSex] = useState("");
  const[profileURL, setProfileURL] = useState("");

  useEffect(() => {
      getUserProfileData()
    }, []);

async function getUserProfileData () {
  try {
    if(!isLoading) {
        return;
    }
    let getProfilePromise = api.getProfileOverView()
    let snapshot = await getProfilePromise;
    setUsername(snapshot.get('username'))
    setSex(snapshot.get('sex'))
    let followerCount = snapshot.get('followerCount')
    let followingCount = snapshot.get('followingCount')

    if (!followerCount) {
      setFollowerCount("Followers _")
    }else {
      setFollowerCount("Followers "+followerCount)
    }
    if(!followingCount) {
      setFollowingCount("Followings _")
    }else {
      setFollowingCount("Followings "+followingCount)
    }
    setProfileURL(snapshot.get('profileMaxUrl'))
  }
  catch (err) {
    console.log("error is "+err)
  }
  setIsLoading(false)
}

function modalCallBack () {
    setShowUserList(false)
}
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
      <View style= {styles.upperView}>
       <View style = {styles.userView}>
          <Image style={sex == "Female" ? styles.imageViewFemale : styles.imageViewMale} source={{uri: profileURL}}/>
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
   <Modal isVisible={showUserList} swipeArea={50} style = {{alignSelf : "center",width : '95%'}} >
      <UserListModal  closeCallBack = {modalCallBack} username = {username} showFollowing = {showFollowing}/>
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
    borderWidth : 2,
    alignSelf : "flex-start",
    marginBottom : 20,

  },
  imageViewFemale : {
    width : 100,
    height : 100,
    borderRadius : 50,
    borderColor : '#e6007b',
    borderWidth : 2,
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
    borderColor  : "purple",
    borderWidth : 1,
  }

});

ProfileScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};
