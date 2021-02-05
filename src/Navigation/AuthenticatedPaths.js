import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';

import DashboardStack from './DashboardStack';
import IncomeStack from './IncomeStack';
import ExpenseStack from './ExpenseStack';
import DashboardButton from '../Components/DashboardButton';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName="dashboard"
      tabBarOptions={{
        inactiveTintColor: "#fff",
        activeTintColor: "#fff",
        style: {
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          alignItems: "center",
          backgroundColor: "#128C7E",
          paddingBottom: 5
        }
      }}
      screenOptions={ ({ route }) => ({
        tabBarIcon: ({ color }) => mostrarIcono(route, color)
      }) }
    >

      <Tab.Screen
        component={IncomeStack}
        name="income"
        options={{ 
          title: "Ingresos"
        }}
      />
      <Tab.Screen
        component={DashboardStack}
        name="dashboard"
        options={{
          title: "",
          tabBarIcon: () => <DashboardButton />
        }}
      />
      <Tab.Screen
        component={ExpenseStack}
        name="expense"
        options={{ title: "Gastos" }}
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
