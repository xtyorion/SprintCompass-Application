import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationsScreen from './ConversationsScreen';
import ConversationDetails from './ConversationDetails';

const MessengerStack = createNativeStackNavigator();

const MessengerStackScreen = () => {
  return (
    <MessengerStack.Navigator  
      screenOptions={{
      headerShown: false,}}
      >
      <MessengerStack.Screen name="Conversations" component={ConversationsScreen} />
      <MessengerStack.Screen name="ConversationDetails" component={ConversationDetails} />
    </MessengerStack.Navigator>
  );
}

export default MessengerStackScreen;