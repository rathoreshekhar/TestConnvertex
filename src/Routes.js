import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DetailScreen from "./DetailScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const navigation = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Detail: DetailScreen
}, {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        headerShown: false
    }
});

export default createAppContainer(navigation);