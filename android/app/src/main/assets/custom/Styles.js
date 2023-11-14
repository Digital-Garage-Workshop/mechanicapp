import React from 'react';
import { StyleSheet } from 'react-native';
import { mainGrey, mainColor, mainWhite, off, offCol, lightBlack } from './colors';
import { Platform } from 'react-native';



export const styles = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            backgroundColor: mainWhite,
            paddingBottom: 0
        },
        container: {
            flex: 1,
            paddingTop: 20,
            backgroundColor: mainWhite
        },
        whiteMainContainer: {
            flex: 1,
            backgroundColor: mainWhite
        },
        whiteContainer: {
            flex: 1,
            paddingVertical: 30,
            backgroundColor: mainWhite
        },
        headerView: {
            maxHeight: 80,
            paddingTop: 20,
            flexDirection: 'row',
            paddingHorizontal: 20,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: mainWhite,
        },
        headerScrollView: {
            maxHeight: 80,
            flex: 1,
            backgroundColor: mainWhite,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            paddingLeft: 20,
            paddingTop: 20,
            marginBottom: 20
        },
        title: {
            fontSize: 14,
            color: lightBlack,
            fontWeight: '400'
        },
        fatTitle: {
            fontSize: 14,
            color: lightBlack,
            fontWeight: "500"
        },
        bigTitle: {
            fontSize: 18,
            marginVertical: 10,
            color: mainColor,
            fontWeight: '500'
        },
        titleOff: {
            fontSize: 14,
            color: offCol,
            fontWeight: '500'
        },
        txt: {
            fontSize: 12,
            color: lightBlack
        },
        fatTxt: {
            fontSize: 12,
            color: lightBlack,
            fontWeight: "500"
        },
        txtOff: {
            fontSize: 12,
            color: offCol,
        },
        fatTxtOff: {
            fontSize: 12,
            color: offCol,
            fontWeight: "500"
        },
        titleOff: {
            fontSize: 14,
            color: offCol,
        },
        fatTitleOff: {
            fontSize: 14,
            color: offCol,
            fontWeight: "500"
        },
        card: {
            paddingVertical: 10,
            borderWidth: 0.5,
            borderColor: off,
            justifyContent: 'center',
            marginBottom: 10,
            marginHorizontal: 20,
            borderRadius: 10,
            backgroundColor: mainWhite,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.20,
            shadowRadius: 2.47,
            elevation: 2,
        },
        titleActive: {
            fontSize: 14,
            color: lightBlack,
            fontWeight: '400',
        },
        alCent: {
            alignItems: 'center',
            flex: 1,
            padding: 10,
        },
        alCentActive: {
            alignItems: 'center',
            padding: 10,
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: mainColor
        },
        cardFilter: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: Platform.OS == "android" ? 0 : 5,
            justifyContent: 'center',
            margin: 10,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: off,
            width: '100%',
            backgroundColor: mainWhite,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.20,
            shadowRadius: 2.47,
            elevation: 2,
        },
        siteCardContainer: {
            flex: 1,
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: off
        },
        siteCardTitle: {
            color: lightBlack,
            fontSize: 14,
            fontWeight: '400'
        },
        siteCardText: {
            color: offCol,
            textAlign: 'justify',
            marginVertical: 5,
            fontSize: 12
        },
        cardRow: {
            flexDirection: 'row', paddingHorizontal: 20, marginVertical: 5, alignItems: 'center'
        },
        cardTitle: {
            width: '55%'
        },
        cardVal: {
            width: '45%'
        },
        colContainer: {
            paddingHorizontal: 10, marginVertical: 5, flexDirection: 'column'
        },
        cardCol: {
            marginVertical: 5
        },
        btn: {
            flex: 1, backgroundColor: mainColor, borderRadius: 20, alignItems: 'center', paddingVertical: 10, shadowColor: 'rgba(0,0,0,0.3)',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.37,
            shadowRadius: 3.49,
            elevation: 9,
        },
        whiteTxt: {
            color: mainWhite, fontWeight: '600', fontSize: 14
        }
    }
);