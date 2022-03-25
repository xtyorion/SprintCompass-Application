import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ConversationsScreen from '../screens/ConversationsScreen';
import ConversationDetails from '../screens/ConversationDetails';
import GuestHomeScreen from '../screens/GuestHomeScreen';
// import MessengerStackScreen from '../stacks/UserHomeStackScreen';
import UserHomeNavigatorScreen from './UserHomeNavigatorScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                }}

            >
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: '',
                    }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: '',
                    }}
                />
                <Stack.Screen
                    name="SignupScreen"
                    component={SignupScreen}
                    options={{
                        title: '',
                    }}
                />
                {/* <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                        title: '',
                    }}
                />
                <Stack.Screen
                    name="ConversationDetails"
                    component={ConversationDetails}
                    options={{
                        title: '',
                    }}
                />
                <Stack.Screen
                    name="ConversationsScreen"
                    component={ConversationsScreen}
                    options={{
                        title: '',
                    }}
                /> */}
                <Stack.Screen
                    name="GuestHomeScreen"
                    component={GuestHomeScreen}
                    options={{
                        title: '',
                    }}
                />
                {/* <Stack.Screen
                    name="TimeListScreen"
                    component={TimeListScreen}
                    options={{
                        title: '',
                    }}
                /> */}
                {/* <Stack.Screen
                    name="MessengerStackScreen"
                    component={MessengerStackScreen}
                    options={{
                        title: '',
                    }}
                /> */}
                <Stack.Screen
                    name="UserHomeNavigatorScreen"
                    component={UserHomeNavigatorScreen}
                    options={{
                        title: '',
                    }}
                />
                {/* <Stack.Screen
                    name="UserHomeScreen"
                    component={UserHomeScreen}
                    options={{
                        title: '',
                    }}
                />  */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
