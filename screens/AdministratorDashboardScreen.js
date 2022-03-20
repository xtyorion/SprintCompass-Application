import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {styles} from '../styles/styles';
import Background from '../components/Background';
import Dine from '../components'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const AdministratorDashboardScreen = () => {
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  return (
    <Background>
      <View style={{flexDirection: 'column', height:'100%', width: 430}}>
        <View style={{flexDirection: 'row',}}>
          <View style={styles.admin_modules}>
              <TouchableOpacity style={{
                marginStart: 10,
                height:100, 
                padding: 10,
                borderRadius: 1,
                shadowColor: "#000",
                elevation: 1,}}>
                <FontAwesome5 name="users" color={'#826cff'} size={50} style={{marginTop: 10}}/>
                <Text style={{right: 0, position: 'absolute', marginTop: 30, marginEnd: 30, fontSize: 25}}>Users</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.admin_modules}>
          <TouchableOpacity style={{
                marginStart: 10,
                height:100, 
                padding: 10,
                borderRadius: 1,
                shadowColor: "#000",
                elevation: 1,}}>
                <Dine/>
                <Text>Activities</Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
        </View>
      </View>
    </Background>
  );
}

export default AdministratorDashboardScreen;