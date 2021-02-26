import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Income from '../Views/Incomes/Incomes.js';

const Stack = createStackNavigator();

export default function IncomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        component={Income}
        name="income"
        options={{
          headerStyle: {
            backgroundColor: "#4f9a94"
          },
          headerTintColor: "#fff",
          headerTitle: "Mis Ingresos",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </Stack.Navigator>
  );
}
