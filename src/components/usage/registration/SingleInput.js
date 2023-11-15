import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { lightBlack, mainColor, off } from '../../../../assets/colors'
import { styles } from '../../../../assets/Styles'

const SingleInput = props => {
    const [isActive, setIsActive] = useState(false);
    let whtKeyboard = props?.isNumber ? 'decimal-pad' : 'default';
    console.log('props?.value', props);
    console.log('props?.value', props?.value);
    return (
        <View style={[customStyles.container, styles.card]}>
            <Text style={[customStyles.label, isActive ? { color: mainColor } : null]}>{props ? props.label : ""}</Text>
            <TextInput
                autoCorrect={false}
                style={[customStyles.value, isActive ? { borderBottomColor: mainColor, borderBottomWidth: 0.5 } : { borderBottomColor: off, borderBottomWidth: 1 }]}
                value={(props?.value).toString()}
                keyboardType={whtKeyboard}
                multiline={props?.isMultiline}
                onFocus={() => setIsActive(true)}
                onSubmitEditing={() => setIsActive(false)}
                onEndEditing={() => setIsActive(false)}
                placeholder={props?.placeholder}
                onChangeText={temp => props?.setValue(temp)}
            />
        </View>
    )


}

const customStyles = StyleSheet.create({
    container: {
        flex: 1, marginHorizontal: 20, marginBottom: 20, paddingHorizontal: 20
    },
    label: {
        color: lightBlack, fontSize: 12
    },
    value: {
        color: lightBlack, fontWeight: '500', marginVertical: 5, fontSize: 12, paddingBottom: 5
    }
});

export default SingleInput;

