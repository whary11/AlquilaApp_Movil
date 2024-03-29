import React from "react";
import { Image, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";

const Init = () => {
    const logo = require("../../assets/system/logos/logo.png")
    return (
        <View style={styles.container}>
            <FastImage 
                source={logo}
                style={styles.logo}
                resizeMode="center"
            />
        </View>
    )
}

export default Init
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
    },
    logo:{
        width:"100%",
    }
})