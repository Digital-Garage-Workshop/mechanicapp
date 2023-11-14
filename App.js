import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { lightBlack, mainColor, mainWhite } from './assets/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './src/navigation/DrawerContent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import userContext, { UserStore } from './src/contexts/userContext';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import MainJobScreen from './src/screens/job/MainJobScreen';
import JobDetail from './src/screens/job/JobDetail';
import NotificationListScreen from './src/screens/notification/NotificationListScreen';
import { styles } from './assets/Styles';
import { enableLatestRenderer } from 'react-native-maps';
import NotificationBell from './src/components/common/NotificationBell';

enableLatestRenderer();

const Drawer = createDrawerNavigator();
const profileStack = createStackNavigator();
const loginStack = createStackNavigator();
const homeStack = createStackNavigator();
const jobsStack = createStackNavigator();
const jobStack = createStackNavigator();
const notificationStack = createStackNavigator();

const ProfileStackScreen = ({ navigation }) => {
    return (
        <profileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: mainColor,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },
            headerTintColor: mainWhite,
            headerTitleAlign: {
                alignSelf: 'center'
            },
        }}>
            <profileStack.Screen options={{
                title: 'Профайл',
                headerLeft: () => (
                    <FontAwesome5.Button name="chevron-left" size={25}
                        backgroundColor={mainColor} onPress={() => navigation.navigate("home", { screen: "HomeScreen" })}></FontAwesome5.Button>
                ),
                headerRight: () => (
                    <>
                    {/* <NotificationBell /> */}
                    </>
                ),
            }} name="ProfileScreen" component={ProfileScreen} />
        </profileStack.Navigator>
    )
};

const HomeStackScreen = ({ navigation }) => {
    return (
        <homeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: mainColor,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },
            headerTintColor: mainWhite,
            headerTitleAlign: {
                alignSelf: 'center'
            },
        }}>
            <homeStack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'Хяналтын самбар',
                headerRight: () => (
                    <>
                    {/* <NotificationBell /> */}
                    </>
                ),
                headerLeft: () => (
                    <Ionicons.Button name="ios-menu" size={25} backgroundColor={mainColor} color={mainWhite} onPress={() => navigation.openDrawer()}></Ionicons.Button>
                ),
            }} />
        </homeStack.Navigator>
    )
};

const LoginStackScreen = ({ navigation }) => {
    return (
        <loginStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: mainWhite,
            },
            headerTitleAlign: {
                alignSelf: 'center'
            },
        }}>
            <loginStack.Screen options={{
                title: 'Нэвтрэх',
                headerLeft: () => (
                    <Ionicons.Button name="ios-menu" size={25} backgroundColor={mainWhite} color={lightBlack} onPress={() => navigation.openDrawer()}></Ionicons.Button>
                ),
            }} name="LoginScreen" component={LoginScreen} />
        </loginStack.Navigator>
    )
};

const JobsStackScreen = ({ navigation }) => {
    function ProtudctTitle() {
        return (
            <Text style={[styles.fatTitle, { color: mainWhite, textAlign: "center" }]}>Тусгай зөвшөөрөл шаардлагагүй бүтээгдэхүүний жагсаалт</Text>
        );
    }
    return (
        <jobsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: mainColor,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },
            headerTintColor: mainWhite,
            headerTitleAlign: {
                alignSelf: 'center'
            },
        }}>
            <jobsStack.Screen options={{
                title: 'Ажлын жагсаалт',
                headerLeft: () => (
                    <FontAwesome5.Button name="chevron-left" size={25}
                        backgroundColor={mainColor} onPress={() => navigation.navigate("home", { screen: "HomeScreen" })}></FontAwesome5.Button>
                ),
                headerRight: () => (
                    <>
                    {/* <NotificationBell /> */}
                    </>
                ),
            }} name="MainJobScreen" component={MainJobScreen} />
        </jobsStack.Navigator>
    )
};

const JobStackScreen = ({ navigation }) => {
    return (
        <jobStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: mainColor,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },
            headerTintColor: mainWhite,

            headerTitleAlign: {
                alignSelf: 'center',
            },
            headerRight: () => (
                <>
                {/* <NotificationBell /> */}
                </>
            ),
        }}>
            <jobStack.Screen name="JobDetail" component={JobDetail} />
        </jobStack.Navigator>
    )
};

const NotificationStackScreen = ({ navigation }) => {
    return (
        <notificationStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: mainColor,
                shadowRadius: 0,
                shadowOffset: {
                    height: 0,
                },
            },
            headerTintColor: mainWhite,
            headerTitleAlign: {
                alignSelf: 'center',
            },
        }}>
            <notificationStack.Screen options={{
                title: 'Сонордуулга',
                headerLeft: () => (
                    <Ionicons.Button name="ios-menu" size={25} backgroundColor={mainColor} color={mainWhite} onPress={() => navigation.openDrawer()}></Ionicons.Button>
                ),
            }} name="NotificationListScreen" component={NotificationListScreen} />
        </notificationStack.Navigator>
    )
};

const toastconfig = {
    success: () => { },
    error: () => { },
    info: () => { },
    any_custom_type: () => { },
};

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <NavigationContainer>
                    <UserStore>
                        <Drawer.Navigator drawerStyle={{ width: '90%', borderTopRightRadius: 0, overflow: "hidden" }} 
                            drawerContent={
                                props => 
                                    <DrawerContent {...props} />
                                }>
                            <Drawer.Screen name="login" component={LoginStackScreen} />
                            <Drawer.Screen name="home" component={HomeStackScreen} />
                            <Drawer.Screen name="profile" component={ProfileStackScreen} />
                            <Drawer.Screen name="jobs" component={JobsStackScreen} />
                            <Drawer.Screen name="job" component={JobStackScreen} />
                            <Drawer.Screen name="notification" component={NotificationStackScreen} />
                        </Drawer.Navigator>
                    </UserStore>
                </NavigationContainer>
                <Toast toastconfig={toastconfig} />
            </PaperProvider>
        </SafeAreaProvider>
    );
};