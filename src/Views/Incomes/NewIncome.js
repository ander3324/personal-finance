import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

//import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/min/moment-with-locales";

import Loading from "../../Components/Loading";
import { obtenerUsuario } from "../../Services/FirebaseService";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function NewIncome() {
  const navigation = useNavigation();

  const [categoria, setCategoria] = useState("")
  const [date, setDate] = useState(new Date());
  const [showDateDialog, setShowDateDialog] = useState(false);

  const showDatepicker = () => {
    setShowDateDialog(true);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDateDialog(false);
    const currentDate = selectedDate || date;
    //showDateDialog(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style = { styles.container }>
      <TouchableOpacity 
        onPressIn={showDatepicker}>
        <Text style = { styles.txtLabel }>Fecha: </Text>
        <Input
          placeholder={"Fecha"}
          value={moment(date).format("DD/MM/YYYY")}
          editable={false}
          style = { styles.input }
        />
      </TouchableOpacity>
      <Input 
        placeholder="Descripcion"
        style = { styles.input }
        multiline = {true}
      />
      <Input 
        placeholder="Monto" 
        keyboardType="number-pad"
        style = { styles.input } 
      />
      <Text style={ styles.txtLabel }>Categoría</Text>
      <Botonera 
        categoria = {categoria} setCategoria = {setCategoria}
      />
      <Button
        title="Guardar Ingreso"
        buttonStyle={styles.btnAdd}
      />
     
      {/* <Button
        title="Cancelar"
        buttonStyle={styles.btnCancel}
        onPress = { navigation.goBack }
      /> */}
      {showDateDialog && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
    
  );
}

function Botonera(props) {
  const { categoria, setCategoria } = props;
  return (
    <View style = { styles.botonera }>
      <TouchableOpacity 
        style = { styles.btnCategoria }
        onPress = {() => {
          setCategoria("generales")
        }}
      >
        <Icon 
          type = "material-community"
          name = "currency-usd"
          size = {24}
          color = {categoria === "generales" ? "#0093c4" : "#aeaeae"}
          reverse
        />
        <Text>Generales</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style = { styles.btnCategoria }
        onPress = {() => {
          setCategoria("fijos")
        }}
      >
        <Icon 
          type = "material-community"
          name = "pin"
          size = {24}
          color = {categoria === "fijos" ? "#0093c4" : "#aeaeae"}
          reverse
        />
        <Text>Fijos</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style = { styles.btnCategoria }
        onPress = {() => {
          setCategoria("extra")
        }}
      >
        <Icon 
          type = "material-community"
          name = "wallet-giftcard"
          size = {24}
          color = {categoria === "extra" ? "#0093c4" : "#aeaeae"}
          reverse
        />
        <Text>Extraordinarios</Text>
      </TouchableOpacity>
    </View>
  );
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
    backgroundColor: "#aeaeae"
  },
  txtLabel: {
    fontSize: 18,
    fontFamily: "Roboto",
    marginLeft: 10,
    marginTop: 20,
    color: "#8d8d8d"
  },
  botonera: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10
  },
  btnCategoria: {
    justifyContent: "center",
    alignItems: "center"
  }
});
