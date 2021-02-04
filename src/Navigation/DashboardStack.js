import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../Views/Finances/Dashboard';

const Stack = createStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        component={Dashboard}
        name="dashboard"
        options={{ 
          headerStyle: {
            backgroundColor: "#128C7E"
          },
          headerTintColor: "#fff",
          headerTitle: "Home",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </Stack.Navigator>
  );
}
