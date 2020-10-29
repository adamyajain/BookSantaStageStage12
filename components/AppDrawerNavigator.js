import React, { Component } from 'react';
import {CreateDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';

export const AppTabNavigator = CreateDrawerNavigator({
    Home : {
        screen : AppTabNavigator
    },
},
{
    contentComponent : CustomSideBarMenu
},
{
    initialRouteNmae : 'Home'
})