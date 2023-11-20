import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, RefreshControl, Alert , Pressable} from 'react-native'
import { styles } from '../../../assets/Styles'
import { lightBlack, mainWhite, mainColor, off } from '../../../assets/colors'
import userContext from '../../contexts/userContext';
import { runApiGetData } from '../../utils/service';
import RenderHtml from 'react-native-render-html';
import Modal from 'react-native-modal'

const HomeScreen = () => {
    const contentWidth = useWindowDimensions().width;
    const context = useContext(userContext);
    const [safetyInstruction, setSafeInstruction] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setModalVisible(true);
        getWorkerList();
    }, []);

    const getWorkerList = async () => {
        try {
            let response = await runApiGetData(
                'api/safetyguide',
                context[2],
                ''
            );
            setSafeInstruction(response?.data?.safetyinstruction);
        } catch (err) {
            Alert.alert('Error: ' + err.message);
        }

        setModalVisible(true);
        setRefreshing(false);
    };
    
    function WebDisplay({html}) {
        const {width: contentWidth} = useWindowDimensions();
        const tagsStyles = {
            a: {
                textDecorationLine: 'none',
            },
            p: { textAlign: 'justify' },
            span: { textAlign: 'justify' },
            ul: { textAlign: 'justify' },
            li: { textAlign: 'justify' },
            ol: { textAlign: 'justify' },
            div: { textAlign: 'justify' }
        };
        return (
          <RenderHtml
            contentWidth={contentWidth}
            source={{html}}
            tagsStyles={tagsStyles}
          />
        );
    }

    useEffect(() => {
        getWorkerList();
    }, [context[8]]);

    function WebDisplay({html}) {
        const {width: contentWidth} = useWindowDimensions();
        const tagsStyles = {
            a: {
                textDecorationLine: 'none',
            },
            p: { textAlign: 'justify' },
            span: { textAlign: 'justify' },
            ul: { textAlign: 'justify' },
            li: { textAlign: 'justify' },
            ol: { textAlign: 'justify' },
            div: { textAlign: 'justify' }
        };
        return (
          <RenderHtml
            contentWidth={contentWidth}
            source={{html}}
            tagsStyles={tagsStyles}
          />
        );
    }
    return (
        modalVisible ? 
        <>
            <View style={customStyles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={customStyles.centeredView}>
                        <View style={customStyles.modalView}>
                            <Text style={[styles.bigTitle, { marginHorizontal: 0 }]}>
                                Аюулгүй байдлын зааварчилгаа
                            </Text>
                            <ScrollView>
                                <WebDisplay html={safetyInstruction} />
                            </ScrollView>
                            <Pressable
                            style={[customStyles.button, customStyles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={customStyles.textStyle}>Танилцсан</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                </View>
        </> : 
        <>
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView style={styles.container} refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } >
                    <View style={[styles.card, { flex: 0, marginBottom: 0 }]}>
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={customStyles.row}>
                                <Text style={[styles.title]}>Ажилтаны мэдээлэл</Text>
                            </View>
                            <View style={customStyles.row}>
                                <Text style={[styles.titleOff, { width: "40%" }]}>Овог/Нэр:</Text>
                                <Text style={[styles.title, customStyles.value, { fontWeight: "400" }]}>{context[4] ? context[4] : "..."}</Text>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        style={[{marginHorizontal: 20, fontSize: 12, marginTop: 20}, customStyles.button, customStyles.buttonOpen]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={customStyles.textStyle}>Аюулгүй байдлын зааварчилгаа танилцах</Text>
                    </Pressable>
                </ScrollView>
            </SafeAreaView>
        </>
        
    )
}

const customStyles = StyleSheet.create({
    line: {
        borderBottomColor: off, borderBottomWidth: 1, right: 10, alignSelf: 'center', position: 'absolute', width: "50%"
    },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    value: {
        color: lightBlack,
        fontSize: 14,
        width: "50%",
        textAlign: "justify"
    },
    twoColContainerSelect: {
        marginHorizontal: 20, marginVertical: 10, flex: 1
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 5
      },
      buttonOpen: {
        backgroundColor: mainColor,
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
    
})

export default HomeScreen;