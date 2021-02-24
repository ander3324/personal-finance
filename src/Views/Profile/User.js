import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, Button } from 'react-native';
import { Icon, Avatar, Input } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

import CodeInput from "react-native-code-input";

import { cerrarSesion } from '../../Services/FirebaseService';
import { validarEmail } from "../../Utils/Utils";
import { obtenerUsuario } from "../../Services/FirebaseService";
import Loading from "../../Components/Loading";
import Modal from "../../Components/Modal";
//import FirebaseRecaptcha from "../../Utils/FirebaseRecaptcha";

export default function User() {

    const [imagenPerfil, setImagenPerfil] = useState("");
    const [loading, setLoading] = useState(false);

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");

    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const usuario = obtenerUsuario();

    useEffect(() => {
        setImagenPerfil(usuario.photoURL);
        const { displayName, email } = usuario;
        setDisplayName(displayName);
        setEmail(email);
    }, []);

    return (
        <View>
             <StatusBar backgroundColor = "#4ba3c7" />
             <CabeceraBG style = { styles.bg } />
            <Text>Mi Perfil</Text>
            <Button title = "Cerrar Sesión" onPress = { () => cerrarSesion() } />
        </View>
    )
}

function CabeceraBG(props) {
    const { nombre } = props;
  
    return (
      <View>
        <View style={styles.bg}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            { nombre }
          </Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    bg: {
      width: "100%",
      height: 200,
      borderBottomLeftRadius: 200,
      borderBottomRightRadius: 200,
      backgroundColor: "#4ba3c7",
      justifyContent: "center",
      alignItems: "center",
    },
    avatarinline: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: -70,
    },
    avatar: {
      width: 120,
      height: 120,
    },
    confirmacion: {
      height: 200,
      width: "100%",
      alignItems: "center",
    },
    titulomodal: {
      fontWeight: "bold",
      fontSize: 18,
      marginTop: 20,
    },
    detalle: {
      marginTop: 20,
      fontSize: 14,
      textAlign: "center",
    },
    btncontainer: {
      position: "relative",
      bottom: 10,
      right: 10,
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      alignSelf: "flex-end",
      marginTop: 20 
    },
  });
  
