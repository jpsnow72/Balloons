import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const ButtonSpeeds = [0.1, 0.2, 0.3, 0.4, 0.5]; // Define different speeds for buttons

const generateRandomSpeed = () => {
	return ButtonSpeeds[Math.floor(Math.random() * ButtonSpeeds.length)];
};

const generateRandomXPos = () => {
	return Math.floor(Math.random() * (80 - 10 + 1) + 10);
};

const App = () => {
	const [buttons, setButtons] = useState([]);

	const addNewButton = () => {
		const newButton = {
			id: new Date().getTime(),
			speed: generateRandomSpeed(),
			position: 100,
			xPos: generateRandomXPos(),
		};
		setButtons((prevButtons) => [...prevButtons, newButton]);
	};

	const updateButtons = () => {
		setButtons((prevButtons) => {
			return prevButtons.map((button) => ({
				...button,
				position: button.position - button.speed,
			}));
		});
	};

	const removeButtonsOffScreen = () => {
		setButtons((prevButtons) =>
			prevButtons.filter((button) => button.position >= 0)
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			updateButtons();
			removeButtonsOffScreen();
		}, 16); // Adjust the interval based on your requirements

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const newButtonInterval = setInterval(() => {
			addNewButton();
		}, 3000); // Adjust the interval for new buttons based on your requirements

		return () => clearInterval(newButtonInterval);
	}, []);

	return (
		<View style={styles.container}>
			{buttons.map((button) => (
				<TouchableOpacity
					onPress={() => {
						console.log("Pressed: " + button.id);
					}}
					key={button.id}
					style={[
						styles.button,
						{ top: `${button.position}%`, left: `${button.xPos}%` },
					]}>
					<Text>{button.id}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	score: {},
	button: {
		position: "absolute",
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
	},
});

export default App;
