import { StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { mainWhite, transParent } from '../../../assets/colors';

const Loading = props => {

    return (
        <ActivityIndicator size='large' style={customStyles.spinner} />
    )
}
export default Loading;

const customStyles = StyleSheet.create({
    spinner: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        // backgroundColor: transParent
    }
});