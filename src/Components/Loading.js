import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Overlay } from "react-native-elements";
import { Flow } from "react-native-animated-spinkit";

export default function Loading(props) {

    const { isVisible, text } = props;

    return (
        <Overlay
            isVisible = { isVisible }
            overlayStyle = { styles.overlay }
        >
            <View style = { styles.view }>
                <Flow size = { 70 } color = "#e1f5fe" />
                { 
                    text && 
                    <Text style = { styles.text }>
                        { text }
                    </Text> 
                }
            </View>
        </Overlay>
    )
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        borderWidth: 1,
        borderColor: "#128C7E",
        borderRadius: 20,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#e1f5fe",
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center"
    }
});
