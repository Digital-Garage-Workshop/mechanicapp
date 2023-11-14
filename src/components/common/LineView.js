import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {  lightBlack, mainColor, off } from '../../../assets/colors'


const LineView = props => {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props ? props.label : "..."}</Text>
            <Text style={styles.value}>{props?.value ? props.value : "..."}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1, borderBottomWidth: 1, borderColor: off, marginHorizontal: 20, marginBottom: 10
    },
    label: {
        color: mainColor, fontSize: 12
    },
    value: {
        color: lightBlack, fontWeight: '600', marginVertical: 5,fontSize: 12
    }
})

export default LineView