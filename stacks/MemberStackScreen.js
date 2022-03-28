import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamListScreen from '../screens/TeamListScreen';

const TeamStack = createNativeStackNavigator();

const TeamStackScreen = () => {
  return (
    <TeamStack.Navigator  
      screenOptions={{
      headerShown: false,}}
      initialRouteName="TeamListScreen"
      >
      <TeamStack.Screen name="TeamListScreen" component={TeamListScreen} />
    </TeamStack.Navigator>
  );
}

export default TeamStackScreen;