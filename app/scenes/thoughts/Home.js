import React, { useState } from 'react';
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

import NewThought from "./NewThoughtModal";
import Modal from 'react-native-modal';


export default function Home(props) {

  const [locationViewWidth, setLocationViewWidth] = useState(100);
  const [newThought, showNewThought] = useState(false);
  const { navigate } = useNavigation();

    toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    closeNewThoughtModal = () => {
        showNewThought(false)
    }
    
    
  return (
      
    <View style = {styles.main}>
     <View style = {styles.headerView}>
       <Text style = {styles.userNameText}> Hola! Dani</Text>
        <Icon name= "globe" size={30} color= "grey" style = {{marginRight : 10}} />
      
     </View>


      <View style = {styles.thoughtsView}>

       <View style = {styles.thoughtsListView}>
        
       </View>

        <View style = {styles.newThoughtView}>

          <TouchableOpacity
                 style={ styles.featherView }
                 onPress={() => showNewThought(true)}>
                 <Icon name= "feather" size={50} color= "black" />
               </TouchableOpacity>
        </View>
      
      </View>
        <Modal isVisible={newThought}>
          <NewThought  closeCallBack = {closeNewThoughtModal}/>
        </Modal>
      

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
