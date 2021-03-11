import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import Loading from './src/Components/Loading';

import NoAuthPaths from './src/Navigation/NoAuthPaths';
import SwitchNavigator from "./src/Navigation/SwitchNavigator";
import { validarSesion } from './src/Services/FirebaseService';

export default function App() {

  LogBox.ignoreLogs([
    "Animated",
    "Setting a timer",
    "Avatar.onAccessoryPress",
    "Avatar.showAccessory",
    "Can't perform",
    "failed Child",
    "Possible Unhandled"
  ]);

  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  //const ref = useRef(initialValue)

  useEffect(() => {
    setLoading(true);
    validarSesion(setUser);
    setLoading(false);
  }, []);

  if(loading) {
    return <Loading isVisible = { loading } text = "Cargando ..." />
  }

  return user ? <SwitchNavigator /> : <NoAuthPaths />

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
