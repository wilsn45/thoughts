import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TouchableOpacity} from 'react-native';

import * as api from "../../services/auth";
import { useAuth } from "../../provider";




export default function Home(props) {
      const {navigation} = props;
     const {navigate} = navigation;


    async function onClickChatList() {
      navigate('ChatList');
    }

    async function onClickPreference() {
      navigate('ChatList');
    }

    async function onClickNewThought() {
      navigate('ChatList');
    }
    
    return (

        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
           <Text> Home </Text>

           <TouchableOpacity
                onPress={() => onClickChatList()}>
                <Text>Chat List</Text>
               </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onClickPreference()}>
                <Text>Preference</Text>
               </TouchableOpacity>

            <TouchableOpacity
                onPress={() => onClickNewThought()}>
                <Text>New Thought</Text>
               </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({ 

    
});

Home.navigationOptions = ({}) => {
    return {
        title: ``
    }
};