import React, { Component } from 'react';
import {CreateDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';

export const AppDrawerNavigator = CreateDrawerNavigator({
    Home : {
        screen : AppTabNavigator
    },
    Settings : {
        screen : SettingScreen
    }
},
{
    contentComponent : CustomSideBarMenu
},
{
    initialRouteNmae : 'Home'
})