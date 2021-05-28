import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment/min/moment-with-locales";
import { isEmpty } from "lodash";

import Loading from "../../Components/Loading";
import { findById, obtenerUsuario, updateRegistro } from "../../Services/FirebaseService";

export default function EditExpense(props) {

    const { route } = props;
    const { item } = route.params;

    const navigation = useNavigation();

    const [date, setDate] = useState(new Date());
    const [showDateDialog, setShowDateDialog] = useState(false);
    const [concepto, setConcepto] = useState("");
    const [monto, setMonto] = useState(0.0)
    const [errores, setErrores] = useState({});

    useEffect(() => {
        (async () => {
            
            const response = await findById("Operations", item.id);
            console.log(response);
            
            const { data } = response;

            setDate(data.date.toDate());
            setConcepto(data.concepto);
            setMonto(data.monto);

        })();
    }, []);

    const showDatepicker = () => {
        setShowDateDialog(true);
    }

    const onChangeDate = (event, selectedDate) => {
        setShowDateDialog(false);
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }

    return (
        <View style = { styles.container }>
            <TouchableOpacity onPressIn = { showDatepicker }>
                <Text style = { styles.txtLabel }>Fecha: </Text>
                <Input 
                    placeholder = { "Fecha" }
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
              value = { concepto }
            />
            <Input 
              placeholder = { "Monto" }
              keyboardType = { "number-pad" }
              style = { styles.input }
              onChangeText = { (text) => setMonto(text) }
              errorMessage = { errores.monto }
              value = { 
                monto.toString().includes(".") 
                ? monto.toString() 
                : monto.toString().concat(".00")
              }
            />
            { showDateDialog && (
                <DateTimePicker 
                    testID = "dateTimePicker"
                    value = { date }
                    mode = { "date" }
                    display = { 'default' }
                    onChange = { onChangeDate }
                />
            ) }
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
  },
});
