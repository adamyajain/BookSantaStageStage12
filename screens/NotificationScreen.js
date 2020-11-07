import React , { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text
        } from 'react-native'
import {ListItem, Icon} from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/myHeader';


import db from '../config';

export default class NotificationScreen extends Component {
    constrctor(props){
        super(props);

        this.state = {
            userId : firebase.auth().currentUser.email,
            allNotifications : []
        };

        this.notificationRef = null
    }

    getNotifications = () => {
        this.requestRef = db.collection("all_notifications")
        .where("notification_status" , "==" , "unread")
        .where("targeted_user_id" , "==" , this.state.userId)
        .onSnapshot((snapshot) => {
            var allNotifications = []
            snapshot.docs.map((doc) => {
                var allNotifications = []
                snapshot.docs.map((doc) => {
                    var notification = doc.data()
                    notification["doc_id"] = doc.id
                    allNotifications.push(notification)
                });
                this.setState({
                    allNotifications : allNotifications
                });
            })
        })
    }

    componentDidMount(){
        this.getNotifications()
    }

    componentWillUnmount(){
        this.notificationRef
    }
}