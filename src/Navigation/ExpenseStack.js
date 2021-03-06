import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Expense from '../Views/Expenses/Expense';
import AddExpense from "../Views/Expenses/AddExpense";
import EditExpense from '../Views/Expenses/EditExpense';
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
      <Stack.Screen
        component = { AddExpense }
        name = "add-expense"
        options = {{ title: "Nuevo Gasto" }}
      />
      <Stack.Screen 
        component = { EditExpense }
        name = "edit-expense"
        options = {{ title: "Editar gasto" }}
      />
    </ Stack.Navigator>
  );
}
