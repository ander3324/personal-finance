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
            backgroundColor: "#00363a"
          },
          headerTintColor: "#fff",
          headerTitle: "Dashboard",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </Stack.Navigator>
  );
}
