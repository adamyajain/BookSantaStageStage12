import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
      isBookRequestActive : "",
      requestedBookName  : "",
      bookStatus : "",
      requestId  : "",
      userDocId : '',
      DocId : ''
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }



  addRequest =(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
        "book_status" : "requested",
        "date" : firebase.firestore.FieldValue.serverTimeStamp()
    })

    await this.getBookRequest()
    db.collection('users').where("email_id" , "==" , userId).get()
    .then()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        db.collection('users').doc(doc.id).update({
          isBookRequestActive : true
        })
      })
    })

    this.setState({
        bookName :'',
        reasonToRequest : randomRequestId
    })

    return Alert.alert("Book Requested Successfully")
  }

  recievedBooks = (bookName) => {
    var userId = this.state.userId
    var requestId = this.state.requestId
    db.collection('received_books').add({
      "user_id" : userId,
      "book_name" :bookName,
      "request_id" : requestId,
      "bookStatus" : "received"
    })
  }




  getIsBookRequestActive(){
    db.collection('users')
    .where('email_id' , '==' , this.state.userId)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc =>{
        this.setState({
          isBookRequestActive : doc.data().isBookRequestActive,
          userDocId : doc.id
        })
      })
    })
  }


  getBookRequest = () => {
    /*to get the first and last name*/
    db.collection('users').where('email_id' , '==' , this.state.userId).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        var name = doc.data().first_name
        var lastname = doc.data().lat_name

        /*to get the donor id and book name*/
        db.collection('all_notifications').where('request_id' , '==' , this.state.requestId).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            var donorId = doc.data().donor_id
            var bookName = doc.data().book_name

            /*target user id is the donor id to send notification to the user*/
            db.collection('all_notifications').add({
              "targeted_user_id" : donorId,
              "message" : name + lastname + "received the book" + bookName,
              "notification_status" : "unread",
              "book_name" : bookName
            })
          })
        })
      })
    })
  }

  componentDidMount(){
    this.getBookRequest()
    this.getIsBookRequestActive()
  }

  updateBookRequestStatus = () => {
    /*updating the book status after receiving the book*/
    db.collection('requested_books').doc(this.state.docId)
    .update({
      book_status : 'received'
    })

    /*getting the doc id to update the users doc*/
    db.collection('users').where('email_id' , '==' , this.state.userId).get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        /*updating the doc*/
        db.collection('users').doc(doc.id).update({
          isBookRequestctive : false
        })
      })
    })
  }


  render(){
    if(this.state.isBookRequestActive === true){
      return(
        /*Status Screen*/

        <View style = {{flex : 1 , justifyContent : 'center'}}>
          <View style = {{borderColor : "orange" , borderWidth : 2 , justifyContent : 'center' , alignItems : 'center' , padding : 10 , margin : 10}}>
            <Text>Book Name</Text>
            <Text>{this.state.requestedBookName}</Text>
          </View>
          <View style = {{borderColor : "orange" , borderWidth : 2 , justifyContent : 'center' , alignItems : 'center' , padding : 10 , margin : 10}}>
            <Text>Book Status</Text>
            <Text> {this.state.bookStatus} </Text>
          </View>

          <TouchableOpacity></TouchableOpacity>
        </View>
      )
    }
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