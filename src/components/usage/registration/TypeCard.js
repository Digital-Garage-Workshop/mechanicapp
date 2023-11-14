import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Linking, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { mainColor, mainWhite, off, offCol } from '../../../../assets/colors'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import { styles } from '../../../../assets/Styles'
import PDFView from 'react-native-view-pdf/lib/index'
import { urlName } from '../../../util'
import TypeModalItem from './TypeModalItem'

const TypeCard = props => {
    var data = props?.data;
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    const shouldOpen = () => {
        if (props?.shouldOpen) {
            showModal();
        } else {
            Alert.alert("", "Та тусгай зөвшөөрлийн дугаар аа сонгоно уу !")
        };
    };

    return (
        <TouchableOpacity onPress={shouldOpen} style={[styles.card, { paddingVertical: 15 }]}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: "20%", alignItems: "center", justifyContent: "center", borderRightColor: off, borderRightWidth: 1 }}>
                    <MaterialCommunityIcons name="tune" size={25} color={mainColor} />
                </View>
                <View style={{ width: "70%", paddingHorizontal: 20 }}>
                    <Text numberOfLines={1} style={styles.fatTxt}>{props.selectedType?.booktypename ? props.selectedType.booktypename : "Сонгох"}</Text>
                    <Text numberOfLines={1} style={[styles.txtOff, { marginTop: 3 }]}>Төрөл</Text>
                </View>
            </View>
            <Entypo name="chevron-right" size={20} color={mainColor} style={{ position: 'absolute', right: 10 }} />
            <Modal style={customStyles.modalContainer} onSwipeComplete={hideModal} isVisible={visible} onBackdropPress={hideModal}>
                <View style={customStyles.modalLilContainer}>
                    {
                        data ? (
                            <FlatList
                                showsVerticalScrollIndicator={true}
                                data={data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) =>
                                    item.id ? <TypeModalItem key={index} data={item} setSelectedType={props?.setSelectedType} selectedType={props?.selectedType} hideModal={hideModal} setWholeItemArr={props?.setWholeItemArr} setItemArr={props?.setItemArr} /> : null
                                }
                            />
                        ) : (
                            <ActivityIndicator size="small" style={{ marginVertical: 250 }} />
                        )
                    }
                    <TouchableOpacity onPress={hideModal} style={customStyles.xBtn}>
                        <Feather name="x-circle" size={15} color={mainWhite} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </TouchableOpacity>
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

export default TypeCard;




