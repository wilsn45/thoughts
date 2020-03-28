import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TouchableOpacity} from 'react-native';

import * as api from "../../services/auth";
import { useAuth } from "../../provider";




export default function Me(props) {
      const {navigation} = props;
     const {navigate} = navigation;


    async function onClick() {
      navigate('Talk');
    }
    
    return (

        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
           <Text> Chat List </Text>

           <TouchableOpacity
                
                 onPress={() => onClick()}>
                
                <Text>Talk</Text>
               </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({ 

    
});

Me.navigationOptions = ({}) => {
    return {
        title: ``
    }
};