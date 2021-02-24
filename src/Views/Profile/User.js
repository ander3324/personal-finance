import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, Button } from 'react-native';
import { Icon, Avatar, Input } from "react-native-elements";
import { cerrarSesion } from '../../Services/FirebaseService';

export default function User() {
    return (
        <View>
            <Text>Mi Perfil</Text>
            <Button title = "Cerrar Sesión" onPress = { () => cerrarSesion() } />
        </View>
    )
}

const styles = StyleSheet.create({})
