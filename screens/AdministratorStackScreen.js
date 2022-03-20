import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdministratorDashboardScreen from './AdministratorDashboardScreen';
import AdministratorUsersScreen from './AdministratorUsersScreen';
import AdministratorActivitiesScreen from './AdministratorActivitiesScreen';

const AdministratorStack = createNativeStackNavigator();

const AdministratorStackScreen = () => {
  return (
    <AdministratorStack.Navigator  
      screenOptions={{
      headerShown: false,}}
      initialRouteName="AdministratorDashboardScreen"
      >
      <AdministratorStack.Screen name="AdministratorDashboardScreen" component={AdministratorDashboardScreen} />
      <AdministratorStack.Screen name="AdministratorUsersScreen" component={AdministratorUsersScreen} />
      <AdministratorStack.Screen name="AdministratorActivitiesScreen" component={AdministratorActivitiesScreen} />
    </AdministratorStack.Navigator>
  );
}

export default AdministratorStackScreen;