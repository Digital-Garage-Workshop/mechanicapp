import { View, SafeAreaView, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, RefreshControl, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from '../../../assets/Styles'
import { mainColor, mainWhite, off } from '../../../assets/colors'
import Feather from 'react-native-vector-icons/Feather';
import userContext from '../../contexts/userContext';
import { dvCommand } from '../../../util';
import { runService } from '../../utils/service';
import { filter, groupBy } from 'lodash';
import BottomSum from '../../components/common/BottomSum';
import NotificationCard from '../../components/notification/NotificationCard';

const NotificationListScreen = (props) => {
    const setCountFnc = props.route.params.getNotifCount;
    const context = useContext(userContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [totalcount, setTotalCount] = useState('');
    const [filterdTotalCount, setFilterdTotalCount] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const [groupedData, setGroupedData] = useState('');
    const [keyData, setKeyData] = useState('');

    const [refreshing, setRefreshing] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        runDataView();
    }, [currentPage]);

    useEffect(() => {
        setLoading(true);
    }, []);

    const runDataView = async () => {
        let response = await runService(
            dvCommand,
            {
                systemmetagroupid: 1661229986194796,
                paging: {
                    offset: currentPage,
                    pagesize: '50',
                },
                criteria: {
                    ["filtercustomerid"]: [
                        {
                            operator: "=",
                            operand: context[8]
                        },
                    ]
                },
            },
            context[2]
        );
        let result = filter(response, a => a.id);
        let total = filter(response, a => a.totalcount);

        let grouped = groupBy(result, "id")
        let keyAll = Object.keys(grouped);
        setKeyData(keyAll);
        setGroupedData(grouped);
        setData(result);
        setFilteredData([...filteredData, ...result]);
        setTotalCount(total[0]['totalcount'] ? total[0]['totalcount'] : "");
        setFilterdTotalCount(total[0]['totalcount'] ? total[0]['totalcount'] : "");
        setLoading(false);
        setRefreshing(false);
        setLoadMore(false);
    };

    const getData = async (data) => {
        try {
            const response = await runService(
                'NOTIFICATION_DATA',
                {
                    id: data?.id
                },
                context[2],
            );
            postReq(response);
        } catch (err) {
            Alert.alert('Error: ' + err.message);
        }
    };

    const postReq = async (data) => {
        let response = await runService(
            "REFRESH_NOTIFICATION_LIST",
            {
                "id": data?.id,
            },
            context[2]
        );
        response ? setCountFnc() : null
        response ? refreshData() : null
    };

    const refreshData = async () => {
        let response = await runService(
            dvCommand,
            {
                paging: {
                    offset: '1',
                    pagesize: '50',
                },
            },
            context[2]
        );
        let result = filter(response, a => a.id);

        let total = filter(response, a => a.totalcount);

        setData(result);
        setFilteredData(result);
        setTotalCount(total[0]['totalcount'] ? total[0]['totalcount'] : "");
        setFilterdTotalCount(total[0]['totalcount'] ? total[0]['totalcount'] : "");
        setLoading(false);
        setRefreshing(false);
        setLoadMore(false);
    };

    const loadMoreBtn = () => {
        if (filteredData.length < totalcount) {
            setLoadMore(true);
            setCurrentPage(currentPage + 1);
        } else {
            setLoadMore(false)
        }
    };

    const renderData = () => {
        if (filteredData?.length > 0) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={filteredData}
                    initialNumToRender={7}
                    style={{ marginBottom: 40 }}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <NotificationCard data={item} index={index + 1} wholeData={filteredData} setWholeData={setFilteredData} getData={getData} />
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {
                                refreshData(setRefreshing(true));
                                setFilteredData([]);
                                setCurrentPage(1);
                            }}
                        />
                    }
                    ListFooterComponent={() => {
                        if (filteredData.length < totalcount) {
                            return (
                                <TouchableOpacity onPress={loadMoreBtn} style={{ marginBottom: 100, marginTop: 20, backgroundColor: mainColor, borderRadius: 30, padding: 10, flex: 0, alignSelf: "center", alignItems: "center" }}>
                                    <Feather name="arrow-down" size={30} color={mainWhite} style={{ fontWeight: "bold" }} />
                                </TouchableOpacity>
                            )
                        } else {
                            return null
                        }
                    }}
                />
            )
        } else {
            return (
                <Image source={require('../../../assets/images/nodata.png')} resizeMethod='resize' resizeMode='contain' style={{ marginVertical: 100, alignSelf: "center", width: "30%", height: 200 }} />
            )
        }

        // if (keyData) {
        //     return keyData.map(item => {
        //         return (
        //             <>
        //                 <Text style={[styles.title, { marginHorizontal: 10, marginVertical: 10 }]}>{item}</Text>
        //                 {
        //                     groupedData[item]?.map(val => {
        //                         return <NotificationCard data={val} index={val + 1} getData={getData} />
        //                     })
        //                 }
        //             </>
        //         )
        //     })
        // }
    };

    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <View
                style={[styles.container, { paddingBottom: 30 }]}>
                {
                    loading ? (
                        <ActivityIndicator size="small" style={{ marginVertical: 250 }} />
                    ) : null
                }
                {
                    renderData()
                }
            </View>
            <BottomSum sum={filterdTotalCount} current={filteredData.length} />
        </SafeAreaView>
    );
};

const customStyles = StyleSheet.create({
    container: {
        flex: 1, borderRadius: 5, borderWidth: 1, borderColor: off, marginBottom: 10, paddingVertical: 5, paddingHorizontal: 10
    },
    modalContainer: {
        justifyContent: "flex-end",
        margin: 0,
        position: "relative",
        bottom: 0,
        right: 0,
    },
    modalLilContainer: {
        paddingBottom: 25, backgroundColor: mainWhite, borderTopLeftRadius: 30, borderTopRightRadius: 30, maxHeight: '70%'
    },
    twoColContainer: {
        marginHorizontal: 20, marginVertical: 10, flex: 1
    },
    twoColItem: {
        padding: 10, borderRadius: 12, margin: 5, backgroundColor: mainWhite, minHeight: 50,
        alignItems: 'center', justifyContent: 'center', shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.37,
        shadowRadius: 3.49,
        elevation: 9,
    }
})

export default NotificationListScreen;



