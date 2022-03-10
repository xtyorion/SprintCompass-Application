import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
// May need to run npm install --save this dependency... try building first!
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} color={Platform.OS === 'android' ? 'white' : 'blue'} />
}

export default CustomHeaderButton;