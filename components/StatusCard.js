import React from 'react';
import { Text, View } from 'react-native';
import {styles} from '../styles/styles';

const StatusCard = ({text}) => {
    return (
      <View>
        <Text style={styles.cardsText}>{text}</Text>
      </View>
    )
}

export default StatusCard;