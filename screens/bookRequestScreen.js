import React,{ Component } from 'react';
import {Text, View, StyleSheet, Alert, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';

import db from '../config'
import firebase from 'firebase';

export default class bookRequestScreen extends Component{
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            bookName : "",
            reasonToRequest : ""
        }
    }

    createUniqueId(){
        returnMath.random.toString(36).substring(7);
    }



    addRequest =(bookName, reasonToRequest)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('requested_boooks').add({
            "user_id" : userId,
            "book_name" : bookName,
            "reason_to_request" : reasonToRequest,
            requestId : randomRequestId
        })

        this.setState({
            bbookName : '',
            reasonToRequest : ''
        })

        return Alert.alert("Book Successfully Requested")
    }


    render(){
        return(
            <View style={{flex : 1}}>
                <MyHeader title = "RequestBook"/>
                <KeyboardAvoidingView style={styles.KeyboardStyle}>
                    <TextInput
                    style={styles.formTextInput}
                    placeholder={"eneter book name"}
                    onChangeText = {(text)=>{
                        this.setState({
                            bookName:text
                        })
                    }}
                    value={this.state.bookName}
                    />
                    <TextInput
                    style ={[styles.formTextInput,{height:300}]}
                    multiline = {true}
                    numberOfLines ={8}
                    placeholder={"Why do you need the book"}
                    onChangeText ={(text)=>{
                        this.setState({
                            reasonToRequest:text
                        })
                    }}
                    value ={this.state.reasonToRequest}
                    />
                    <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{this.addRequest(this.state.bookName, this.state.reasonToRequest)}}
                    >
                        <Text>Request</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )