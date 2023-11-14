import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, useWindowDimensions, StyleSheet, FlatList } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useIsFocused } from "@react-navigation/native"
import { darkGrey, lightBlack, mainColor, mainGrey, mainWhite, off } from '../../../assets/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import userContext from '../../contexts/userContext';
import { runApiData, runApiGetData, runApiPostData } from '../../utils/service';
import OffCard from '../../components/common/OffCard';
import { styles } from '../../../assets/Styles';
import SingleInput from '../../components/usage/registration/SingleInput';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal'

const JobDetail = (prop) => {
    const contentWidth = useWindowDimensions().width;
    const itemData = prop.route.params?.data;
    const navigation = prop?.navigation;
    const context = useContext(userContext);
    const [isChecked, setIsChecked] = useState([]);
    const [isHandled, setIsHandled] = useState(false);
    
    let whtKeyboard = navigation?.isNumber ? 'decimal-pad' : 'default';
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    const [isStart, setIsStart] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    
    const [itemArr, setItemArr] = useState();
    const [checkListArr, setCheckListArr] = useState();
    const [repairNote, setRepairnote] = useState("");
    const [changePart, setChangepart] = useState("");
    const [kilometr, setKilometr] = useState("");
    const [visible, setVisible] = useState(false);
    const [measureType, setMeasureType] = useState({
        param: "km",
        name: "Kilometr"
    });
    console.log("isChecked === ", isChecked);
    
    function addItem(itemId) {
        if (isChecked.indexOf(itemId.toString()) > -1) {
            var index = isChecked.indexOf(itemId.toString());
            isChecked.splice(index, 1);
        } else {
            isChecked.push(itemId.toString());
        }

        console.log("isChecked === ",isChecked);
        setIsChecked(isChecked);
        setIsHandled(true);
    };
    
    function handleItem(itemId) {
        if (isChecked.indexOf(itemId.toString()) > -1) {
            setIsHandled(false);
            return true;
        } else {
            return false;
        }
    };

    const toggleModal = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        setLoading(true);
        setIsChecked([]);
        setIsHandled(false);
        
        if (isFocused){ 
            getItemData();
            getCheckListData();
        }

        console.log("useEffect ran...");
        switch (itemData?.status) {
            case 'created':
                setIsStart(false);
                setIsFinish(false);
                break;
            case 'repairing':
                setIsStart(true);
                setIsFinish(false);
                break;
            case 'finished':
                setIsStart(true);
                setIsFinish(true);
                break;
            default:
                setIsStart(false);
                setIsFinish(false);
                break;
        }
        
        setLoading(false);
    }, [prop, isFocused]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: mainWhite,
            // title: route.params.title,
            title: 'Ажлын дэлгэрэнгүй',
            headerStyle: {
                backgroundColor: mainColor
            },
            headerLeft: () => (
                <FontAwesome5.Button name="chevron-left" size={14} backgroundColor={mainColor} onPress={isBack}></FontAwesome5.Button>
            ),
        });
    }, []);

    const isBack = () => {
        setIsStart(false);
        navigation.navigate("MainJobScreen", { screen: "JobScreen" });
        return false;
    }; 

    const getItemData = async () => {
    
        let response = await runApiData(
            context[2],
            itemData.jobid
        );

        setItemArr(response);
    };

    const getCheckListData = async () => {
        let response = await runApiGetData(
            'api/checklist',
            context[2],
            ''
        );
        console.log('checklist', response?.data);
        setCheckListArr(response?.data);
    };

    const actionRequest = async () => {
        let url = isStart ? 'api/jobend/' : 'api/jobstart/';
        let response = await runApiGetData(
            url,
            context[2],
            itemArr.jobid
        );
        if (response?.success == false) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: "Анхааруулга",
                text2: `${response?.message}`,
                visibilityTime: 3000,
                autoHide: true,
                onShow: () => { },
                onHide: () => { }
            });
            return false;
        }

        setIsStart(true);
        Toast.show({
            position: 'top',
            text1: `${response?.data}`,
            visibilityTime: 3000,
            autoHide: true,
            onShow: () => { },
            onHide: () => { }
        });

        getItemData();
    };

    const kiloRequest = async () => {

        if (!kilometr) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Санамж.',
                text2: 'Километрийн заалтаа оруулна уу.',
                visibilityTime: 3000,
                autoHide: true,
                onShow: () => { },
                onHide: () => { }
            });
            return false;
        } else {
            const FormData = require('form-data');
            let data = new FormData();
            data.append('jobid', itemArr.jobid); //itemArr.jobid
            data.append('kilometr', kilometr);
            data.append('kilometrtype', measureType.param);
            
            let response = await runApiPostData(
                'api/kilometr',
                context[2],
                data
            );

            if (response?.success == false) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: "Анхааруулга",
                    text2: `${response?.message}`,
                    visibilityTime: 3000,
                    autoHide: true,
                    onShow: () => { },
                    onHide: () => { }
                });
                return false;
            }
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: "Амжилттай",
                text2: `${response?.data}`,
                visibilityTime: 3000,
                autoHide: true,
                onShow: () => { },
                onHide: () => { }
            });
        }
        getItemData();
    };

    const noteRequest = async () => {
        console.log('repairNote == ', repairNote);
        console.log('changePart == ', changePart);

        if (!repairNote) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Санамж.',
                text2: 'Засварын тэмдэглэл оруулна уу.',
                visibilityTime: 3000,
                autoHide: true,
                onShow: () => { },
                onHide: () => { }
            });
            return false;
        } else {
            const FormData = require('form-data');
            let formData = new FormData();
            formData.append('jobid', itemArr.jobid);
            formData.append('repairnote', repairNote);
            formData.append('changepart', changePart);

            let response = await runApiPostData(
                'api/note',
                context[2],
                formData
            );

            if (response?.success == false) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: "Анхааруулга",
                    text2: `${response?.message}`,
                    visibilityTime: 3000,
                    autoHide: true,
                    onShow: () => { },
                    onHide: () => { }
                });
                return false;
            }
            Toast.show({
                type: 'success',
                position: 'bottom',
                text1: "Амжилттай",
                text2: `${response?.data}`,
                visibilityTime: 3000,
                autoHide: true,
                onShow: () => { },
                onHide: () => { }
            });
        }
        getItemData();
    };

    const CheckListDisplay = (checkItems, checkIndex) => {
        const item = checkItems?.data;
        console.log('item', item);
        const checking = handleItem(item?.id);
        return (
            <TouchableOpacity key={checkIndex} onPress={() => addItem(item?.id)} style={[styles.card, (checking) ? { backgroundColor: mainColor } : mainWhite]}>
                <View style={[{ paddingHorizontal: 15, flex: 1, width: "80%" }]}>
                    <Text style={[styles.title, checking ? { color: mainWhite } : { color: darkGrey }]}>{item?.name}</Text>
                </View>
                {
                    checking ? (
                        <MaterialCommunityIcons name="checkbox-marked-circle" size={20} style={{ color: mainWhite, position: "absolute", right: 20 }} />
                    ) : (
                        <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} style={{ position: "absolute", right: 20 }} color={darkGrey} />
                    )
                }
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <ScrollView style={[styles.container]}>
                <View style={customStyles.bodyContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={true}
                        data={checkListArr}
                        initialNumToRender={7}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            {
                                return (
                                    isHandled ? (
                                            <CheckListDisplay key={index} data={item}  isMain={true}  index={index + 1} />
                                        )
                                        :  (
                                            <CheckListDisplay key={index} data={item}  isMain={false}  index={index + 1} />
                                        )
                                )
                            }
                            
                        }
                    />
                </View>
            {
                    isFinish ?  <></>
                    : 
                    isStart ? 
                        <>
                            <View style={customStyles.bodyContainer}>
                                <TouchableOpacity onPress={actionRequest} style={[styles.btnDanger, { alignSelf: "center", paddingHorizontal: "20%", marginTop: 0 }]}>
                                    <Text style={[styles.title, { color: mainWhite }]}>Ажил дуусгах</Text>
                                </TouchableOpacity>
                            </View>
                        </> : 
                        <>
                            <View style={customStyles.bodyContainer}>
                                <TouchableOpacity onPress={actionRequest} style={[styles.btn, { alignSelf: "center", paddingHorizontal: "20%", marginTop: 40 }]}>
                                    <Text style={[styles.title, { color: mainWhite }]}>Ажил эхлүүлэх</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                }
                <View style={customStyles.headerContainer}>
                    <OffCard label="Машины дугаар" value={itemArr?.carinfo.carnumber + ' | ' + itemArr?.jobid} icon={<MaterialIcons name="confirmation-number" size={25} color={mainColor} />} />
                    {
                        itemArr?.category?.name ? 
                        <>
                            <OffCard label="Category" value={itemArr?.category?.name} icon={<MaterialIcons name="confirmation-number" size={25} color={mainColor} />} />
                        </> : <></>
                    }
                    {
                        itemArr?.subcategory?.name ? 
                        <>
                            <OffCard label="Sub category" value={itemArr?.subcategory?.name} icon={<MaterialIcons name="confirmation-number" size={25} color={mainColor} />} />
                        </> : <></>
                    }
                    <OffCard label="Status" value={itemArr?.status} icon={<MaterialIcons name="confirmation-number" size={25} color={mainColor} />} />
                    {isFinish ? <></>
                        : 
                        isStart ? 
                            <>
                                <SingleInput label="Засварын тэмдэглэл" setValue={setRepairnote} value={repairNote} isMultiline={true} />
                                <SingleInput label="Солих шаардлагатай сэлбэг" setValue={setChangepart} value={changePart} isMultiline={true} />
                                <View style={customStyles.bodyContainer}>
                                    <TouchableOpacity onPress={noteRequest} style={[styles.btn, { alignSelf: "center", paddingHorizontal: "20%", marginTop: 10 }]}>
                                        <Text style={[styles.title, { color: mainWhite }]}>Тэмдэглэл оруулах</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            : <></>
                    }
                </View>
                <View style={customStyles.headerContainer}>
                    {
                    isFinish ? <></>
                        : 
                    isStart ? 
                        <>
                            <TouchableOpacity onPress={toggleModal} style={[customStyles.container, styles.card, { marginTop: 10 }]}>
                                <Text numberOfLines={2} style={[styles.txt, { width: "70%" }]}>{measureType ? measureType.name : "Сонгох"}</Text>
                                <Entypo name="chevron-right" size={20} color={mainColor} style={{ position: 'absolute', right: 5 }} />
                            </TouchableOpacity>
                            <SingleInput label="Гүйлт оруулах" isNumber={true} setValue={setKilometr} value={kilometr} isMultiline={true} />
                            <View style={customStyles.bodyContainer}>
                                <TouchableOpacity onPress={kiloRequest} style={[styles.btn, { alignSelf: "center", paddingHorizontal: "20%", marginTop: 10 }]}>
                                    <Text style={[styles.title, { color: mainWhite }]}>Хадгалах</Text>
                                </TouchableOpacity>
                            </View>
                            <Modal propagateSwipe={true} isVisible={visible} swipeDirection="left" style={customStyles.modalContainer} onBackdropPress={() => setVisible(false)}>
                                <View style={customStyles.modalLilContainer}>
                                    <ScrollView>
                                        <View style={customStyles.twoColContainerSelect}>
                                            <TouchableOpacity onPress={() => {
                                                setMeasureType({
                                                    param: "km",
                                                    name: "Kilometr"
                                                }), setVisible(false)
                                            }} style={customStyles.twoColItem}>
                                                <Text style={[styles.txt]}>Kilometr</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                setMeasureType({
                                                    param: "mile",
                                                    name: "Mile"
                                                }), setVisible(false)
                                            }} style={customStyles.twoColItem}>
                                                <Text style={[styles.txt]}>Mile</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                    <TouchableOpacity style={{ marginVertical: 10 }} onPress={toggleModal}>
                                        <Text style={[styles.txt, { alignSelf: 'center', fontSize: 14 }]}>Буцах</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                        </> : <></>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const customStyles = StyleSheet.create({
    headerContainer: {
        flex: 1, borderRadius: 5, marginBottom: 10, paddingVertical: 5, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: off
    },
    bodyContainer: {
        flex: 1, borderRadius: 5, marginBottom: 10, paddingVertical: 5, paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        paddingBottom: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    modalContainer: {
        justifyContent: "flex-end",
        margin: 0,
        position: "relative",
        bottom: 0,
        right: 0,
    },
    modalLilContainer: {
        padding: 25, backgroundColor: mainWhite, borderTopLeftRadius: 30, borderTopRightRadius: 30, maxHeight: '70%'
    },
    twoColContainer: {
        marginHorizontal: 20, marginBottom: 80, flex: 1, flexDirection: 'row', display: 'flex', flexWrap: 'wrap', justifyContent: "space-between"
    },
    twoColContainerSelect: {
        marginHorizontal: 20, marginVertical: 10, flex: 1
    },
    twoColItem: {
        padding: 10, borderRadius: 12, margin: 1, backgroundColor: mainWhite, minHeight: 50,
        alignItems: 'center', justifyContent: 'center', shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 3.49,
        elevation: 9,
    },
    section: {
        borderBottomWidth: 1, borderBottomColor: off, paddingVertical: 10, flexDirection: 'row', alignItems: 'center',
        marginBottom: 20
    },
    value: {
        width: "55%",
        textAlign: "justify"
    },
    btn: {
        backgroundColor: mainColor, borderRadius: 20, alignItems: 'center', paddingVertical: 10, width: "80%", alignSelf: "center"
    },
    container: {
        flex: 1, marginHorizontal: 0, marginBottom: 20, paddingHorizontal: 20
    },
    label: {
        color: lightBlack, fontSize: 12
    },
    value: {
        color: lightBlack, fontWeight: '500', marginVertical: 5, fontSize: 12, paddingBottom: 5
    }
});
export default JobDetail;



