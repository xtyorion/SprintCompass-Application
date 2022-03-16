import React from 'react';
import { Text, View } from 'react-native';
import {styles} from '../styles/styles';

const CardsComponent = ({data}) => {
    return (
      <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
        <Text>{data.text}</Text>
      </View>
    )
}

export default CardsComponent;