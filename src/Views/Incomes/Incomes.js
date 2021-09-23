import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { size } from "lodash";
import moment from "moment/min/moment-with-locales";
import { useWindowDimensions } from "react-native";

import Loading from "../../Components/Loading";
import {
  deleteRegistro,
  findAll,
  updateRegistro,
  findAllInLastMonth,
} from "../../Services/FirebaseService";
import ContextMenu from "react-native-context-menu-view";
import RNPickerSelect from "react-native-picker-select";

export default function Incomes() {
  moment.locale("es");
  const navigation = useNavigation();

  const [incomes, setIncomes] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setIncomes(
        await findAllInLastMonth("Operations", "income", getFirstDayOfMonth())
      );
      totalIncomes();
      setLoading(false);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        //    setLoading(true);
        //  setIncomes(await findAll("Operations", "income"));
        selectedItem(selectedPeriod);
        //    setLoading(false);
        totalIncomes();
      })();
    }, [])
  );

  const totalIncomes = () => {
    let total = 0.0;
    for (i = 0; i < incomes.length; i++) {
      total += parseFloat(incomes[i].monto);
    }
    console.log(total);
    return total;
  };

  const selectedItem = async (value) => {
    setLoading(true);
    switch (value) {
      case 0:
        setIncomes(await findAll("Operations", "income"));
        break;
      case 1:
        setIncomes(
          await findAllInLastMonth("Operations", "income", getFirstDayOfMonth())
        );
        break;
      case 2:
        break;
    }
    setLoading(false);
  };

  const getFirstDayOfMonth = () => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return firstDay;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {incomes.length > 0 ? (
        <Text style={styles.totalText}>
          Total: ${totalIncomes().toFixed(2)}
        </Text>
      ) : (
        <></>
      )}
      {incomes.length > 0 ? (
        <RNPickerSelect
          placeholder =  {{}} 
          onValueChange={(value) => {
            //setSelectedPeriod(value);
            selectedItem(value);
          }}
          pickerProps={{
            accessibilityLabel:  selectedItem.title
          }}
          items={[
            { label: "Todos", value: 0 },
            { label: "Último mes", value: 1 },
            { label: "Mes anterior", value: 2 },
          ]}
        >
          <Text style={styles.rnPickerLabelText}>Seleccionar período</Text>
        </RNPickerSelect>
      ) : (
        <></>
      )}
      {incomes.length > 0 ? (
        <FlatList
          data={incomes}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item, index, renderSeparator }) => (
            <TouchableHighlight
              style={styles.card}
              key={item.key}
              onLongPress={() =>
                Alert.alert(
                  moment(item.date.toDate()).format("dd DD MMM YY"),
                  item.concepto,
                  [
                    {
                      text: "Editar",
                      style: "default",
                      onPress: () => {
                        console.log("Editar");
                        navigation.navigate("edit-income", { item: item });
                      },
                    },
                    {
                      text: "Borrar",
                      style: "destructive",
                      onPress: () => {
                        Alert.alert(
                          "¡Atención!",
                          `Vas a borrar el registro "${
                            item.concepto
                          }", del día ${moment(item.date.toDate()).format(
                            "YY/MM/YYYY"
                          )}, ¿Deseas continuar?`,
                          [
                            {
                              style: "destructive",
                              text: "Sí",
                              onPress: async () => {
                                await deleteRegistro("Operations", item.id);
                                setIncomes(
                                  await findAll("Operations", "income")
                                );
                                Alert.alert("Borrar", "Registro borrado.");
                              },
                            },
                            {
                              style: "cancel",
                              text: "No",
                            },
                          ]
                        );
                      },
                    },
                    {
                      text: "Cancelar",
                      style: "cancel",
                    },
                  ]
                )
              }
              underlayColor="#e0e0e0"
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={styles.calendarCell}>
                  <Text style={styles.calendarText}>
                    {"  " + moment(item.date.toDate()).format("dd DD MMM YY")}
                  </Text>
                </View>
                <View style={{ flex: 0.6 }}>
                  <Text style={styles.categoryCell}>{item.categoria}</Text>
                  <Text style={styles.descriptionCell}>{item.concepto}</Text>
                </View>
                <View style={{ flex: 0.4 }}>
                  <Text style={styles.amountCell}>
                    ${item.monto.toFixed(2).toString()}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      ) : (
        <View style={styles.noData}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Parece que no hay ingresos guardados aún...o revise su conexión a
            internet.
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Icon
              name="question"
              type="material-community"
              color="#CCC"
              reverse
              containerStyle={{ marginTop: 20 }}
            />
            <Icon
              name="cloud-question"
              type="material-community"
              color="#CCC"
              reverse
              containerStyle={{ marginTop: 20 }}
            />
            <Icon
              name="wifi-off"
              type="material-community"
              color="#CCC"
              reverse
              containerStyle={{ marginTop: 20 }}
            />
          </View>
        </View>
      )}
      {/* <Text>{ totalIncomes }</Text> */}
      <Icon
        name="plus"
        type="material-community"
        color="#4f9a94"
        containerStyle={styles.btnAddContainer}
        onPress={() => {
          navigation.navigate("add-income");
        }}
        reverse
      />
      <Loading isVisible={loading} text="Actualizando datos..." />
    </View>
  );
}

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 100,
        width: 3,
        backgroundColor: "#128c7e",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  card: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontFamily: "Roboto",
    borderBottomColor: "#cfcfcf",
    borderBottomWidth: 0.2,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
  },
  vline: {
    height: 100,
    width: 3,
    backgroundColor: "#0093c4",
  },
  calendarCell: {
    flex: 0.2,
    marginRight: 10,
    backgroundColor: "#4f9a94",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 5,
    marginLeft: 5,
    justifyContent: "center",
  },
  calendarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f5f5f5",
    marginLeft: 3,
  },
  categoryCell: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: "#616161",
    color: "#616161",
    textAlign: "right",
    paddingHorizontal: 20,
  },
  descriptionCell: {
    fontSize: 17,
    color: "#616161",
    alignSelf: "stretch",
    marginTop: 5,
  },
  amountCell: {
    alignSelf: "flex-end",
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontWeight: "bold",
    borderLeftWidth: 0.3,
    borderLeftColor: "#616161",
    marginVertical: 10,
  },
  btnAddContainer: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
  },
  noData: {
    marginHorizontal: 20,
  },
  totalText: {
    paddingVertical: 10,
    marginEnd: 10,
    textAlign: "right",
    borderBottomWidth: 0.5,
    borderBottomColor: "#cfcfcf",
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#00766c",
    /* borderRadius: 5,
    shadowColor: "#cfcfcf",
    shadowRadius: 5,
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 0.3, */
  },
});
