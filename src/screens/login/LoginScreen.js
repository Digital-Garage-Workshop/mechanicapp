import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, TextInput } from 'react-native'
import { styles } from '../../../assets/Styles';
import userContext from '../../contexts/userContext';
import { mainColor, mainWhite, off, offCol, secondWhite } from '../../../assets/colors';
import { baseApiUrl, urlService, } from '../../../util';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [txt1, setTxt1] = useState('');
    const [txt2, setTxt2] = useState('');
    const [active, setActive] = useState();
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const context = useContext(userContext);

    const isSuccess = async () => {
        
        var formdata = new FormData();
        formdata.append("email", txt1);
        formdata.append("password", txt2);
        
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        
        await fetch(baseApiUrl + 'api/login', requestOptions)
            .then(response => response.text())
            .then((data) => {
                data = JSON.parse(data);
                console.log(data['success']);
                if (!data['success']) {
                    Alert.alert("", data['message']);
                    setLoading(false);
                } else {
                    console.log("LOGIN: ", data['data'])
                    context[1](true);
                    context[3](data['data']['token']);
                    context[5](data['data']['name']);

                    setLoading(false);
                    Toast.show({
                        position: 'top',
                        text1: 'Та амжилттай нэвтэрлээ',
                        visibilityTime: 3000,
                        autoHide: true,
                        onShow: () => { },
                        onHide: () => { }
                    });
                    navigation.navigate('home', { screen: 'HomeScreen' });
                    if(isRemember){
                        setCredentials();
                    } else{
                        setTxt1("");
                        setTxt2("");
                        removeCredentials();
                    }
                    
                    setActive("");
                    setActive(null);
                    setVisible(true);
                }
            })
            .catch((error) => {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Таны оруулсан мэдээлэл буруу байна.',
                    visibilityTime: 3000,
                    autoHide: true,
                    onShow: () => { },
                    onHide: () => { }
                });
                /* Alert.alert("", 'Таны оруулсан мэдээлэл буруу байна.'), */
                setLoading(false);
            });
    };

    async function setCredentials() {
        try {
            await AsyncStorage.setItem('username', txt1);
            await AsyncStorage.setItem('password', txt2);
            console.log('Credentials successfully stored');
        } catch (error) {
            console.log('Error saving credentials: ', error);
        }
    };

    async function getCredentials() {
        try {
            const username = await AsyncStorage.getItem('username');
            const password = await AsyncStorage.getItem('password');
            if (username !== null && password !== null) {
                setTxt1(username);
                setTxt2(password);
                setIsRemember(true);
                return { username, password };
            } else {
                console.log('No credentials found');
                return null;
            }
        } catch (error) {
            console.log('Error retrieving credentials: ', error);
            return null;
        }
    };

    async function removeCredentials() {
        try {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
          console.log('Credentials removed');
        } catch (error) {
          console.log('Error removing credentials: ', error);
        }
    };

    useEffect(() => {
        getCredentials();
    }, []);

    return (
        <SafeAreaView style={[styles.mainContainer, { backgroundColor: secondWhite }]}>
            <ScrollView style={[styles.container, { paddingTop: 0, backgroundColor: secondWhite }]}>
                <Image source={require("../../../assets/images/graphic2.png")} style={{
                    alignSelf: "center", maxHeight: 50, height: 50, width: 120, marginTop: 40
                }} />
                <View style={{ marginVertical: 50, marginHorizontal: 45 }}>
                    <Text style={[styles.fatTitle, { color: mainColor, fontSize: 22, textAlign: "center", textTransform: "uppercase" }]}>GARAGE.MN</Text>
                    <Text style={[styles.fatTitle, { color: mainColor, fontSize: 14, textAlign: "center" }]}>Засварын систем</Text>
                </View>
                <View style={{ flex: 1, padding: 40, paddingTop: 0 }}>
                    <View style={[customStyles.input, active == 1 ? { borderColor: mainColor, borderWidth: 0.5 } : null]}>
                        <TextInput onSubmitEditing={() => setActive("")} onFocus={() => setActive(1)} value={txt1} onChangeText={txt1 => setTxt1(txt1)} placeholderTextColor={offCol} placeholder="И-мэйл хаяг" style={[styles.title, { width: "85%", }]}></TextInput>
                        <FontAwesome name="envelope" color={active == 1 ? mainColor : offCol} size={25} style={{ position: "absolute", right: 20, alignSelf: "center" }} />
                    </View>
                    <View style={[customStyles.input, active == 2 ? { borderColor: mainColor, borderWidth: 0.5 } : null]}>
                        <TextInput onSubmitEditing={() => setActive("")} secureTextEntry={visible} onFocus={() => setActive(2)} value={txt2} onChangeText={txt2 => setTxt2(txt2)} placeholderTextColor={offCol} placeholder="Нууц үг" style={[styles.title, { width: "85%" }]}></TextInput>
                        {
                            visible ? (
                                <TouchableOpacity onPress={() => setVisible(false)} style={{ position: "absolute", right: 20, alignSelf: "center" }}>
                                    <FontAwesome5 name="lock" color={active == 2 ? mainColor : offCol} size={20} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setVisible(true)} style={{ position: "absolute", right: 20, alignSelf: "center" }}>
                                    <FontAwesome5 name="lock-open" color={active == 2 ? mainColor : offCol} size={20} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <TouchableOpacity onPress={() => setIsRemember(!isRemember)} style={{ flexDirection: "row", alignItems: "center", paddingTop: 10, paddingLeft: 10 }}>
                        {
                            isRemember ? (
                                <MaterialCommunityIcons name="checkbox-marked-circle" color={isRemember ? mainColor : offCol} size={20} />
                            ) : (
                                <MaterialCommunityIcons name="checkbox-blank-circle-outline" color={active == 2 ? mainColor : offCol} size={20} />
                            )
                        }
                        <Text style={[styles.txtOff, isRemember ? { color: mainColor, marginLeft: 5 } : { marginLeft: 5 }]}>Нэр, нууц үг сануулах</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => isSuccess(setLoading(true))} style={[styles.btn, { flex: 0, marginVertical: 20 }]}>
                        {
                            loading ? (
                                <ActivityIndicator size="small" color={mainWhite} />
                            ) : (
                                <Text style={{ textTransform: 'uppercase', fontSize: 12, color: 'white', fontWeight: '700' }}>Нэвтрэх</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;

const customStyles = StyleSheet.create({
    input: {
        width: '100%', paddingLeft: 20, borderRadius: 20, backgroundColor: mainWhite, color: 'black', marginVertical: 10, fontSize: 12, borderColor: off, borderWidth: 1, flexDirection: "row", height: 45
    },
    btn: {
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: mainColor,
        paddingHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row',
    }
});



