import { StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { mainColor, mainWhite } from '../../../assets/colors';
import userContext from '../../contexts/userContext';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { runService } from '../../utils/service';
import { styles } from '../../../assets/Styles';

const NotificationBell = props => {
    const [count, setCount] = useState('');
    const context = useContext(userContext);
    const navigation = useNavigation();

    useEffect(() => {
        getNotifCount();
    }, [context[0]]);

    const getNotifCount = async () => {
        try {
            const response = null; 
            await runService(
                'NOTIFICATION_COUNT',
                {
                    customerid: context[8]
                },
                context[2],
            );
            setCount(response?.count);
        } catch (err) {
            Alert.alert('Error: ' + err.message);
        }
    };

    if (context[0]) {
        return (
            <Ionicons.Button name="notifications" size={25} backgroundColor={mainColor} color={mainWhite} onPress={() => navigation.navigate("notification", { screen: "NotificationListScreen", params: { getNotifCount: getNotifCount() } })}>
                {
                    count ? (
                        <Animatable.Text animation="tada" iterationCount={5} style={[styles.txt, { backgroundColor: "#FF0000", textAlign: "center", color: mainWhite, borderRadius: 10, overflow: "hidden", position: "absolute", left: count > 12 ? 6 : 8, top: 0, paddingVertical: 2, paddingHorizontal: count > 9 ? 3 : 6 }]}>{count}</Animatable.Text>
                    ) : null
                }
            </Ionicons.Button>
        )
    } else null

}
export default NotificationBell;

const customStyles = StyleSheet.create({
    spinner: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999
    }
});