import React from 'react';
import { Text, View } from 'react-native';
import {styles} from '../styles/styles';

const CardsComponent = ({data}) => {
    return (
      <View style={[styles.card, { backgroundColor: 'green' }]}>
        <Text>{data.name}</Text>
      </View>
    )
}

export default CardsComponent;