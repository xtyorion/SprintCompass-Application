import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoardNavigator from '../navigation/BoardNavigator';
import SubtasksScreen from '../screens/SubtasksScreen';
// import TaskDetailScreen from '../screens/TaskDetailScreen';
import TaskNavigator from '../navigation/TaskNavigator';

const BoardStack = createNativeStackNavigator();

const BoardStackScreen = (props) => {
  return (
    <BoardStack.Navigator  
      screenOptions={{
      headerShown: false,}}
      initialRouteName="BoardNavigator"
      >
      <BoardStack.Screen name="BoardNavigator" component={BoardNavigator} />
      <BoardStack.Screen name="TaskNavigator" 
      children={()=><TaskNavigator boardHeaderView={props.boardHeaderView}  {...props} />}/>
      <BoardStack.Screen name="SubtasksScreen" component={SubtasksScreen} />
    </BoardStack.Navigator>
  );
}

export default BoardStackScreen;