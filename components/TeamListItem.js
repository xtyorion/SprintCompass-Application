import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const TeamListItem = props => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.listItem} >
                <Text>{props.item}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default TeamListItem;
