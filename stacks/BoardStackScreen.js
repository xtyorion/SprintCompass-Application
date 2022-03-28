import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoardScreen from '../screens/BoardScreen';
import SubtasksScreen from '../screens/SubtasksScreen';

const BoardStack = createNativeStackNavigator();

const BoardStackScreen = () => {
  return (
    <BoardStack.Navigator  
      screenOptions={{
      headerShown: false,}}
      initialRouteName="BoardScreen"
      >
      <BoardStack.Screen name="BoardScreen" component={BoardScreen} />
      <BoardStack.Screen name="SubtasksScreen" component={SubtasksScreen} />
    </BoardStack.Navigator>
  );
}

export default BoardStackScreen;