import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, useWindowDimensions, RefreshControl, Alert } from 'react-native'
import { styles } from '../../../assets/Styles'
import { lightBlack, off } from '../../../assets/colors'
import userContext from '../../contexts/userContext';
import { runApiGetData } from '../../utils/service';
import RenderHtml from 'react-native-render-html';

const HomeScreen = () => {
    const contentWidth = useWindowDimensions().width;
    const context = useContext(userContext);
    const [safetyInstruction, setSafeInstruction] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getWorkerList();
    }, []);

    const getWorkerList = async () => {
        try {
            let response = await runApiGetData(
                'api/safetyguide',
                context[2],
                ''
            );
            setSafeInstruction(response?.data?.safetyinstruction)
        } catch (err) {
            Alert.alert('Error: ' + err.message);
        }
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
                <Text style={[styles.bigTitle, { marginHorizontal: 20 }]}>
                    Аюулгүй байдлын зааварчилгаа
                </Text>
                <ScrollView contentContainerStyle={[styles.container, { paddingTop: 0}]}>
                    <View style={[styles.card, { flex: 0 }]}>
                        <View style={{ marginHorizontal: 20 }}>
                            <View style={{ flex: 1 }}>
                                <WebDisplay html={safetyInstruction} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
        fontSize: 14,
        width: "50%",
        textAlign: "justify"
    }
})

export default HomeScreen;