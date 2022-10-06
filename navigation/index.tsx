/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import {
  HomeScreen,
  FavouritesScreen,
  SellScreen,
  NotificationScreen,
  MeScreen,
  ModalScreen,
  NotFoundScreen,
} from '../screens';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          title: 'Home',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIconIonicons name="home" color={color} />
            ) : (
              <TabBarIconIonicons name="home-outline" color={color} />
            ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome name="info-circle" size={25} color={Colors[colorScheme].text} style={{ marginRight: 15 }} />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIconFontAwesome name="heart" color={color} />
            ) : (
              <TabBarIconFontAwesome name="heart-o" color={color} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Sell"
        component={SellScreen}
        options={{
          title: 'Sell',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIconFontAwesome name="plus-square" color={color} />
            ) : (
              <TabBarIconFontAwesome name="plus-square-o" color={color} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: 'Notification',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIconFontAwesome name="bell" color={color} />
            ) : (
              <TabBarIconFontAwesome name="bell-o" color={color} />
            ),
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={MeScreen}
        options={{
          title: 'Me',
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <TabBarIconFontAwesome name="user" color={color} />
            ) : (
              <TabBarIconFontAwesome name="user-o" color={color} />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIconFontAwesome(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
function TabBarIconAntd(props: { name: React.ComponentProps<typeof AntDesign>['name']; color: string }) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconIonicons(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
