import { Alert, Linking } from 'react-native';
import { size } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export const validarEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  export const cargarImagenesPorAspecto = async (array) => {
    let imgResponse = { status: false, imagen: "" };
    const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
    const cameraPermissions = resultPermissions.CAMERA;
  
    if (cameraPermissions === "denied") {
      alert("Permita el acceso para cargar las imágenes.");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array,
      });
  
      if (!result.cancelled) {
        imgResponse = { status: true, imagen: result.uri };
      }
    }
    return imgResponse;
  };
  
  export const convertirFicheroBlob = async (rutaFisica) => {
    const fichero = await fetch(rutaFisica);
    const blob = await fichero.blob();
  
    return blob;
  };
