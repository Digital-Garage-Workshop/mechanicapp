import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, useWindowDimensions, StyleSheet, FlatList, RefreshControl, Image } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useIsFocused } from "@react-navigation/native"
import { darkGrey, lightBlack, mainColor, mainGrey, mainWhite, off } from '../../../assets/colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import userContext from '../../contexts/userContext';
import { runApiData, runApiGetData, runApiPostData } from '../../utils/service';
import HistoryCard from '../../components/job/HistoryCard';
import OffCard from '../../components/common/OffCard';
import { styles } from '../../../assets/Styles';
import Toast from 'react-native-toast-message';

const JobHistory = (prop) => {
    const contentWidth = useWindowDimensions().width;
    const itemData = prop.route.params?.data;
    const navigation = prop?.navigation;
    const context = useContext(userContext);
    
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    const [itemArr, setItemArr] = useState();

    useEffect(() => {
        setLoading(true);
        if (isFocused){ 
            getItemData();
        }

        console.log("useEffect ran...");
        
        setRefreshing(false);
        setLoading(false);
    }, [prop, isFocused]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTintColor: mainWhite,
            title: 'Засварын түүх',
            headerStyle: {
                backgroundColor: mainColor
            },
            headerLeft: () => (
                <FontAwesome5.Button name="chevron-left" size={14} backgroundColor={mainColor} onPress={isBack}></FontAwesome5.Button>
            ),
        });
    }, []);

    const isBack = () => {
        navigation.navigate("MainJobScreen", { screen: "JobScreen" });
        return false;
    }; 

    const getItemData = async () => {
        let response = await runApiGetData(
            'api/carhistory/',
            context[2],
            itemData.jobid
        );
            console.log('response', response?.data);
            const data = response?.data;
        setItemArr(data);
        setRefreshing(false);
    };

    const renderHistoryData = () => {
        if (itemArr?.length > 0) {
            return (
                <>
                    <FlatList
                        showsVerticalScrollIndicator={true}
                        data={itemArr}
                        initialNumToRender={7}
                        style={{ marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <HistoryCard key={index} data={item} isMain={true} index={index + 1} />
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    getItemData(setRefreshing(true));
                                }}
                            />
                        }
                    />
                </>
                
            )
        } else {
            return (
                <>
                    <ScrollView style={styles.container} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                refreshData(setRefreshing(true));
                                setCurrentPage(1);
                            }}
                        />
                    } >
                        <Image source={require('../../../assets/images/nodata.png')} resizeMethod='resize' resizeMode='contain' style={{ marginVertical: 100, alignSelf: "center", width: "30%", height: 200 }} />
                    </ScrollView>
                </>
                
            )
        }
    };

    return (
        <>
            {renderHistoryData()}
        </>
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

export default JobHistory;



