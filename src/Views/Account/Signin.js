import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import Toast from "react-native-easy-toast";

import SignInForm from "../../Components/SignInForm";

export default function Signin() {

    const toastRef = useRef();

    return (
        <View style={ styles.container }>
            <Image 
                source = { require("../../../assets/logo.png") }
                style = { styles.imgLogo }
            />
            <Text style = { styles.textBanner }>Registrarse</Text>
            <SignInForm toastRef = { toastRef } />
            <Toast 
                ref = { toastRef }
                position = "center"
                opacity = {0.9}
                fadeOutDuration = {300}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#81d4fa"
    },
    imgLogo: {
        width: 106,
        height: 106,
        marginTop: 40,
        alignSelf: "center"
    },
    textBanner: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 30,
        color: "#fff",
        alignSelf: "center"
    }
});
