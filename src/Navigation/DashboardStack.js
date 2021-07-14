import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../Views/Finances/Dashboard';
import NewIncome from "../Views/Incomes/NewIncome";
import AddExpense from "../Views/Expenses/AddExpense";
import { obtenerUsuario } from "../Services/FirebaseService";

const Stack = createStackNavigator();

export default function DashboardStack() {

  const { displayName, email } = obtenerUsuario();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        component={Dashboard}
        name="dashboard"
        options={{ 
          headerStyle: {
            backgroundColor: "#4ba3c7"
          },
          headerTintColor: "#fff",
          headerTitle: `Hola ${ displayName ? displayName : email }`,
          headerTitleStyle: {
            fontWeight: "bold"
          }
        }}
      />
       <Stack.Screen 
        component = {NewIncome}
        name = "add-income"
        options = {{ title: "Nuevo Ingreso" }}
      />
       <Stack.Screen 
        component = {AddExpense}
        name = "add-expense"
        options = {{ title: "Nuevo Gasto" }}
      />
    
    </Stack.Navigator>
  );
}
