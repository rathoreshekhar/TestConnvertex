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

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            mobile: '',
            country_code: '',

            error_username: '',
            error_email: '',
            error_password: '',
            error_confirm_password: '',
            error_mobile: '',
            error_country_code: '',

            PasswordSecure: true,
            ConfirmPasswordSecure: true,
            loginLoader: false,
            is_logged: false,
        };
    }

    validate() {
        const { username, email, password, confirm_password, mobile, country_code } = this.state;
        let isValidated = true;

        if (username.trim() == "") {
            this.setState({ error_username: 'Please enter name' });
            isValidated = false;
        }
        if (isEmptyCheck(email.trim())) {
            this.setState({ error_email: 'Please enter email/mobile' })
            isValidated = false;
        } else if (Helpers.RegularExpression.emailCheck.test(email) == false) {
            this.setState({ error_email: 'Please enter valid email/mobile' })
            isValidated = false;
        }

        if (country_code.trim() == "") {
            this.setState({ error_country_code: 'Please enter country code' });
            isValidated = false;
        } else if (Helpers.RegularExpression.phoneCheck.test(country_code) == false) {
            this.setState({ error_email: 'Please enter valid code' })
            isValidated = false;
        }

        if (mobile.trim() == "") {
            this.setState({ error_mobile: 'Please enter mobile number' });
            isValidated = false;
        } else if (Helpers.RegularExpression.phoneCheck.test(mobile) == false) {
            this.setState({ error_email: 'Please enter valid mobile number' })
            isValidated = false;
        } else if(mobile.trim().length<10) {
            this.setState({ error_email: 'Mobile number must contain at least 10 digit' })
            isValidated = false;
        }

        if (password == "") {
            this.setState({ error_password: 'Please enter password' });
            isValidated = false;
        } else if (!Helpers.RegularExpression.onlyNumber.test(password)) {
            this.setState({ error_password: 'password must contain at least one number' });
            isValidated = false;
        } else if (!Helpers.RegularExpression.smallLetter.test(password)) {
            this.setState({ error_password: 'password must contain at least one lowercase letter' });
            isValidated = false;
        } else if (!Helpers.RegularExpression.capitalLetter.test(password)) {
            this.setState({ error_password: 'password must contain at least one capital letter' });
            isValidated = false;
        } else if (!Helpers.RegularExpression.specialCharacter.test(password)) {
            this.setState({ error_password: 'password must contain at least one special character' });
            isValidated = false;
        } else if (password.length < 5) {
            this.setState({ error_password: 'password length must contain at least six character' });
            isValidated = false;
        }

        if (confirm_password == "") {
            this.setState({ error_confirm_password: 'Please enter confirm password' });
            isValidated = false;
        } else if (password !== confirm_password) {
            this.setState({ error_confirm_password: 'Confirm password doesnot match with password' });
            isValidated = false;
        }

        return isValidated
    }

    _Submit = () => {
        const { username, email, password, confirm_password, mobile, country_code } = this.state;

        if (this.validate()) {
            this.setState({ loginLoader: true });
            if (isEmptyCheck(Helpers.AllUserData)) {
                var userData = [
                    {
                        username: username,
                        email: email,
                        country_code: country_code,
                        mobile: mobile,
                        password: password
                    }
                ]
                this.storeUserDetails(userData);
            } else {
                var arrayData = [];
                arrayData = JSON.parse(Helpers.AllUserData)
                var isRegistered = false;
                arrayData.map(item => {
                    if (item.email == email || item.mobile == mobile) {
                        isRegistered = true
                    }
                })
                if (isRegistered) {
                    this.setState({ loginLoader: false });
                    Toast.show({ type: 'error', text1: 'User already registered with given email/mobile', visibilityTime: 1500 });
                } else {
                    var userData = [...arrayData, {
                        username: username,
                        email: email,
                        country_code: country_code,
                        mobile: mobile,
                        password: password
                    }]
                    console.log('userdata', userData)
                    this.storeUserDetails(userData);
                }

            }

        }
    };

    storeUserDetails = async (data) => {
        try {
            await AsyncStorage.multiSet([
                ['@AllUserData', JSON.stringify(data)]/* ,
                ['@userData', JSON.stringify(data[0])] */
            ])
            this.setState({ loginLoader: false });
            Toast.show({ text1: 'Successfully Logged In', visibilityTime: 1500 });
            this.props.navigation.navigate("Login");
        } catch (e) {
            this.setState({ loginLoader: false });
            console.log("saving error")
            console.log(e)
        }
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

                                <Text style={{ fontSize: 25, marginTop: 1, color: '#be9f48', letterSpacing: 3 }}>Register</Text>
                            </View>

                            <View style={globalStyles.FormGroup}>
                                <View style={{ width: '100%' }}>
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            autoCapitalize={'none'}
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
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            keyboardType={'email-address'}
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
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            keyboardType={'phone-pad'}
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
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput
                                            keyboardType={'phone-pad'}
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
                            <View style={globalStyles.FormGroup}>
                                <View style={{ width: '100%' }}>
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput autoCapitalize={'none'} onChangeText={(text) => this.setState({ password: text, error_password: '' })} value={this.state.password}
                                            secureTextEntry={this.state.PasswordSecure}
                                            style={[globalStyles.textInputStyle, {
                                                borderColor: isEmptyCheck(this.state.error_password) ? '#be9f48' : '#ee6054',
                                            }]}
                                            placeholder="Password"
                                            placeholderTextColor="#b5b5b5" />

                                        <Icon onPress={() => this.setState({ PasswordSecure: !this.state.PasswordSecure })} style={{ position: 'absolute', right: 0, top: 5, zIndex: 100, padding: 15 }} size={20} color={isEmptyCheck(this.state.error_password) ? '#be9f48' : '#ee6054'} name={this.state.PasswordSecure ? "eye" : "eye-off"} />

                                    </View>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#ee6054' }}>{this.state.error_password}</Text>
                                </View>
                            </View>

                            <View style={globalStyles.FormGroup}>
                                <View style={{ width: '100%' }}>
                                    <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                        <TextInput autoCapitalize={'none'} onChangeText={(text) => this.setState({ confirm_password: text, error_confirm_password: '' })} value={this.state.confirm_password}
                                            secureTextEntry={this.state.ConfirmPasswordSecure}
                                            style={[globalStyles.textInputStyle, {
                                                borderColor: isEmptyCheck(this.state.error_confirm_password) ? '#be9f48' : '#ee6054',
                                            }]}
                                            placeholder="Confirm Password"
                                            placeholderTextColor="#b5b5b5" />

                                        <Icon onPress={() => this.setState({ ConfirmPasswordSecure: !this.state.ConfirmPasswordSecure })} style={{ position: 'absolute', right: 0, top: 5, zIndex: 100, padding: 15 }} size={20} color={isEmptyCheck(this.state.error_confirm_password) ? '#be9f48' : '#ee6054'} name={this.state.ConfirmPasswordSecure ? "eye" : "eye-off"} />

                                    </View>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#ee6054' }}>{this.state.error_confirm_password}</Text>
                                </View>
                            </View>

                            <View style={{
                                paddingLeft: 35,
                                paddingRight: 35,
                                paddingTop: 15,
                                paddingBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Button onPress={() => this._Submit()} style={{
                                    width: '100%',
                                    height: 40,
                                    backgroundColor: '#b4903a',
                                    justifyContent: 'center',
                                    borderRadius: 20,
                                    paddingTop: 8,
                                }}>
                                    {this.state.loginLoader === false ?
                                        <Text style={{
                                            fontSize: 16,
                                            paddingLeft: 8,
                                            paddingRight: 8,
                                            textAlign: 'center',
                                            color: '#fff',
                                            letterSpacing: 2,
                                        }} fontType={'medium'}>Register</Text>
                                        :
                                        <View>
                                            <ActivityIndicator size={25} color={Helpers.themeColor}
                                                style={{ backgroundColor: '#fff', borderRadius: 50 }} />
                                            <View style={{
                                                position: 'absolute',
                                                left: 6,
                                                top: 6,
                                                width: 13,
                                                height: 13,
                                                borderRadius: 50,
                                                backgroundColor: Helpers.themeColor,
                                            }} />
                                        </View>
                                    }
                                </Button>
                            </View>

                            <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 15, paddingBottom: 5 }}>
                                <Text onPress={() => this.props.navigation.navigate('Login')} style={{ fontSize: 13, alignSelf: 'flex-end', color: '#be9f48' }}>Already registered? Login</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        )
    }
}