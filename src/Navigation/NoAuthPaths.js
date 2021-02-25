import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import Login from "../Views/Account/Login";
import Signin from "../Views/Account/Signin";

const Stack = createStackNavigator();

export default function NoAuthPaths() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName = "login"
                screenOptions = {{ headerShown: false }}
            >
                <Stack.Screen component = { Login } name = "login" />
                <Stack.Screen component = { Signin } name = "signin" />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
