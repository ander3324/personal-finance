import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/min/moment-with-locales";
import { isEmpty } from "lodash";

import Loading from "../../Components/Loading";
import { addRegistro, obtenerUsuario } from "../../Services/FirebaseService";

export default function AddExpense() {

    const navigation = useNavigation();

    const [showDateDialog, setShowDateDialog] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [concepto, setConcepto] = useState("");
    const [monto, setMonto] = useState(0.0);
    const [date, setDate] = useState(new Date());
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);

    const showDatepicker = () => setShowDateDialog(true);

    const onChangeDate = (event, selectedDate) => {
        setShowDateDialog(false);
        let currentDate = selectedDate || date;
        setDate(currentDate);
    }

    const addExpense = async () => {
        setErrores({});
        if(isEmpty(concepto)) {
            setErrores({concepto: "Ingrese una descripción."});
        } else if (!parseFloat(monto) > 0) {
            setErrores({monto: "Ingrese el monto."});
        } else if(isEmpty(categoria)) {
            Alert.alert("Error", "Seleccione la categoría", [{ style: "cancel", text: "Aceptar" }]);
        } else {
            setLoading(true);

            //Crear gasto:
            const expense = {
                date, 
                concepto, 
                monto, 
                categoria,
                tipo: "expense", 
                usuario: obtenerUsuario().uid, 
                status: 1
            };

            const recordData = await addRegistro("Operations", expense);

            if(recordData.statusResponse) {
                setLoading(false);
                // Alert.alert("Nuevo Gasto", "Datos guardados correctamente.", [
                //     { style: "cancel", text: "Aceptar", onPress: () => navigation.navigate("expense") }
                // ]);
                Alert.alert("Nuevo Gasto", "Datos guardados correctamente.", [
                    { style: "cancel", text: "Aceptar", onPress: () => navigation.goBack() }
                ]);
            } else {
                setLoading(false);
                Alert.alert("Error", "No se pudo guardar los datos.", [
                    { style: "cancel", text: "Aceptar" }
                ]);
            }
        }
    };

    function Botonera(props) {
        const { categoria, setCategoria } = props;
        return (
            <ScrollView
                style = { styles.scrollBotonera }
                horizontal = { true }
                showsHorizontalScrollIndicator = { true }
            >
            <View style = { styles.botonera }>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("generales") }
                >
                    <Icon 
                        type = "material-community"
                        name = "currency-usd"
                        size = { 24 }
                        color = { categoria === "generales" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>General</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("alimentos") }
                >
                    <Icon 
                        type = "material-community"
                        name = "food"
                        size = { 24 }
                        color = { categoria === "alimentos" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Alimentación</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("vestuario") }
                >
                    <Icon 
                        type = "material-community"
                        name = "hanger"
                        size = { 24 }
                        color = { categoria === "vestuario" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Vestimenta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("salud") }
                >
                    <Icon 
                        type = "material-community"
                        name = "bandage"
                        size = { 24 }
                        color = { categoria === "salus" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Salud</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("transporte") }
                >
                    <Icon 
                        type = "material-community"
                        name = "train-car"
                        size = { 24 }
                        color = { categoria === "transporte" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Transporte</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("educacion") }
                >
                    <Icon 
                        type = "material-community"
                        name = "chair-school"
                        size = { 24 }
                        color = { categoria === "educacion" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Educación</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("ocio") }
                >
                    <Icon 
                        type = "material-community"
                        name = "bike"
                        size = { 24 }
                        color = { categoria === "ocio" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Ocio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("tecno") }
                >
                    <Icon 
                        type = "material-community"
                        name = "monitor-cellphone"
                        size = { 24 }
                        color = { categoria === "tecno" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Tecnología</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("vacaciones") }
                >
                    <Icon 
                        type = "material-community"
                        name = "beach"
                        size = { 24 }
                        color = { categoria === "vacaciones" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Vacaciones</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { styles.btnCategoria }
                    onPress = { () => setCategoria("familia") }
                >
                    <Icon 
                        type = "material-community"
                        name = "home-heart"
                        size = { 24 }
                        color = { categoria === "familia" ? "#0093c4" : "#aeaeae" }
                        reverse
                    />
                    <Text>Familia</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        );
    }

    return (
        <View style = { styles.container }>
            <TouchableOpacity onPressIn = { showDatepicker }>
                <Text style = { styles.txtLabel }>Fecha: </Text>
                <Input 
                    placeholder = {"Fecha"}
                    value = { moment(date).format("DD/MM/YYYY") }
                    editable = { false }
                    style = { styles.input }
                />
            </TouchableOpacity>
            <Input 
                placeholder = "Descripción"
                style = { styles.input }
                multiline = { true }
                onChangeText = { (text) => setConcepto(text) }
                errorMessage = { errores.concepto }
            />
            <Input 
                placeholder = "Monto"
                keyboardType = "number-pad"
                style = { styles.input }
                onChangeText = {(text) => setMonto(parseFloat(text))} 
                errorMessage = { errores.monto }
            />
            <Text style = { styles.txtLabel }>Categoría</Text>
            <Botonera categoria = { categoria } setCategoria = { setCategoria } />
            <Button 
                title = "Guardar Gasto"
                buttonStyle = { styles.btnAdd }
                onPress = { addExpense }
            />
            <Loading isVisible = { loading } text = "Guardando los datos..." />
            {
                showDateDialog && (
                    <DateTimePicker 
                        testId = "dateTimePicker"
                        value = { date }
                        mode = { "date" }
                        display = "default"
                        onChange = { onChangeDate }
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 5,
    padding: 5,
    elevation: 5,
  },
  input: {
    width: "90%",
    borderRadius: 10,
    borderColor: "#707070",
    marginTop: 0,
    paddingHorizontal: 0,
    height: 50,
  },
  textArea: {
    height: 100,
  },
  btnAdd: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  btnCancel: {
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: "#aeaeae",
  },
  txtLabel: {
    fontSize: 18,
    fontFamily: "Roboto",
    marginLeft: 10,
    marginTop: 20,
    color: "#8d8d8d",
  },
  botonera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  btnCategoria: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  },
  scrollBotonera: {
      flexDirection: "row",
      flex: 1,
      marginHorizontal: 10
  }
});

