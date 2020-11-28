import AsyncStorage from "@react-native-community/async-storage";
import { Button, Container, Content, Form, Item } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, StatusBar, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import globalStyles from "./Utils/globalStyles";
import { isEmptyCheck } from "./Utils/helperFunctions";
import Helpers from "./Utils/Helpers";

export default class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.navigation.getParam('userData').username,
            email: this.props.navigation.getParam('userData').email,
            mobile: this.props.navigation.getParam('userData').mobile,
            country_code: this.props.navigation.getParam('userData').country_code,

            error_username: '',
            error_email: '',
            error_mobile: '',
            error_country_code: '',
        };
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor={Helpers.themeBg} barStyle="light-content" />
                <View style={{ backgroundColor: Helpers.themeBg, flex: 1 }}>
                    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 15 }}>
                            <View style={{
                                marginBottom: 60,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <Text style={{ fontSize: 25, marginTop: 1, color: '#be9f48', letterSpacing: 3 }}>Login User Details</Text>
                            </View>

                            <View style={globalStyles.FormGroup}>
                                <View style={{ width: '100%' }}>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#fff' }}
                                        >Full Name</Text>
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            autoCapitalize={'none'}
                                            editable={false}
                                            onChangeText={(text) => this.setState({ username: text, error_username: '' })}
                                            value={this.state.username}
                                            style={[globalStyles.textInputStyle, {
                                                borderColor: isEmptyCheck(this.state.error_username) ? '#be9f48' : '#ee6054',
                                            }]}
                                            placeholder="Full Name"
                                            placeholderTextColor="#b5b5b5" />
                                    </View>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#ee6054' }}
                                        fontType={'light'}>{this.state.error_username}</Text>
                                </View>
                            </View>
                            <View style={globalStyles.FormGroup}>
                                <View style={{ width: '100%' }}>
                                <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#fff' }}
                                        >Email</Text>
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            keyboardType={'email-address'}
                                            editable={false}
                                            autoCapitalize={'none'}
                                            onChangeText={(text) => this.setState({ email: text, error_email: '' })}
                                            value={this.state.email}
                                            style={[globalStyles.textInputStyle, {
                                                borderColor: isEmptyCheck(this.state.error_email) ? '#be9f48' : '#ee6054',
                                            }]}
                                            placeholder="Email"
                                            placeholderTextColor="#b5b5b5" />
                                    </View>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#ee6054' }}
                                        fontType={'light'}>{this.state.error_email}</Text>
                                </View>
                            </View>

                            <View style={globalStyles.FormGroup}>
                                <View style={{ width: '23%', marginRight: '2%' }}>
                                <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#fff' }}
                                        >Code</Text>
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            keyboardType={'phone-pad'}
                                            editable={false}
                                            autoCapitalize={'none'}
                                            onChangeText={(text) => this.setState({ country_code: text.replace('.', ''), error_country_code: '' })}
                                            value={this.state.country_code}
                                            style={[globalStyles.textInputStyle, {
                                                borderColor: isEmptyCheck(this.state.error_country_code) ? '#be9f48' : '#ee6054',
                                            }]}
                                            placeholder="Country Code"
                                            placeholderTextColor="#b5b5b5" />
                                    </View>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#ee6054' }}
                                        fontType={'light'}>{this.state.error_country_code}</Text>
                                </View>
                                <View style={{ width: '75%' }}>
                                <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#fff' }}
                                        >Mobile Number</Text>
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            keyboardType={'phone-pad'}
                                            editable={false}
                                            autoCapitalize={'none'}
                                            onChangeText={(text) => this.setState({ mobile: text.replace('.', ''), error_mobile: '' })}
                                            value={this.state.mobile}
                                            style={[globalStyles.textInputStyle, {
                                                borderColor: isEmptyCheck(this.state.error_mobile) ? '#be9f48' : '#ee6054',
                                            }]}
                                            placeholder="Mobile Number"
                                            placeholderTextColor="#b5b5b5" />
                                    </View>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#ee6054' }}
                                        fontType={'light'}>{this.state.error_mobile}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        )
    }
}