import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { mainColor, off } from '../../../assets/colors'
import { styles } from '../../../assets/Styles'
import { split } from 'lodash'

const OffCard = props => {
    var value = props?.value;
    var label = props?.label;

    const returnVal = () => {
        if (value) {
            if (split(value, "")[0] == ".") {
                return 0 + value
            } else {
                return value
            }
        } else {
            return 0
        }
    }

    return (
        <View style={[styles.card, { paddingVertical: 15 }]}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "20%", alignItems: "center", justifyContent: "center", borderRightColor: off, borderRightWidth: 1 }}>
                    {props?.icon}
                </View>
                <View style={{ width: "70%", paddingHorizontal: 20 }}>
                    <Text numberOfLines={5} style={styles.fatTxt}>{returnVal()}</Text>
                    <Text numberOfLines={5} style={[styles.txtOff, { marginTop: 3 }]}>{label ? label : "..."}</Text>
                </View>
            </View>
        </View>
    );
};

const customStyles = StyleSheet.create({
    modalContainer: {
        justifyContent: "flex-end",
        margin: 0,
        position: "relative",
        bottom: 0,
        right: 0,
    },
    modalLilContainer: {
        backgroundColor: "white", borderTopLeftRadius: 30, borderTopRightRadius: 30, maxHeight: '90%', paddingVertical: 40
    },
    rowContainer: {
        flexDirection: 'row',
        paddingBottom: 5,
        marginBottom: 20,
        borderBottomColor: off,
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    xBtn: {
        position: 'absolute', paddingHorizontal: 10, paddingVertical: 10, borderBottomLeftRadius: 8, top: 0, right: 0, backgroundColor: mainColor, borderTopRightRadius: 20,
    },
    value: { width: '60%', textAlign: 'justify', marginLeft: 10 }
});

export default OffCard;




