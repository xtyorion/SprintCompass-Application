import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const TeamListItem = props => {
    const [selected, SetSelected] = useState(false);

    const handleAddItem = () => {
        props.includeUser(props.item.id);
        SetSelected(!selected);
    }
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handleAddItem}>
            <View style={{...styles.listItem, backgroundColor: selected ? "red":"transparent"}} >
                <Text>{props.item.name} / {props.item.email}</Text>
            </View>
        </TouchableOpacity>
    )
}


export default TeamListItem;
