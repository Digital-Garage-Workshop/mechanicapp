import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import WeeklyCalendar from 'react-native-weekly-calendar';
import { mainColor, lightBlack } from '../../../assets/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { styles } from '../../../assets/Styles'
import { decode } from 'html-entities'
import RenderHtml from 'react-native-render-html';

import { useNavigation } from '@react-navigation/native';

const HistoryCard = (props) => {
    var data = props?.data;
    const navigation = useNavigation();
    const index = props?.index;
    const [isExpand, setIsExpand] = useState(true);

    const { width } = useWindowDimensions();
    const source = {
        html: decode(data?.formula)
    };

    return (
        <>
            <View style={[styles.card, { paddingHorizontal: 10 }]}>
                <Text selectable={true} style={[styles.txtOff, customStyles.index]}>{index ? index : "..."}. {data?.repairdate} /{data?.service}/</Text>
                <View style={customStyles.itemContainer}>
                    <View style={{ width: "90%", marginLeft: 5, marginTop: 5 }}>
                        {
                            isExpand ? (
                                null
                            ) : (
                                <>
                                    <Text style={[customStyles.branchTitle]}>{data?.organization}/{data?.branch}</Text>
                                    <Text selectable={true} numberOfLines={isExpand ? 10 : 1} style={[styles.txtOff, { marginBottom: 10 }]}>{data?.mechanic}</Text>
                                    <RenderHtml
                                        defaultTextProps={{ selectable: true }}
                                        contentWidth={width}
                                        source={source}
                                        emSize={10}
                                    />
                                </>
                            )
                        }
                    </View>
                    {
                        isExpand ? (
                            <TouchableOpacity onPress={() => setIsExpand(!isExpand)} style={{ position: "absolute", right: 0 }}>
                                <Entypo name="chevron-down" size={20} color={mainColor} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setIsExpand(!isExpand)} style={{ position: "absolute", right: 0 }}>
                                <Entypo name="chevron-right" size={20} color={mainColor} />
                            </TouchableOpacity>
                        )
                    }
                </View>
                {
                    isExpand ? (
                        <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                            <View style={customStyles.rowContainer}>
                                <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Арлын дугаар</Text>
                                <Text selectable={true} style={[styles.txt, customStyles.value]}>{data.vinnumber ? data.vinnumber : "..."}</Text>
                            </View>
                            <View style={[customStyles.rowContainer]}>
                                <Text selectable={true} style={[styles.txtOff, { width: '45%' }]}>Засварын тэмдэглэл:</Text>
                                <Text selectable={true} style={[styles.txt, customStyles.value]}>{data?.repairnote}</Text>
                            </View>
                        </View>
                    ) : null
                }
            </View >
        </>
        
    );
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
    index: { position: "absolute", left: 5, top: 5 },
    branchTitle: {
        fontSize: 14,
        color: lightBlack,
        fontWeight: '400'
    }
})

export default HistoryCard