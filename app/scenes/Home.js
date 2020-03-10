import React, { useState } from 'react';
import { View, 
        StyleSheet,
        Text,
        Image,
        TextInput,
        TouchableHighlight,
        FlatList } from 'react-native';
import DrawerNavigator from "../routes/DrawerNavigator";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useNavigationParam} from 'react-navigation-hooks'
import {CuisineList} from '../storage/data/CuisineList';
import CuisineListView from '../components/CuisineListView';

const profileImage  = require("../assets/icons/profilePicPlaceholder.png")

export default function Home() {

  const [locationViewWidth, setLocationViewWidth] = useState(100);
  const { navigate } = useNavigation();

    toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    _onLocationTextChanged = (text) => {
          let width = text.length * 7.5 + 30;
          if (width < 100) {
            width = 100
          }
          if (width > 300) {
            width = 300
          }
          setLocationViewWidth (width)
    }
    
  return (
      
    <View style>
     <View style = {styles.headerView}>
       <Text style = {styles.userNameText}>  Hey! Dani</Text>
       <Image source={profileImage}  style={styles.profilePicImage}/>
     </View>

      <View style = {styles.searchView}>
       <View style = {styles.searchResturantView}>
        <Icon name= "coffee" size={25} color= "black" style = {{marginTop: 3, marginLeft : 5}} />
        <TextInput
                 style = {{marginLeft: 5, width : "90%"}}
                 placeholder= "Search for restaurant or food"
                 placeholderTextColor = "grey"
                 //onChangeText={(value) => updateValueCallback(value)} 
                 />
       </View>

       <View style = {[styles.searchLocationView, { width : locationViewWidth }]}>
        <Icon name= "map-pin" size={20} color= "black" style = {{marginTop: 5, marginLeft : 5}} />
        <TextInput
                 style = {{marginLeft: 5, width : "90%"}}
                 placeholder= "Near me"
                 placeholderTextColor = "grey"
                 onChangeText={(value) => _onLocationTextChanged(value)} 
                 />
       </View>
      </View>

      <View style = {styles.cuisineView}>
       <Text style = {styles.cuisineText}> mood be like... </Text>

        <FlatList  style = {styles.cuisineView}
          data={CuisineList}
          horizontal = {true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CuisineListView name={item.name} image = {item.image} />}
        keyExtractor={item => item.name}
      />
      </View>

    </View>
    );
}

const styles = StyleSheet.create({
  headerView : {
    marginTop : 70,
    flexDirection : "row",
    //borderWidth : 2,
    borderColor : "grey",
    justifyContent: 'space-between',
    marginLeft : 20,
    marginRight : 20
  },
  userNameText : {
    fontSize : 25,
    fontWeight: 'bold'
  },
  profilePicImage : {
    width : 40,
    height : 40,
    borderRadius: 20
  },
  searchView : {
    marginTop : 20,
  },
  searchResturantView : {
    width : 300,
    height : 35,
    flexDirection : "row",
    marginLeft : 20,
    marginRight : 20,
    borderWidth : 1,
    borderRadius : 15,
    borderColor : "grey",
  },
  searchLocationView : {
    marginTop : 10,
    height : 35,
    flexDirection : "row",
    marginLeft : 20,
    marginRight : 20,
    borderWidth : 1,
    borderRadius : 15,
    borderColor : "grey",
  },
  cuisineView : {
    marginTop : 20,
    margin : 10,
    height : 170,
  },
  cuisineText : {
    fontSize : 20,
    fontWeight: 'bold'
  }

  });
