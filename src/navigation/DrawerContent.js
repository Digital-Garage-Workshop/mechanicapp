import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Pressable, ImageBackground, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { lightBlack, mainColor, mainWhite, off, secondWhite } from '../../assets/colors';
import userContext from '../contexts/userContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { urlName } from '../../util';
import Toast from 'react-native-toast-message';
import { styles } from '../../assets/Styles';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';
import { runService } from '../utils/service';

export default function DrawerContent(props) {
    const context = useContext(userContext);
    const [count, setCount] = useState('');
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState("HomeScreen");
    const toggleModal = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        getNotifCount();
    }, [context[0]]);

    const getNotifCount = async () => {
        try {
            const response = await runService(
                'NOTIFOCATION_COUNT_SERVICE',
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

    return (
        <View style={{ backgroundColor: secondWhite, height: "100%" }}>
            {
                context[0] ? (<>
                    <Pressable onPress={() => { context[0] ? props.navigation.navigate('profile', { screen: "ProfileScreen" }) : null, context[0] ? setActive("HomeScreen") : null }} style={[customStyles.userInfoSection]}>
                        <View style={customStyles.shadowBG} />
                        <View style={{ flexDirection: "row", position: "absolute", bottom: 10, left: 20 }}>
                            {
                                context[10] ? (
                                    <Image
                                        source={{ uri: urlName + context[10] }}
                                        style={{ width: 65, height: 65, borderRadius: 65, overflow: 'hidden', color: mainWhite }}
                                        resizeMethod='scale'
                                        resizeMode='cover'
                                    />
                                ) : (
                                    <FontAwesome name="user-circle-o" size={65} style={{ color: mainWhite }} />
                                )
                            }
                            <View style={{ marginLeft: 15, alignSelf: "center" }}>
                                <Text style={[customStyles.title, { marginBottom: 10, color: mainWhite }]}>{context[4] ? context[4] : "Зочин"}</Text>
                                <Text style={[customStyles.text, { color: mainWhite }]}>{context[12] ? context[12] : "---"}</Text>
                            </View>
                        </View>
                    </Pressable>
                    <ScrollView style={customStyles.drawerContent} {...props}>
                        <View style={{ borderBottomColor: off, borderBottomWidth: 0.5, paddingBottom: 20, }}>
                            <TouchableOpacity onPress={() => { props.navigation.navigate('home', { screen: "HomeScreen" }), setActive("HomeScreen") }} style={[customStyles.drawerContainer, active == "HomeScreen" ? customStyles.activeDrawerContainer : null]}>
                                <Fontisto name="home" color={active == "HomeScreen" ? mainWhite : lightBlack} size={22} style={customStyles.drawerImg} />
                                <Text style={[customStyles.drawerTxt, active == "HomeScreen" ? { color: mainWhite } : null]}>Хянах самбар</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => {props.navigation.navigate('jobs', { screen: "MainJobScreen" }), setActive("JobScreen") }} style={[customStyles.drawerContainer, active == "JobScreen" ? customStyles.activeDrawerContainer : null]}>
                                <Fontisto name="list-1" color={active == "JobScreen" ? mainWhite : lightBlack} size={22} style={customStyles.drawerImg} />
                                <Text style={[customStyles.drawerTxt, active == "JobScreen" ? { color: mainWhite } : null]}>Ажлын жагсаалт</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleModal} style={[customStyles.drawerContainer, { marginBottom: 40 }]}>
                                <Entypo name="user" color={lightBlack} size={22} style={customStyles.drawerImg} />
                                <Text style={customStyles.drawerTxt}>Гарах</Text>
                            </TouchableOpacity> 
                        </View>
                        <Text style={[{marginLeft: 20, marginTop: 20}]}>
                            <FontAwesome name="copyright" color={lightBlack} size={12} style={[customStyles.drawerImg]} />
                            <Text style={[{color: lightBlack, paddingLeft: 20}]}> Develop by GARAGE.MN</Text>
                        </Text>
                    </ScrollView>
                    <Modal onSwipeComplete={toggleModal} swipeDirection="left" isVisible={visible} onBackdropPress={toggleModal}>
                        <View style={customStyles.modalContainer}>
                            <View style={{ alignItems: "center", marginBottom: 30 }}>
                                <Image source={require("../../assets/images/graphic2.png")} resizeMode='contain' style={{ maxWidth: 70, maxHeight: 70, height: 70, width: 70 }} />
                                <Text style={[styles.title, { marginTop: 20, marginBottom: 10, fontSize: 16 }]}>Анхааруулга</Text>
                                <Text style={[styles.title, { fontWeight: "400" }]}>Та системээс гарахдаа итгэлтэй байна уу?</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 20, justifyContent: "center", alignSelf: "center" }}>
                                <TouchableOpacity onPress={() => setVisible(false)} style={[styles.btn, { padding: 20, borderWidth: 1, borderColor: mainColor, backgroundColor: mainWhite, flex: 0, marginRight: 20 }]}>
                                    <Text style={[styles.title, { color: mainColor }]}>Үгүй</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    props.navigation.navigate("login", { screen: "LoginScreen" }),
                                        context[3](''),
                                        context[1](false),
                                        context[5](''),
                                        Toast.show({
                                            type: 'error',
                                            position: 'top',
                                            text1: 'Та системээс гарлаа',
                                            visibilityTime: 3000,
                                            autoHide: true,
                                            onShow: () => { },
                                            onHide: () => { }
                                        }),
                                        context[3](""),
                                        context[5](""),
                                        context[9](""),
                                        context[11](""),
                                        context[13](""),
                                        setVisible(false);
                                }} style={[styles.btn, { padding: 20, borderWidth: 1, borderColor: mainColor, flex: 0 }]}>
                                    <Text style={[styles.title, { color: mainWhite }]}>Тийм</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={toggleModal} style={{ position: 'absolute', paddingHorizontal: 10, paddingVertical: 10, borderBottomLeftRadius: 8, top: 0, right: 0, backgroundColor: mainColor, flex: 1, }}>
                                <Feather name="x-circle" size={15} color={mainWhite} />
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </>) : 
                <>
                    <ScrollView>
                        <View style={{
                            paddingTop: 20, flex: 1,
                            justifyContent: 'flex-start',
                        }}>
                            <Text style={[{marginLeft: 20, marginTop: 20}]}>
                                <Text style={[{color: lightBlack, paddingLeft: 20}]}> GARAGE.MN - Засварын систем</Text>
                            </Text>
                            <View>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('login', { screen: 'LoginScreen' }), setActive("LoginScreen") }} style={[customStyles.drawerContainer, active == "LoginScreen" ? customStyles.activeDrawerContainer : null, { marginBottom: 0 }]}>
                                    <FontAwesome name="user" color={active == "LoginScreen" ? mainWhite : lightBlack} size={24} style={customStyles.drawerImg} />
                                    <Text style={[customStyles.drawerTxt, active == "LoginScreen" ? { color: mainWhite } : null]}>Нэвтрэх</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderBottomColor: off, borderBottomWidth: 0.5, paddingBottom: 20, }}>
                                <TouchableOpacity onPress={() => { props.navigation.navigate('login', { screen: 'HelpScreen' }), setActive("HelpScreen") }} style={[customStyles.drawerContainer, active == "HelpScreen" ? customStyles.activeDrawerContainer : null, { marginBottom: 0 }]}>
                                    <FontAwesome name="question-circle" color={active == "HelpScreen" ? mainWhite : lightBlack} size={24} style={customStyles.drawerImg} />
                                    <Text style={[customStyles.drawerTxt, active == "HelpScreen" ? { color: mainWhite } : null]}>Тусламж</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[{marginLeft: 20, marginTop: 20}]}>
                                <FontAwesome name="copyright" color={lightBlack} size={12} style={[customStyles.drawerImg]} />
                                <Text style={[{color: lightBlack, paddingLeft: 20}]}> Develop by GARAGE.MN</Text>
                            </Text>
                        </View>
                    </ScrollView>
                </>
            }
            
        </View>
    );
};

const customStyles = StyleSheet.create({
    drawerContent: {
        height: "100%",
        paddingTop: 20,
        backgroundColor: secondWhite,
    },
    modalContainer: {
        backgroundColor: mainWhite, paddingTop: 50, paddingHorizontal: 20, borderRadius: 12, marginHorizontal: 0,
        overflow: 'hidden', position: 'relative', bottom: 0
    },
    userInfoSection: {
        borderBottomLeftRadius: 0,
        overflow: "hidden",
    },
    title: {
        fontSize: 14,
        marginTop: 3,
        fontWeight: 'bold',
        color: lightBlack
    },
    text: {
        color: lightBlack,
        fontWeight: 'bold',
        fontSize: 14
    },
    drawerContainer: { flexDirection: 'row', flex: 1, marginVertical: 10, marginHorizontal: 20, alignItems: 'center', paddingVertical: 10, paddingLeft: 5 },
    subContainer: { flexDirection: 'row', flex: 1, marginVertical: 10, marginHorizontal: 20, alignItems: 'center', paddingLeft: 5 },
    drawerTxt: {
        fontSize: 14,
        color: lightBlack,
        fontWeight: "600",
    },
    drawerImg: {
        width: 40,
        alignItems: "center",
        textAlign: "center",
        marginRight: 10
    },
    toggleImg: {
        marginLeft: '20%',
        color: lightBlack,
        fontWeight: "bold",
        marginRight: 2
    },
    subMenu: {
        marginLeft: 10, width: "80%"
    },
    shadowBG: { paddingLeft: 20, paddingBottom: 50, paddingTop: 40, backgroundColor: mainColor, opacity: 0.8 },
    insideTxt: { marginLeft: 10, color: mainWhite, position: "absolute" },
    activeDrawerContainer: { backgroundColor: mainColor, borderRadius: 20, }
});