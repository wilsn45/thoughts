import React, { useState } from 'react';
import {View,
    StyleSheet,
    Text,
    TouchableOpacity} from 'react-native';

import * as api from "thoughts/app/services/UserGetInServices";
import { useAuth } from "thoughts/app/provider";


export default function Talk() {
    
    return (

        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
           <Text> Talk </Text>
        </View>
    );
};

const styles = StyleSheet.create({ 

    
});

Talk.navigationOptions = ({}) => {
    return {
        title: ``
    }
};