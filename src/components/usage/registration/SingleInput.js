import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { lightBlack, mainColor, off } from '../../../../assets/colors'
import { styles } from '../../../../assets/Styles'

const SingleInput = props => {
    const [isActive, setIsActive] = useState(false);
    let whtKeyboard = props?.isNumber ? 'decimal-pad' : 'default';

    if (props?.isSell) {
        return (
            <View style={[customStyles.container, styles.card]}>
                <Text style={[customStyles.label, isActive ? { color: mainColor } : null]}>{props ? props.label : ""}</Text>
                <TextInput
                    autoCorrect={false}
                    style={[customStyles.value, isActive ? { borderBottomColor: mainColor, borderBottomWidth: 0.5 } : { borderBottomColor: off, borderBottomWidth: 1 }]}
                    value={props?.value}
                    keyboardType={whtKeyboard}
                    editable={props?.selectedMeasure ? true : false}
                    multiline={props?.isMultiline}
                    onFocus={() => setIsActive(true)}
                    onSubmitEditing={() => setIsActive(false)}
                    onEndEditing={() => {
                        if (props?.value) {
                            setIsActive(false)
                            if (props.selectedMeasure?.id) {
                                if (props.selectedMeasure?.id == '11361160388687') {
                                    / kg /
                                    if (parseFloat(props?.value) / 1000 <= props?.ashiglah) {
                                        props?.setImpZoruu(props?.ashiglah - parseFloat(props?.value) / 1000);
                                        props?.setInQty(parseFloat(props?.value) / 1000);
                                    } else {
                                        props?.setImpZoruu();
                                        props?.setInQty();
                                        props?.setValue();
                                        Alert.alert("Хэмжээ боломжит үлдэгдлээс их байх боломжгүй");
                                    }
                                } else if (props.selectedMeasure?.id == '6930995') {
                                    / tnn /
                                    if (parseFloat(props?.value) <= props?.ashiglah) {
                                        props?.setImpZoruu(props?.ashiglah - parseFloat(props?.value));
                                        props?.setInQty(parseFloat(props?.value));
                                    } else {
                                        props?.setImpZoruu();
                                        props?.setInQty();
                                        props?.setValue();
                                        Alert.alert("Хэмжээ боломжит үлдэгдлээс их байх боломжгүй");
                                    }
                                }
                            } else {
                                if (parseFloat(props?.value) <= props?.ashiglah) {
                                    props?.setImpZoruu(props?.ashiglah - parseFloat(props?.value));
                                    props?.setInQty(parseFloat(props?.value));
                                } else {
                                    props?.setImpZoruu();
                                    props?.setInQty();
                                    props?.setValue();
                                    Alert.alert("Хэмжээ боломжит үлдэгдлээс их байх боломжгүй");
                                }
                            }
                        } else if (props?.value === 0) {
                            Alert.alert("0 ээс их утга оруулна уу")
                            props?.setValue();
                            props?.setImpZoruu();
                        };
                    }}
                    placeholder={props?.placeholder}
                    onChangeText={temp => props?.setValue(temp)}
                />
            </View>
        )
    } else {
        return (
            <View style={[customStyles.container, styles.card]}>
                <Text style={[customStyles.label, isActive ? { color: mainColor } : null]}>{props ? props.label : ""}</Text>
                <TextInput
                    autoCorrect={false}
                    style={[customStyles.value, isActive ? { borderBottomColor: mainColor, borderBottomWidth: 0.5 } : { borderBottomColor: off, borderBottomWidth: 1 }]}
                    value={props?.value}
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

