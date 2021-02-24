import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import AuthenticatedPaths from "./AuthenticatedPaths";
import { validarSesion } from "../Services/FirebaseService";
import Loading from '../Components/Loading';

export default function SwitchNavigator() {
    
    const [userAuth, setUserAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        validarSesion(setUserAuth);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    if (loading) {
        return <Loading isVisible = { loading } text = "Cargando configuración ..." />
    } else {
        return userAuth ? <AuthenticatedPaths /> : <></>
    }
}

const styles = StyleSheet.create({})
