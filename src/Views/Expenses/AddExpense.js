import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

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
        } else if (!parseFloat(monto > 0)) {
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
                usuario: obtenerUsuario().uid, 
                status: 1
            };

            const recordData = await addRegistro("Expenses", expense);

            if(recordData.statusResponse) {
                setLoading(false);
                Alert.alert("Nuevo Gasto", "Datos guardados correctamente.", [
                    { style: "cancel", text: "Aceptar", onPress: () => navigation.navigate("expense") }
                ]);
            } else {
                setLoading(false);
                Alert.alert("Error", "No se pudo guardar los datos.", [
                    { style: "cancel", text: "Aceptar" }
                ]);
            }
        }
    };

    return (
        <View>
            <Text>Nuevo Gasto</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
