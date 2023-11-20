import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { lightBlack, mainColor, mainWhite } from '../../../assets/colors'

const BottomSum = props => {
    if (props?.current) {
        return (
            <View style={customStyles.containerCurrent}>
                <View style={customStyles.rowContainer}>
                    <Text style={[customStyles.currentLabel, { fontSize: 14, color: lightBlack }]}>Одоо:</Text>
                    <Text style={[customStyles.currentValue, { color: lightBlack }]}>{props?.current}</Text>
                </View>
                <View style={customStyles.rowContainer}>
                    <Text style={[customStyles.currentLabel, { fontSize: 16, color: mainColor }]}>Нийт:</Text>
                    <Text style={[customStyles.currentValue, { fontSize: 16 }]}>{props?.sum}</Text>
                </View>
            </View>
        )
    } else {
        return (
            <View style={customStyles.container}>
                <Text style={customStyles.label}>Нийт:</Text>
                <Text style={customStyles.value}>{props?.sum}</Text>
            </View>
        )
    }
}
export default BottomSum

const customStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 70,
        zIndex: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainWhite,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
    },
    label: {
        color: 'black',
        fontSize: 14,
        position: 'absolute',
        left: 40
    },
    value: {
        color: mainColor,
        fontSize: 18,
        position: 'absolute',
        right: 40
    },


    containerCurrent: {
        position: 'absolute',
        alignSelf: "center",
        flex: 1,
        bottom: 0,
        zIndex: 10,
        width: '100%',
        height: 70,
        flexDirection: "column",
        backgroundColor: mainWhite,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    },
    currentLabel: {
        color: 'black',
        fontSize: 14,
        position: "absolute",
        left: 20,
    },
    currentValue: {
        color: mainColor,
        fontSize: 14,
        position: "absolute",
        right: 20
    },

    rowContainer: {
        flexDirection: 'row',
        paddingBottom: 5,
        alignItems: 'center',
        flex: 1
    },

});