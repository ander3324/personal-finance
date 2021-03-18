import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Expense from '../Views/Expenses/Expense';

const Stack = createStackNavigator();

export default function ExpenseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Expense}
        name="expense"
        options={{
          headerStyle: {
            backgroundColor: "#4ba3c7"
          },
          headerTintColor: "#fff",
          headerTitle: "Mis Gastos",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
    </ Stack.Navigator>
  );
}
