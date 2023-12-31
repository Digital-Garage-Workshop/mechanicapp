import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import WeeklyCalendar from 'react-native-weekly-calendar';
import { mainColor } from '../../../assets/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { styles } from '../../../assets/Styles'
import { useNavigation } from '@react-navigation/native';

const JobCard = (props) => {
    var data = props?.data;
    const navigation = useNavigation();
    const isConvention = props?.isConvention;
    const isMain = props?.isMain;
    const index = props?.index;
    const [isExpand, setIsExpand] = useState(false);
    /* const [isStart, setIsStart] = useState(false); */
    const { width } = useWindowDimensions();

    const sampleEvents = [
        { 'start': '2020-03-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
        { 'start': '2020-03-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
        { 'start': '2020-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
        { 'start': '2020-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
        { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
        { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
        { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
        { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
        { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
        { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
    ];

    if (isMain) {
        return (
            <>
                {/* <View style={styles.container}>
                    <WeeklyCalendar events={sampleEvents} style={{ height: 400 }} />
                </View> */}
                <View style={[styles.card, { paddingHorizontal: 10, borderColor: `${data.statuscolor}` }]}>
                    <Text selectable={true} style={[styles.fatTxt, customStyles.index]}>{index ? index : "..."}. {data?.carinfo.carnumber} /{data?.category.name}/</Text>
                    <View style={customStyles.itemContainer}>
                        <View style={{ width: "90%", marginLeft: 5, marginTop: 5 }}>
                            {
                                isExpand ? (
                                    null
                                ) : (
                                    <>
                                        {data.subcategory ? 
                                            <>
                                                <Text selectable={true} numberOfLines={isExpand ? 10 : 1} style={[styles.txtOff, { marginBottom: 10 }]}>{data.subcategory.name ? data.subcategory.name : "..."}</Text>
                                            </>
                                            : <Text>...</Text>
                                        }
                                        
                                        <Text selectable={true} numberOfLines={isExpand ? 10 : 1} style={[styles.txtOff, { marginBottom: 10 }]}>{data.bookingdate ? data.bookingdate : "өдөр тодорхойгүй"} {data.bookingtime ? data.bookingtime : "цаг тодорхойгүй"}</Text>
                                    </>
                                    
                                )
                            }
                            <Text selectable={true} numberOfLines={isExpand ? 10 : 1} style={[styles.title, { marginBottom: 10 }]} >{data.customer.name ? data.customer.name : "..."}</Text>
                            <View style={[{justifyContent: "flex-start", flexDirection: 'row', flexWrap: 'wrap', }]}>
                                <Text selectable={true} numberOfLines={isExpand ? 10 : 1} style={[styles.txtOff, {paddingHorizontal: 10, paddingVertical: 2, color: '#FFF', backgroundColor: `${data.statuscolor}`}]}>{data.status_mn ? data.status_mn : "..."}</Text>
                            </View>
                        </View>
                        {
                            isExpand ? (
                                <TouchableOpacity onPress={() => setIsExpand(!isExpand)} style={{ position: "absolute", right: 0 }}>
                                    <Entypo name="chevron-down" size={20} color={`${data.statuscolor}`} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => setIsExpand(!isExpand)} style={{ position: "absolute", right: 0 }}>
                                    <Entypo name="chevron-right" size={20} color={`${data.statuscolor}`} />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    {
                        isExpand ? (
                            <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                                <View style={[customStyles.rowContainer]}>
                                    <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Машин:</Text>
                                    <Text selectable={true} style={[styles.txt, customStyles.value]}>{data.carinfo.carmanu ? data.carinfo.carmanu : "..."} {data.carinfo.carmodel ? data.carinfo.carmodel : "..."}</Text>
                                </View>
                                <View style={customStyles.rowContainer}>
                                    <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Улсын дугаар</Text>
                                    <Text selectable={true} style={[styles.txt, customStyles.value]}>{data.carinfo.carnumber ? data.carinfo.carnumber : "..."}</Text>
                                </View>
                                <View style={[customStyles.rowContainer]}>
                                    <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Үйлдвэрлэсэн он:</Text>
                                    <Text selectable={true} style={[styles.txt, customStyles.value]}>{data?.carinfo?.buildyear ? data.carinfo.buildyear : "..."}</Text>
                                </View>
                                <View style={[customStyles.rowContainer]}>
                                    <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Арлын дугаар:</Text>
                                    <Text selectable={true} style={[styles.txt, customStyles.value]}>{data?.carinfo?.vin_number ? data.carinfo.vin_number : "..."}</Text>
                                </View>
                                <View style={[customStyles.rowContainer]}>
                                    <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Хөдөлгүүр/багтаамж:</Text>
                                    <Text selectable={true} style={[styles.txt, customStyles.value]}>{data?.carinfo?.capacity ? data.carinfo.capacity : "..."}</Text>
                                </View>
                                <View style={[customStyles.rowContainer]}>
                                    <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Гүйлт:</Text>
                                    <Text selectable={true} style={[styles.txt, customStyles.value]}>{data?.carinfo?.kilometr ? data.carinfo.kilometr : "..."}{data?.carinfo?.kilotype ? " "+data.carinfo.kilotype : "..."}</Text>
                                </View>
                                <TouchableOpacity key={index} onPress={() => navigation.navigate("job", {
                                        screen: "JobDetail", params: {
                                            title: data.jobid + " | Дэлгэрэнгүй",
                                            data: data,
                                            key: index
                                        }
                                    })} style={[styles.jobCard, { flex: 0, margin: 0, width: '100%' }]}>
                                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, alignItems: 'center' }}>
                                            <Feather name="file" size={20} color={mainColor} style={{ width: "10%" }} />
                                            <Text style={styles.title}>Дэлгэрэнгүй</Text>
                                            <Entypo name="chevron-right" size={20} color={mainColor} style={{ position: 'absolute', right: 0 }} />
                                        </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("job", {
                                        screen: "JobHistory", params: {
                                            title: data.jobid + " | ажлын түүх",
                                            data: data,
                                        }
                                    })} style={[styles.jobCard, { flex: 0, margin: 0, width: '100%' }]}>
                                        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 10, alignItems: 'center' }}>
                                            <FontAwesome5 name="bars" color={mainColor} size={20} style={{ width: "10%" }} />
                                            <Text style={styles.title}>Түүх</Text>
                                            <Entypo name="chevron-right" size={20} color={mainColor} style={{ position: 'absolute', right: 0 }} />
                                        </View>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }
                </View >
            </>
            
        )
    };
};

const customStyles = StyleSheet.create({
    itemContainer: { flexDirection: "row", marginTop: 10, alignItems: "center" },
    rowContainer: {
        flexDirection: 'row',
        paddingBottom: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    value: { width: '60%' },
    rounded: { padding: 10, backgroundColor: mainColor, borderRadius: 35, width: 72, height: 72, alignItems: "center", justifyContent: "center" },
    index: { position: "absolute", left: 5, top: 5 }
})

export default JobCard