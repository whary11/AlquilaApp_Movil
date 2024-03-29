import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Reserve } from "../../../interfaces/ReserveInterface";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomText from "../../../components/generals/CustomText";
import { colorsApp } from "../../../styles/globalColors/GlobalColors";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { RootInitialStackParams } from "../../../routes/stackNavigation/InitialStackNavigation";
import FastImage from "react-native-fast-image";

interface MyProps {
    reserve:Reserve
}
const ItemReserve = ({reserve}:MyProps) => {
    const navigation = useNavigation<any>()
    const FormattedDate = ( dateString:string ) => {
        const formattedDate = moment(dateString).format('DD [de] MMM [de] YYYY');
        return formattedDate
    };
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => {
                // navigation.navigate('ReserveDetail',{})
                navigation.navigate('ReserveDetail', {reserve: reserve})
            }}
        >
            <View style={styles.containerImage}>
                <FastImage
                    source={{ uri: reserve.publication?.images[0]?.url, priority:'high' }}
                    style={styles.image}
                    // resizeMode='center'
                />
            </View>
            <View style={styles.containerInfoText}>

                <CustomText style={{...styles.text, fontWeight:'bold', color:reserve.state_type?.color}}>{reserve.state_type?.name}</CustomText>
                <CustomText style={{...styles.text, fontWeight:'700'}}>Bogota</CustomText>
                <CustomText style={{...styles.text}}>Anfitrion: {reserve.publication?.user?.name}</CustomText>
                <CustomText style={{...styles.text}}>{FormattedDate(reserve.start_date)} - {FormattedDate(reserve.end_date)}</CustomText>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        marginVertical:hp(1),
        marginHorizontal:wp(4),
        flexDirection:"row",
        alignItems:'center'
    },
    containerImage:{
        marginRight:wp(4)
    },
    image:{
        width:wp('25%'),
        height:hp(11),
        borderRadius:hp(1)
    },
    containerInfoText:{

    },
    text:{
        fontSize:hp(1.4),
        paddingVertical:hp(0.13),
        color:colorsApp.light(1)
    }
    
})
export default ItemReserve