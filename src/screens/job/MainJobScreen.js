import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Pressable, TextInput, StyleSheet, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useIsFocused } from "@react-navigation/native";
import DatePicker from 'react-native-date-picker'
import { styles } from '../../../assets/Styles'
import { mainColor, mainWhite, off, offCol } from '../../../assets/colors'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import userContext from '../../contexts/userContext';
import { dvCommand } from '../../../util';
import { runApiList } from '../../utils/service';
import { filter, split } from 'lodash';
import Modal from 'react-native-modal'
import JobCard from '../../components/job/JobCard';
import BottomSum from '../../components/common/BottomSum';
import { useFocusEffect } from '@react-navigation/native';
import { getCurrentDate, getNextDate } from '../../../util';

const MainJobScreen = () => {

    const context = useContext(userContext);
    const isFocused = useIsFocused();
    const [searchDate, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [totalcount, setTotalCount] = useState('');
    const [filterdTotalCount, setFilterdTotalCount] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [whtCriteria, setWhtCriteria] = useState({
        param: "date",
        name: "Огноо"
    });
    const [searchText, setSearchText] = useState(getCurrentDate());
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    var displayDate = searchDate.toISOString().slice(0,10);
    
    const toggleModal = () => {
        setVisible(!visible);
    };
    const searchFilter = (text) => {
        console.log('text = ', text);
        filterData(text);
    };

    const getData = async () => {
        console.log('whtCriteria', whtCriteria);
        console.log('searchText', searchText);

        let url = 'api/jobs/';
        if (searchText)
            url = 'api/jobs/' + '?bookingdate=' + displayDate;

        console.log('getData = ', url);
        let response = await runApiList(context[2], url);
        let result = filter(response.result, a => a.jobid);
        setData(result);
        setFilteredData([/* ...filteredData,  */...result]);
        setTotalCount(response.totalcount ? response.totalcount : "");
        setFilterdTotalCount(response.totalcount ? response.totalcount : "");
        
        setLoading(false);
        setRefreshing(false);
        setLoadMore(false);
    };

    const freshData = async () => {
        let url = 'api/jobs/' + '?bookingdate=' + displayDate;
        console.log('freshData = ', url);
        let response = await runApiList(context[2], url);
        let result = filter(response.result, a => a.jobid);

        setData(result);
        setFilteredData(result);
        setTotalCount(response?.totalcount);
        setFilterdTotalCount(response?.totalcount);
        
        setLoading(false);
        setRefreshing(false);
        setLoadMore(false);
    };

    const refreshData = async () => {
        console.log('whtCriteria', whtCriteria);
        console.log('searchText', searchText);

        let url = 'api/jobs/' + '?bookingdate=' + displayDate;
        console.log('refreshData = ', url);
        let response = await runApiList(context[2], url);
        let result = filter(response.result, a => a.jobid);

        setData(result);
        setFilteredData(result);
        setTotalCount(response?.totalcount);
        setFilterdTotalCount(response?.totalcount);
        
        setLoading(false);
        setRefreshing(false);
        setLoadMore(false);
    };

    const filterData = async (bookingDate) => {
        let url = 'api/jobs/' + '?bookingdate=' + bookingDate;
        console.log('filterData = ', url);
        let response = await runApiList(context[2], url);
        let result = filter(response.result, a => a.jobid);

        setFilteredData(result);
        setFilterdTotalCount(response?.totalcount);

        setLoading(false);
        setLoadMore(false)
    };

    useEffect(() => {
        if(isFocused){ 
            getData();
        }
    }, [currentPage, isFocused]);

    useEffect(() => {
        setLoading(true);
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                refreshData();
                // setWhtCriteria('');
                // setSearchText('');
            };
        }, [])
    );

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
                <>
                    <FlatList
                        showsVerticalScrollIndicator={true}
                        data={filteredData}
                        initialNumToRender={7}
                        style={{ marginBottom: 40 }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <JobCard key={index} data={item} isMain={true} index={index + 1} />
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => {
                                    refreshData(setRefreshing(true));
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
        <SafeAreaView style={[styles.mainContainer]}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', minHeight: 60, maxHeight: 70, marginHorizontal: 10, marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => setOpen(true)}  style={[styles.cardFilter, { padding: 10 }]}>
                        <Text numberOfLines={2} style={[styles.txt, { width: "70%" }]}>{whtCriteria ? whtCriteria.name : "Сонгох"}</Text>
                        <Entypo name="chevron-down" size={20} color={mainColor} style={{ position: 'absolute', right: 5 }} />
                    </TouchableOpacity>
                    <View style={[styles.cardFilter, { flex: 2 }]}>
                        <TextInput
                            width="80%"
                            editable={false}
                            value={displayDate ? displayDate : null}
                            style={{ color: 'black', fontSize: 12 }}
                        />
                        <TouchableOpacity /* onPress={() => searchFilter(searchText)} */>
                            <Entypo name="magnifying-glass" size={20} style={{ alignSelf: 'center', marginHorizontal: 5, color: offCol }} ></Entypo>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    loading ? (
                        <ActivityIndicator size="small" style={{ marginVertical: 250 }} />
                    ) : null
                }
                {renderData()}
                <DatePicker
                    locale='mn'
                    modal
                    open={open}
                    date={searchDate}
                    minimumDate={new Date("2023-09-01")}
                    maximumDate={new Date(getNextDate())}
                    mode="date"
                    onConfirm={(searchDate) => {
                        setOpen(false)
                        setDate(searchDate)
                        searchFilter(searchDate.toISOString().slice(0,10));
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
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
export default MainJobScreen;



