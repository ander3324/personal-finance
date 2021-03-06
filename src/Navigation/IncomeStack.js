import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Income from '../Views/Incomes/Incomes';
import NewIncome from "../Views/Incomes/NewIncome";
import EditIncome from "../Views/Incomes/EditIncome";

const Stack = createStackNavigator();

export default function IncomeStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#4ba3c7"},
      headerTintColor: "#fff"
  }}
    >
      <Stack.Screen 
        component={Income}
        name="income"
        options={{
          headerTitle: "Mis Ingresos",
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
        component = { EditIncome }
        name = "edit-income"
        options = {{ title: "Editar ingreso" }}
      />
    </Stack.Navigator>
  );
}
