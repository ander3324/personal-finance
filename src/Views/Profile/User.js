import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, Button } from 'react-native';
import { Icon, Avatar, Input } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

//import CodeInput from "react-native-code-input";

import { cerrarSesion } from '../../Services/FirebaseService';
import { validarEmail, cargarImagenesPorAspecto } from "../../Utils/Utils";
import { obtenerUsuario, actualizarPerfil, addRegistroEspecifico, subirImagenesBatch } from "../../Services/FirebaseService";
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
            <HeaderAvatar 
              usuario = { usuario }
              imagenPerfil = { imagenPerfil }
              setImagenPerfil = { setImagenPerfil }
              setLoading = { setLoading }
            />
            <Text>Mi Perfil</Text>
            <Button title = "Cerrar Sesión" onPress = { () => cerrarSesion() } />
            <Loading isVisible = { loading } text = "Actualizando perfil ..." />
        </View>
    )
}

function CabeceraBG(props) {
    const { nombre } = props;
  
    return (
      <View>
        <View style={styles.bg}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            { nombre ? nombre : "Sin Nombre" }
          </Text>
        </View>
      </View>
    );
  }

  function HeaderAvatar(props) {
    const { usuario, setImagenPerfil, imagenPerfil, setLoading } = props;
    const { uid } = usuario;
  
    const cambiarfoto = async () => {
      const resultado = await cargarImagenesPorAspecto([1, 1]);
      if (resultado.status) {
        setLoading(true);
        const url = await subirImagenesBatch([resultado.imagen], "Perfil");
        const update = await actualizarPerfil({ photoURL: url[0] });
        const response = await addRegistroEspecifico("Usuarios", uid, {
          photoURL: url[0],
        });
  
        if (response.statusResponse) {
          setImagenPerfil(url[0]);
          setLoading(false);
        } else {
          setLoading(false);
          alert("Ha ocurrido un error al actualizar la foto de perfil.");
        }
      }
    };
    return (
      <View style={styles.avatarInline}>
        <Avatar
          source={
            imagenPerfil
              ? { uri: imagenPerfil }
              : require("../../../assets/avatar.jpg")
          }
          style={styles.avatar}
          size="large"
          rounded
          showAccessory={true}
          onAccessoryPress={cambiarfoto}
        />
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
    avatarInline: {
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
    tituloModal: {
      fontWeight: "bold",
      fontSize: 18,
      marginTop: 20,
    },
    detalle: {
      marginTop: 20,
      fontSize: 14,
      textAlign: "center",
    },
    btnContainer: {
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
  
