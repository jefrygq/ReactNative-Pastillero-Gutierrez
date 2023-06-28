import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMedsScreen from '../Screens/AllMedsScreen';
import ViewMedScreen from '../Screens/ViewMedScreen';
import EditMedScreen from '../Screens/EditMedScreen';

import screenStyles from '../Screens/screenStyles';

const MedsNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
      headerTitleStyle: screenStyles.headerTitleStyle,
      headerTitleAlign: "center"
    }}>
      <Stack.Screen name="AllMeds" options={{title: 'All Medications'}} component={AllMedsScreen} />
      <Stack.Screen name="ViewMed" component={ViewMedScreen}
        options={({route}) => ({title: route.params.med.name})} 
      />
      <Stack.Screen name="EditMed" component={EditMedScreen}
        options={({route}) => ({title: 'Edit '+ route.params.med.name})} 
      />
    </Stack.Navigator>
  );
}

export default MedsNavigation;
