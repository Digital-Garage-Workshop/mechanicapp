import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, StyleSheet, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { styles } from '../../../assets/Styles'
import { darkGrey, lightBlack,off } from '../../../assets/colors'
import userContext from '../../contexts/userContext';
import { runService } from '../../utils/service';
import { urlName } from '../../../util';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ImageView from "react-native-image-viewing";

const ProfileScreen = () => {
    const context = useContext(userContext);
    const [headerData, setHeaderData] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCustomerGetList();
    }, []);

    const getCustomerGetList = async () => {
        try {
            const response = await runService(
                'PROFILE_SCREEN_DATA',
                {
                    id: context[8]
                },
                context[2],
            );
            setHeaderData(response);
            setRefreshing(false);
        } catch (err) {
            Alert.alert('Error: ' + err.message);
        }
    };

    useEffect(() => {
        getCustomerGetList();
    }, [context[8]]);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.container} refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            } >
                <View style={[styles.card, { flex: 0 }]}>
                    <View style={{ alignSelf: 'center', alignItems: "center" }}>
                        {
                            context[10] ? (
                                <TouchableOpacity onPress={() => setShowImg(true)}>
                                    <Image
                                        source={{ uri: urlName + headerData?.logo }}
                                        style={{ height: 100, width: 100, borderRadius: 100, overflow: "hidden", borderWidth: 1, borderColor: off }}
                                        resizeMethod='resize'
                                        resizeMode='cover'
                                    />
                                </TouchableOpacity>
                            ) : (
                                <FontAwesome name="user-circle-o" size={60} style={{ color: darkGrey }} />
                            )
                        }
                        <Text style={[styles.title, { marginVertical: 10 }]}>{headerData?.customername ? headerData?.customername : "..."}</Text>
                    </View>
                    <View style={{ margin: 20 }}>
                        <View style={customStyles.row}>
                            <Text style={[styles.title, { width: "50%" }]}>Мэдээлэл</Text>
                        </View>
                        <View style={customStyles.row}>
                            <Text style={[styles.txtOff, { width: "40%" }]}>Код:</Text>
                            <Text style={styles.txt}>{headerData?.customercode ? headerData?.customercode : "..."}</Text>
                        </View>
                        <View style={customStyles.row}>
                            <Text style={[styles.txtOff, { width: "40%" }]}>Утас:</Text>
                            <Text style={styles.txt}>{headerData.phonenumber ? headerData.phonenumber : "..."}</Text>
                        </View>
                        <View style={customStyles.row}>
                            <Text style={[styles.txtOff, { width: "40%" }]}>Факс:</Text>
                            <Text style={styles.txt}>{headerData.fax ? headerData.fax : "..."}</Text>
                        </View>
                        <View style={customStyles.row}>
                            <Text style={[styles.txtOff, { width: "40%" }]}>И-мэйл:</Text>
                            <Text style={styles.txt}>{headerData.email ? headerData.email : "..."}</Text>
                        </View>
                        <View style={customStyles.row}>
                            <Text style={[styles.txtOff, { width: "40%" }]}>Хаяг:</Text>
                            <Text style={styles.txt}>{headerData.description ? headerData.description : "..."}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}




const customStyles = StyleSheet.create({
    line: {
        borderBottomColor: off, borderBottomWidth: 1, right: 10, alignSelf: 'center', position: 'absolute', width: "50%"
    },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    value: {
        color: lightBlack,
        fontSize: 12,
        width: "50%",
        textAlign: "justify"
    }
})




export default ProfileScreen;


















