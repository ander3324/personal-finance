import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import User from "../Views/Profile/User";

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                component = { User }
                name = "profile"
                options = {{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
