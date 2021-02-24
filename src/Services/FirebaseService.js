import { Platform } from "react-native";
import { firebaseapp } from "../Utils/Firebase";
import * as firebase from "firebase";
import "firebase/firestore";

import uuid from "random-uuid-v4";
import * as Permissions from "expo-permissions";
import { map } from "lodash";

import { convertirFicheroBlob } from "../Utils/Utils";

const db = firebase.firestore(firebaseapp);

export const validarSesion = (setUserAuth) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserAuth(true);
        console.log("Usuario logueado");
      } else {
        setUserAuth(false);
        console.log("No ha iniciado sesión");
      }
    });
  };
  
  export const cerrarSesion = () => {
    firebase.auth().signOut();
  };

  export const obtenerUsuario = () => {
    return firebase.auth().currentUser;
  };

  export const subirImagenesBatch = async (imagenes, ruta) => {
    const imagenesUrl = [];
  
    await Promise.all(
      map(imagenes, async (image) => {
        const blob = await convertirFicheroBlob(image);
        const ref = firebase.storage().ref(ruta).child(uuid());
  
        await ref.put(blob).then(async (result) => {
          await firebase
            .storage()
            .ref(`${ruta}/${result.metadata.name}`)
            .getDownloadURL()
            .then((imagenUrl) => {
              imagenesUrl.push(imagenUrl);
            });
        });
      })
    );
  
    return imagenesUrl;
  };

  export const addRegistroEspecifico = async (coleccion, doc, data) => {
    const resultado = { error: "", statusResponse: false };
  
    await db
      .collection(coleccion)
      .doc(doc)
      .set(data, { merge: true })
      .then((response) => {
        resultado.statusResponse = true;
      })
      .catch((err) => {
        resultado.error = err;
      });
  
    return resultado;
  };

  export const actualizarPerfil = async (data) => {
    let respuesta = false;
    await firebase
      .auth()
      .currentUser.updateProfile(data)
      .then((response) => {
        respuesta = true;
      });
  
    return respuesta;
  };