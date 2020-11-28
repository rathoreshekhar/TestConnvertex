import { Button, Container, Content, Form } from "native-base";
import React, { Component } from "react";
import { ActivityIndicator, StatusBar, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import globalStyles from "./Utils/globalStyles";
import { isEmptyCheck } from "./Utils/helperFunctions";
import Helpers from "./Utils/Helpers";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from "react-native-toast-message";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error_email: '',
            error_password: '',
            PasswordSecure: true,
            loginLoader: false,
            is_logged: false,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.getStorageData();

        this.focusListener = navigation.addListener("didFocus", () => {
            this.getStorageData();
        })
    }

    getStorageData = async () => {
        try {
            const AllUserData = await AsyncStorage.getItem('@AllUserData');
            const userData = await AsyncStorage.getItem('@userData');
            //console.log('AllUserData', AllUserData, 'userData', userData)
            if (AllUserData == null || AllUserData == "") {
                Helpers.AllUserData = []
            } else {
                Helpers.AllUserData = AllUserData;
                Helpers.LoginUserData = userData;

                console.log('AllUserData', Helpers.AllUserData, 'userData', Helpers.LoginUserData)
            }
        } catch (e) {
            console.log("fetch error")
            console.log(e)
        }
    }

    validate() {
        const { email, password } = this.state;
        var isMobile = Helpers.RegularExpression.phoneCheck.test(email);
        let isValidated = true;
        console.log('ismobile', isMobile);
        if (isEmptyCheck(email.trim())) {
            this.setState({ error_email: 'Please enter email/mobile' })
            isValidated = false;
        } else if (!isMobile && Helpers.RegularExpression.emailCheck.test(email) == false) {
            this.setState({ error_email: 'Please enter valid email/mobile' })
            isValidated = false;
        } else if (isMobile && email.trim().length < 10) {
            this.setState({ error_email: 'Please enter valid email/mobile' })
            isValidated = false;
        }

        if (password == "") {
            this.setState({ error_password: 'Please enter password' });
            isValidated = false;
        }

        return isValidated
    }

    _LoginSubmit = () => {
        const { email, password } = this.state;

        if (this.validate()) {
            this.setState({ loginLoader: true })
            var arrayData = [];
            arrayData = JSON.parse(Helpers.AllUserData)
            var isLoggedIn = false;
            var isUserExist = false;
            var loggedUser = arrayData.filter(item => {
                if (item.email == email || item.mobile == email) {
                    if (item.password == password) {
                        return item
                    } else {
                        isUserExist = true;
                    }
                }
            })

            if (loggedUser.length > 0) {
                this.setState({ loginLoader: false, email: '', password: '' })
                Toast.show({ type: 'success', text1: 'Login Successful', visibilityTime: 1500 });
                this.props.navigation.navigate('Detail', { userData: loggedUser[0] })
            } else if (isUserExist) {
                this.setState({ loginLoader: false })
                Toast.show({ type: 'error', text1: 'Incorrect password', visibilityTime: 1500 });
            } else {
                this.setState({ loginLoader: false })
                Toast.show({ type: 'error', text1: 'User not registered', visibilityTime: 1500 });
            }
        }
    };

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

                                <Text style={{ fontSize: 25, marginTop: 1, color: '#be9f48', letterSpacing: 3 }}>Login</Text>
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
                                            placeholder="Email/Mobile"
                                            placeholderTextColor="#b5b5b5" />
                                    </View>
                                    <Text style={{ paddingLeft: 5, paddingRight: 15, fontSize: 11, color: '#ee6054' }}
                                        fontType={'light'}>{this.state.error_email}</Text>
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

                            <View style={{
                                paddingLeft: 35,
                                paddingRight: 35,
                                paddingTop: 15,
                                paddingBottom: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <Button onPress={() => this._LoginSubmit()} style={{
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
                                        }} fontType={'medium'}>SIGN IN</Text>
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
                                <Text onPress={() => this.props.navigation.navigate('Register')} style={{ fontSize: 13, alignSelf: 'flex-end', color: '#be9f48' }} fontTypr={'500'}>New here? Sign Up</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Container>
        )
    }
}