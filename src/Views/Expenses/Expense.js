import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StatusBar, FlatList, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Icon } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { size } from "lodash";
import moment from "moment/min/moment-with-locales";

import Loading from "../../Components/Loading";
import { findAll } from '../../Services/FirebaseService';

export default function Expense() {

  moment.locale("es");
  
  const navigation = useNavigation();

  const [expenses, setExpenses] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (
      async () => {
        setLoading(true);
        setExpenses(await findAll("Operations", "expense"));
        setLoading(false);
      }
    )();
  }, []);

  useFocusEffect(
    useCallback(
      () => {
        (
          async () => {
            setExpenses(await findAll("Operations", "expense"));
            totalExpenses();
          }
        )();
      },
      []
    )
  );
  
  const totalExpenses = () => {
    let total = 0.0;
    for(let i = 0; i < expenses.length; i++) {
      total += parseFloat(expenses[i].monto);
    }
    return total;
  };

  return (
    <View style = {{ flex: 1, justifyContent: "center" }}>
      {/* <StatusBar backgroundColor = "#af4448" /> */}
      { expenses.length > 0 ? <Text style = { styles.totalText }>Total: ${totalExpenses().toFixed(2)}</Text> : <></>}
      {expenses.length > 0 ? (
          <FlatList 
            data = { expenses }
            contentContainerStyle = {{ paddingBottom: 120 }}
            renderItem = {({item, index, renderSeparator}) => (
              <TouchableHighlight 
                style = { styles.card }
                key = { item.key }
                onPress = { () => Alert.alert(item.concepto) }
                underlayColor = "#e0e0e0"
              >
                <View style = {{ flexDirection: "row" }}>
                  <View style = { styles.calendarCell }>
                    <Text style = { styles.calendarText }>
                      {
                        `  ${moment(item.fecha).format("dd DD MMM YY")}`
                      }
                    </Text>
                  </View>
                  <View style = { {flex: 0.6} }>
                    <Text style = { styles.categoryCell }>
                      { item.categoria }
                    </Text>
                    <Text style = { styles.descriptionCell }>
                      { item.concepto }
                    </Text>
                  </View>
                  <View style = {{ flex: 0.4 }}>
                    <Text style = { styles.amountCell }>
                      ${item.monto.toFixed(2).toString()}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          />
      ) : (
        <View style = {styles.noData}>
          <Text style = {{
            fontSize: 18,
            textAlign: "center"
          }}>
            Parece que no hay gastos guardados aún...o revise su conexión a internet.
          </Text>
          <View style = {{
            flex: 1,
            flexDirection: "row",
            alignSelf: "center"
          }}>
          <Icon 
            name = "question"
            type = "material-community"
            color = "#CCC"
            reverse
            containerStyle = {{ marginTop: 20 }}
          />
          <Icon 
            name = "cloud-question"
            type = "material-community"
            color = "#CCC"
            reverse
            containerStyle = {{ marginTop: 20 }}
          />
          <Icon 
            name = "wifi-off"
            type = "material-community"
            color = "#CCC"
            reverse
            containerStyle = {{ marginTop: 20 }}
          />

          </View>
        </View>
      )}
      <Icon 
        name = "plus"
        type = "material-community"
        color = "#ef5350"
        containerStyle = { styles.btnAddContainer }
        onPress = {
          () => { navigation.navigate("add-expense"); } 
        }
        reverse
      />
      <Loading isVisible = {loading} text = "Actualizando datos..." />
      
    </View>
  );
}

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
    paddingRight: 5
  },
  vline: {
    height: 100,
    width: 3,
    backgroundColor: "#0093c4",
  },
  calendarCell: { 
    flex: 0.2,
    marginRight: 10,
    backgroundColor: "#ef5350",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    paddingLeft: 5,
    marginLeft: 5,
    justifyContent: "center"
  },
  calendarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f5f5f5",
    marginLeft: 3
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
    paddingHorizontal: 20 
  },
  descriptionCell: {
    fontSize: 17,
    color: "#616161",
    alignSelf: "stretch",
    marginTop: 5
  },
  amountCell: {
    alignSelf: "flex-end",
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontWeight: "bold",
    borderLeftWidth: 0.3,
    borderLeftColor: "#616161",
    marginVertical: 10,
    color: "#b61827"
  },
  btnAddContainer: {
    flex: 1,
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2
  },
  noData: {
    marginHorizontal: 20
  },
  totalText: {
    paddingVertical: 10,
    marginTop: 0, 
    paddingEnd: 10,
    textAlign:"right",
    borderBottomWidth: 0.5,
    borderBottomColor: "#cfcfcf",
    fontFamily: "Roboto",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#FFFFFF",
    backgroundColor: "#ef5350"
    /* borderRadius: 5,
    shadowColor: "#cfcfcf",
    shadowRadius: 5,
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 0.3, */
  }
});
