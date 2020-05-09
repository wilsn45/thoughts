import React, { useState,useEffect } from 'react';
import { View,
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableOpacity,
        SafeAreaView,
        FlatList,
        KeyboardAvoidingView,
      TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import * as userStorage from "thoughts/app/storage/Local/UserStorage";
import * as api from "thoughts/app/services/ProfileServices";
import  * as User  from "thoughts/app/User";



let DATA = [
{
  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  title: 'First Item',
},
{
  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  title: 'Second Item',
},
{
  id: '58694a0f-3da1-471f-bd96-145571e29d72',
  title: 'Third Item',
},
{
  id: '5839440f-3da1-471f-bd96-145571e29d72',
  title: 'Forth Item',
},
{
  id: '58394a0f-3da1-471f-bd96-145571e29d72',
  title: 'Fifth Item',
},
{
  id: '5842594a0f-3da1-471f-bd96-145571e29d72',
  title: 'Sixth Item',
},
{
  id: '7842594a0f-3da1-471f-bd96-145571e29d72',
  title: 'Seventh Item',
},
{
  id: '8842594a0f-3da1-471f-bd96-145571e29d72',
  title: 'Eight Item',
},
{
  id: '9842594a0f-3da1-471f-bd96-145571e29d72',
  title: 'Ninth Item',
},
{
  id: '1042594a0f-3da1-471f-bd96-145571e29d72',
  title: 'Tenth Item',
},

];

function Item({ title }) {
return (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
}


export default function ChatScene(props) {
  let id =0
  let flatList
  const { navigate } = useNavigation();
  const[messages, addMessage] = useState([])
  let uid = useNavigationParam('uid');

  useEffect(() => {
    addNewMessage()
  }, []);

  function navigateToProfile() {
  navigate('conversationList')
  }

  function addNewMessage() {
    id = id+1
    let me = {
      id : id,
      Text : "Me"
    }
    id = id+1
    let you = {
      id : id,
      Text : "You"
    }
    addMessage(
      [... messages, me]
    )
    addMessage(
      [... messages, you]
    )

  }



return (
  <KeyboardAvoidingView
      style={styles.main}
      behavior="padding"
    >
  <View style = {styles.headerView}>

  <TouchableOpacity
    style = {styles.backButtonView}
    onPress={() => navigateToProfile()}
    underlayColor='#fff'
   >

    <Icon name={'chevron-left'}  style = {styles.messageView} size={40} />
  </TouchableOpacity>

  </View>

  <View style = {styles.chatView}>
    <FlatList
      data={messages}
      renderItem={({ item }) => <Item title={item.Text} />}
      keyExtractor={item => item.id}
      ref={ref => flatList = ref}
      onContentSizeChange={() => flatList.scrollToEnd({animated: true})}
      onLayout={() => flatList.scrollToEnd({animated: true})}
    />
  </View>

  <View style = {styles.sendView}>
    <TextInput style = {{flex : 0.8, height : 50, marginLeft : 20}}
      placeholder = "Send"/>
      <TouchableOpacity style = {{flex : 0.2, height : 50}}
      onPress={() => addNewMessage()}
      >
       <Icon name={'send'}  style = {styles.messageView} size={40} />
      </TouchableOpacity>

  </View>

</KeyboardAvoidingView>

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
    flex : 0.07,
    width : '100%',
    marginTop : 40,
    justifyContent : "space-between",
    flexDirection : "row",
  },
  backButtonView : {
    width : 50,
    height : 50,
  },
  chatView : {
    flex : 0.86,
    width : '100%',
    // borderColor : "#149cea",
    // borderWidth : 2,
    alignItems : "center"
  },
  sendView : {
    marginTop: 5,
    flex : 0.07,
    width : '100%',
    borderColor : "#149cea",
    borderWidth : 2,
    alignItems : "center",
    // borderColor : "black",
    // borderBottomWidth : 1,
    flexDirection : "row"
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

});

ChatScene.navigationOptions = ({}) => {
  return {
    title: ``
  }
};


// <Modal isVisible={showOptions} swipeArea={50} style = {{alignSelf : "flex-end",width : '25%', height : '10%'}} onBackdropPress={() => setShowOptions(false)} >
