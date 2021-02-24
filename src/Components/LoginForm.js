import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Icon, Input, Button, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { isEmpty, split } from "lodash";

import Loading from "../Components/Loading";
import { validarEmail } from "../Utils/Utils";

export default function LoginForm(props) {

    const { toastRef } = props;
    const navigation = useNavigation();

    const [email, setEmail] = useState("ander3324@gmail.com");
    const [password, setPassword] = useState("wacaballa");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const iniciarSesion = () => {
        if (isEmpty(email) || isEmpty(password)) {
            toastRef.current.show("El email y la contraseña no pueden estar vacíos.");
        } else if (!validarEmail(email)) {
            toastRef.current.show("El email ingresado no es válido.");
        } else {
            setLoading(true);

            //Firebase Login
        }
    }

    return (
        <View style = { styles.container }>
            <View style = { styles.hline } />
            <Input 
                placeholder = "Email"
                containerStyle = { styles.input }
                leftIcon = {{
                    type: "material-community",
                    name: "email-outline",
                    color: "#4ba3c7",
                    marginRight: 10
                }}
                onChangeText = {
                    (text) => setEmail(text)
                }
                value = { email }
            />
            <Input 
                placeholder = "Contraseña"
                containerStyle = { styles.input }
                leftIcon = {{
                    type: "material-community",
                    name: "key-outline",
                    color: "#4ba3c7",
                    marginRight: 10
                }}
                rightIcon =  {{
                    type: "material-community",
                    name: show ? "eye-off-outline" : "eye-outline",
                    color: "#4ba3c7",
                    onPress: () => setShow(!show)
                }}
                secureTextEntry = { !show }
                onChangeText = {
                    (text) => setPassword(text)
                }
                value = { password }
            />
            <Button 
                title = "Ingresar"
                buttonStyle = {{ backgroundColor: "#4ba3c7" }}
                containerStyle = { styles.btnContainer }
                onPress = { 
                    () => iniciarSesion()
                }
            />
            <Text style = { styles.txtCrearCuenta }>
                ¿No tenés una cuenta?
                <Text 
                    style = { styles.txtRegistrate }
                    onPress = {
                        () => Alert.alert("Registrarse")
                    }
                >
                    { " " }
                    Registrate
                </Text> 
            </Text>
            <Divider style = { styles.divider } />
            <Text style = { styles.txtSino }>
                o sino
            </Text>
            <View style = { styles.btnLogin }>
                <TouchableOpacity 
                    style = { styles.btnLoginSocialGoogle }
                    onPress = {
                        () => Alert.alert("Google")
                    }
                >
                    <Icon 
                        size = { 24 }
                        type = "material-community"
                        name = "google"
                        color = "#fff"
                        backgroundColor = "transparent"
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style = { styles.btnLoginSocialFacebook }
                    onPress = {
                        () => Alert.alert("facebook")
                    }
                >
                    <Icon 
                        size = { 24 }
                        type = "material-community"
                        name = "facebook"
                        color = "#fff"
                        backgroundColor = "transparent"
                    />
                </TouchableOpacity>
            </View>
            <Loading isVisible = { loading } text = "Iniciando sesión ..." />
        </View>
    )
};

const styles = StyleSheet.create({
    primaryColor: {
        color: "#4ba3c7"
    },
    container: {
        backgroundColor: "#F5F6F8",
        flex: 1,
        marginTop: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: "center",
        paddingTop: 20
    },
    hline: {
        borderBottomColor: "#4ba3c7",
        borderBottomWidth: 2,
        width: 100
    },
    input:  {
        width: "90%",
        marginTop: 20,
        height: 50
    },
    btnContainer: {
        width: "90%",
        marginTop: 20
    },
    txtCrearCuenta: {
        marginTop: 20
    },
    txtRegistrate: {
        color: "#4ba3c7",
        fontFamily: "Roboto",
        fontSize: 15
    },
    divider: {
        backgroundColor: "#4ba3c7",
        height: 1,
        width: "90%",
        marginTop: 20
    },
    txtSino: {
        color: "#4ba3c7",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10
    },
    btnLogin: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 10
    },
    btnLoginSocialFacebook: {
        backgroundColor: "#3F5C96",
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5
    },
    btnLoginSocialGoogle: {
        backgroundColor: "#DB4B47",
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderRadius: 5
    }
});
