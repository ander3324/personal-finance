import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import { isEmpty, size } from "lodash";
import * as firebase from "firebase";

import { validarEmail } from "../Utils/Utils";
import Loading from "../Components/Loading";

export default function SignInForm(props) {
  const { toastRef } = props;
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const crearCuenta = async () => {
    if (isEmpty(email) || isEmpty(password) || isEmpty(repeatPassword)) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validarEmail(email)) {
      toastRef.current.show("El email ingresado no es válido.");
    } else if (password != repeatPassword) {
      toastRef.current.show("Las contraseñas ingresadas no coinciden.");
    } else if (size(password) < 6) {
      toastRef.current.show("La contraseña debe tener al menos 6 caracteres.");
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          toastRef.current.show("Usuario registrado correctamente.");
          setLoading(false);
        })
        .catch((err) => {
          toastRef.current.show(
            "Ha ocurrido un error o el usuario ya está registrado."
          );
          setLoading(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={ styles.hline }
      />
      <Input 
        placeholder = "Email"
        containerStyle = { styles.input }
        leftIcon = {{ 
            type: "material-community",
            name: "email-outline",
            color: "#4ba3c7",
            marginRight: 20
        }}
        onChangeText = {
            (text) => {
                setEmail(text);
            }
        }
        value = { email }
      />
      <Input 
        placeholder = "Contraseña"
        containerStyle = { styles.input }
        leftIcon = {{
            type : "material-community",
            name : "key-outline",
            color: "#4ba3c7",
            marginRight: 20
        }}
        rightIcon = {{
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
      <Input 
        placeholder = "Repetir Contraseña"
        containerStyle = { styles.input }
        leftIcon = {{
            type : "material-community",
            name : "repeat",
            color: "#4ba3c7",
            marginRight: 20
        }}
        rightIcon = {{
            type: "material-community",
            name: show ? "eye-off-outline" : "eye-outline",
            color: "#4ba3c7",
            onPress: () => setShow(!show)
        }}
        secureTextEntry = { !show }
        onChangeText = {
            (text) => setRepeatPassword(text)
        }
        value = { repeatPassword }
      />
      <Button 
        title = "Registrarse"
        containerStyle = { styles.btnSignIn }
        buttonStyle = {{ backgroundColor: "#4ba3c7" }}
        onPress = { () => crearCuenta() }
      />
      <Button 
        title = "Volver"
        containerStyle = { styles.btnSignIn }
        buttonStyle = {{ backgroundColor: "#81d4fa" }}
        onPress = { () => navigation.goBack() }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F6F8",
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingTop: 20,
  },
  hline: {
      borderBottomColor: "#4ba3c7",
      borderBottomWidth: 2,
      width: 100
  },
  input: {
    width: "90%",
    marginTop: 20,
    height: 50,
  },
  btnSignIn: {
    width: "90%",
    marginTop: 20,
  },
});
