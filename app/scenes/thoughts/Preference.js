import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TouchableOpacity} from 'react-native';

import * as api from "../../services/auth";
import { useAuth } from "../../provider";


export default function Preference() {
    
    return (

        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
           <Text> Home </Text>
        </View>
    );
};

const styles = StyleSheet.create({ 

    
});

Preference.navigationOptions = ({}) => {
    return {
        title: ``
    }
};