import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function AppButton(props) {

	const navigation = useNavigation();

	const { value, bgColor, txtColor, action } = props;

	return (
		<TouchableOpacity
			style = { { 
				backgroundColor: bgColor,
				alignItems: 'center',
				padding: 10,
				borderRadius: 5,
				width: "48%"
			} }
			onPress = { action }
		>
			<Text style = {{ color: txtColor, fontWeight: 'bold' }}>{ value }</Text>
		</TouchableOpacity>
	)
}

// const styles = StyleSheet.create({
// 	button: {
// 		alignItems: 'center',
// 		// backgroundColor: color,
// 		padding: 10,
// 	}
// })
