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

const Tab = createBottomTabNavigator();
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
const screenOptions = { headerShown: false, tabBarActiveTintColor: '#309975', tabBarInactiveTintColor: '#454d66', tabBarStyle: {}, }

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator shifting={false} labeled={false}
        activeColor="#ffd9fa" inactiveColor="#ffe0d6"
        screenOptions={screenOptions}
        sceneContainerStyle={{}}
      >
        {myTabs.map((tab, index) => (
          <Tab.Screen key={index} name={tab.name} component={tab.component}
            options={{
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name={tab.icon} color={color} size={26} />),
            }} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

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
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    props.navigation.navigate({ name: route.name, merge: true });
                  }
                };

                const onLongPress = () => {
                  props.navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  });
                };

                return (
                  <TouchableOpacity
                    key={index}
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    onPress={onPress}
                    onLongPress={onLongPress}
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
          <Tab.Screen key={index} name={tab.name} component={tab.component}
            options={{
              tabBarIcon: ({ color }) => (<MaterialCommunityIcons name={tab.icon} color={color} size={26} />),
            }} />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

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