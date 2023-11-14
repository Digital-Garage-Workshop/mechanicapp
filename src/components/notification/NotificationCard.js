import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Touchable, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { darkGrey, lightBlack, mainColor, mainOff, mainWhite, off, offCol } from '../../../assets/colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { styles } from '../../../assets/Styles'
import { filter } from 'lodash'

const NotificationCard = props => {

    var data = props?.data;
    const [isChecked, setIsChecked] = useState(data?.notificationid);

    const setCheck = () => {
        props?.getData(data);
        setIsChecked(0);
    };
    
    return (
        <>
            {
                isChecked == "1" ? (
                    <TouchableOpacity onPress={() => setCheck(0)} style={[customStyles.activeContainer]}>
                        <Ionicons name="notifications-circle" style={{ alignSelf: "center", marginRight: 10, color: lightBlack }} size={40} />
                        <View style={{ width: "80%" }}>
                            <Text style={styles.title}>Таны <Text style={{ fontWeight: "500" }}>{data?.licensetypename}</Text> нь {data?.wfmstatusname} төлөвтэй байна</Text>
                            <Text style={[styles.txtOff, { marginTop: 5 }]}>{data?.bookdate}</Text>
                        </View>
                        <View style={{ backgroundColor: "#FF5B79", width: 10, flex: 0, height: 10, borderRadius: 10, position: "absolute", right: 10, alignSelf: "center" }}>
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={[customStyles.offContainer]}>
                        <Ionicons name="notifications-circle" style={{ alignSelf: "center", paddingRight: 10, color: mainColor }} size={40} />
                        <View style={{ width: "80%" }}>
                            <Text style={styles.title}>Таны <Text style={{ fontWeight: "500" }}>{data?.licensetypename}</Text> нь {data?.wfmstatusname} төлөвтэй байна
                            </Text>
                            <Text style={[styles.txtOff, { marginTop: 5 }]}>{data?.bookdate}</Text>
                        </View>
                    </View>
                )
            }
        </>
    )
};

const customStyles = StyleSheet.create({
    activeContainer: { borderWidth: 1, borderColor: off, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10, borderRadius: 8, marginHorizontal: 10, flexDirection: "row", backgroundColor: mainOff },
    offContainer: { borderWidth: 1, borderColor: off, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10, borderRadius: 8, marginHorizontal: 10, flexDirection: "row", backgroundColor: mainWhite }
})

export default NotificationCard