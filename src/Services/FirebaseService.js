import { firebaseapp } from "../Utils/Firebase";
import * as firebase from "firebase";

//const db = firebase.firestore(firebaseapp);

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

/*   export const validarSesion = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //setValidarSesion(true);
        console.log("Usuario logueado");
      } else {
        //setValidarSesion(false);
        console.log("No ha iniciado sesión");
      }
    });
  }; */

  export const cerrarSesion = () => {
    firebase.auth().signOut();
  };