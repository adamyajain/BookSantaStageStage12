import React, { Component } from 'react';
import {CreateDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import Notificationcreen from '../screens/NotificationScreen'
export const AppDrawerNavigator = CreateDrawerNavigator({
    Home : {
        screen : AppTabNavigator
    },
    Settings : {
        screen : SettingScreen
    },
    Notifications : {
        screen : NotificationScreen
    }
},
{
    contentComponent : CustomSideBarMenu
},
{
    initialRouteNmae : 'Home'
})