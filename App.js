import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import HomeScreen from './pages/Home';
import StackScreen from './pages/StackScreen';
import SearchScreen from './pages/Search';
import ProfileScreen from './pages/Profile';
import SettingsScreen from './pages/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// create a bottom tab navigator
// that will contain all the main screens
// that we want to display in the bottom nav bar
const Tab = createBottomTabNavigator();
// create a stack navigator
// that will contain screens
// that could be nested inside a tab screen
/**
 * Example:
 * 
 * Home
 * - Stack: [First Nested Page, Second Nested Page]
 * Search
 * - No nested stack
 * Settings
 * - No nested stack
 * Profile
 * - No nested stack
 **/
const stack = createStackNavigator();

function HomeStack() {
  return (
    <stack.Navigator screenOptions={screenOptions}>
      <stack.Screen name="Homepage" component={HomeScreen} />
      {/* show header to display a back button in-app */}
      <stack.Screen options={{ headerShown: true, }} name="Stack" component={StackScreen} />
    </stack.Navigator>
  );
}

// seperating the tabs from the App function
// to make it more readable
const myTabs = [
  {
    name: 'HomeStack',
    icon: 'home',
    component: HomeStack,
  },
  {
    name: 'Search',
    icon: 'magnify',
    component: SearchScreen,
  },
  {
    name: 'Settings',
    icon: 'cog',
    component: SettingsScreen,
  },
  {
    name: 'Profile',
    icon: 'account-circle',
    component: ProfileScreen,
  },
]

// Same options for both approaches
const screenOptions = { headerShown: false, tabBarActiveTintColor: '#309975', tabBarInactiveTintColor: '#454d66', tabBarStyle: {}, }

// First approach
// Simple bottom nav bar
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator shifting={false} labeled={false}
        activeColor="#ffd9fa" inactiveColor="#ffe0d6"
        screenOptions={screenOptions}
        sceneContainerStyle={{}}
      >
        {myTabs.map((tab, index) => (
          <Tab.Screen key={'bottom_tab_' + index} name={tab.name} component={tab.component}
            options={{
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name={tab.icon} color={color} size={26} />),
            }} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Second approach
// Custom bottom nav bar:
//    The entire bottom nav could be reimplmented
//    with our own design
function CustomApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={screenOptions}
        sceneContainerStyle={{}}
        tabBar={
          props => (
            <View style={{ flexDirection: 'row' }}>
              {props.state.routes.map((route, index) => {
                const { options } = props.descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                      ? options.title
                      : route.name;

                const isFocused = props.state.index === index;

                const onPress = () => {
                  const event = props.navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!isFocused && !event.defaultPrevented) {
                    props.navigation.navigate(route.name);
                  }
                };

                return (
                  <TouchableOpacity
                    key={index}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, }}
                  >
                    <MaterialCommunityIcons
                      key={'icon' + index}
                      name={myTabs[index].icon}
                      color={isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor} size={26}
                    />
                    <Text
                      key={'label' + index}
                      style={{ color: isFocused ? options.tabBarActiveTintColor : options.tabBarInactiveTintColor }}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )
        }
      >
        {myTabs.map((tab, index) => (
          <Tab.Screen key={'bottom_tab2_' + index} name={tab.name} component={tab.component} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// export default App;
export default CustomApp;

// create stylesheet
const styles = StyleSheet.create({
  bottomNav: {
    // some paddination
    // marginBottom: 10,
    // marginTop: 10,
    // shadow
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation
    elevation: 5,
    // background color must be set
    backgroundColor: '#309975',

    // borderTopWidth: 0.5,
    // borderTopColor: '#00000011',
  },
});