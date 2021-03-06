import React from 'react';
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import DashboardStack from './DashboardStack';
import IncomeStack from './IncomeStack';
import ExpenseStack from './ExpenseStack';
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      tabBarOptions={{
        inactiveTintColor: "#fff",
        activeTintColor: "#fff",
        style: styles.tabBarPrimary
      }}
      screenOptions={ ({ route }) => ({
        tabBarIcon: ({ color }) => mostrarIcono(route, color)
      }) }
    >
      
      <Tab.Screen
        component={DashboardStack}
        name="dashboard"
        options={{
          title: "Inicio"
        }}
      />
      <Tab.Screen
        component={IncomeStack}
        name="income"
        options={{ 
          title: "Ingresos"
        }}
      />
      <Tab.Screen
        component={ExpenseStack}
        name="expense"
        options={{ title: "Gastos" }}
      />
      <Tab.Screen
        component={ProfileStack}
        name="profile"
        options={{ title: "Cuenta" }}
      />
      
    </Tab.Navigator>
  );
};

function mostrarIcono(route, color) {
  
  let iconName = "";

  switch (route.name) {
    case "dashboard":
      iconName = "chart-line";
      break;
    case "income":
      iconName = "cash-plus";
      break;
    case "expense":
      iconName = "cash-minus";
      break;
    case "profile":
      iconName = "account-outline";
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={24} color={color} />
  );
}

export default function AuthenticatedPaths() {
  return (
    
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarPrimary: {
    alignItems: "center",
    backgroundColor: "#0093c4",
    paddingBottom: 5
  }
});