import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';

import Toast from "react-native-easy-toast";

import LoginForm from "../../Components/LoginForm";

export default function Login() {

    const toastRef = useRef();

    return (
        <View style = { styles.container }>
            <StatusBar backgroundColor = "#4ba3c7" />
            <Image 
                source = { require("../../../assets/logo.png") }
                style = { styles.imgLogo }
            />
            <Text style = { styles.textBanner }>¡Bienvenido!</Text>
            <LoginForm toastRef = { toastRef } />
            <Toast 
                ref = { toastRef } 
                position = "center" 
                opacity = { 0.9 } 
                fadeInDuration = { 1000 }
                fadeOutDuration = { 3000 } 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#81d4fa"
    },
    imgLogo: {
        height: 106,
        width: 106,
        marginTop: 40,
        alignSelf: "center"
    },
    textBanner: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 30,
        color: "#fff",
        textShadowColor: "#424242",
        textShadowOffset: {
            width: 100,
            height: 100
        },
        textShadowRadius: 20,
        alignSelf: "center"
    }
});
