import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TouchableOpacity} from 'react-native';

import * as api from ".././services/user";
import { useAuth } from "../../provider";


export default function NewThought() {
    
    return (

        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
           <Text> New Thought </Text>
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