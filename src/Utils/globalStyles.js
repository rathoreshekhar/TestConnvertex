import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create(
    {
        FormGroup: {
            paddingLeft: 30,
            paddingRight: 30,
            paddingTop: 5,
            paddingBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        formControl: {
            fontSize: 14,
            lineHeight: 35,
            height: 55
        },
        formLabel: {
            fontSize: 11,
            fontWeight: '400',
            textTransform: 'uppercase',
            color: '#fff',
            letterSpacing: 0.5
        },

        textInputStyle: {
            borderColor: '#be9f48',
            borderWidth: 1,
            borderRadius: 4,
            height: 45,
            paddingLeft: 15,
            paddingRight: 15,
            color: '#fff',
            backgroundColor: '#222',
        }
    });

export default globalStyles;
