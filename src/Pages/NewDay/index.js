import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import firebase from '../../firebaseConfig'
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function NewDay() { 

  const today = new Date();
  const navigation = useNavigation();
  const route = useRoute();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  let sendKey = useRef();
  let value = useRef(0);
  let userName = useRef();


  useEffect(() => {
    //gets name for current user (to be displayed)
    firebase.database().ref('Users').child(route.params?.user).child('name').once('value', snapshot => {
      userName.current = snapshot.val();
      console.log(userName.current);
    });

      //displays time clock
    let secTimer = setInterval( () => {
      setTime(new Date().toLocaleTimeString())
    },1000)
    return () => clearInterval(secTimer);
  }, []); 

  function newDate(){
      //create new node under current userID for new work day
      //add today's date to node, and send key when navigating to time clock page
      let newDate = firebase.database().ref('Users').child(route.params?.user).push();
      // dKey=newDate.key;
      (console.log('test'))
      // setDKey(newDate.key);
      sendKey.current = newDate.key;
      newDate.set({
        date: today.toLocaleDateString(),
      });
    // }
  }

 async function addDay(){
     await firebase.database().ref('Users').child(route.params?.user).once('value', (snapshot) => {
      value.current = [];
      snapshot.forEach((item) => {
        // dKey = item.key;
        if(item.key.length === 20){
          // setDKey(item.key);
          sendKey.current = item.key
          console.log(sendKey + " dKey");
        }
        //if a node with today's date already exists, this ensures the correct key will still be sent to TimeClock
      })
      snapshot.forEach((item) => {
        value.current.push(item.child('date').val());
        console.log(value.current + " weeeeee");
      })
      if(!value.current.includes(today.toLocaleDateString())){
        // console.log(' made it?');
        newDate();
      }
    }).then(() => {
      // dateCheck();
      console.log(sendKey.current + " nav");
      navigation.navigate('New Sheet', {dateKey: sendKey.current});
    })
  }

  

  return (
    <View style={styles.main}>
      <Text style={styles.inputText}>Hey {userName.current}, Good to see you!</Text>

      <View style={{marginBottom: 20}}>
        <Text style={styles.clock}>{time}</Text>
        <FontAwesome  style={{position: 'absolute', left: 25, top: -165, zIndex: -1}} name='circle-thin' color='white' size={400}/>
      </View>

      <View style={{marginBottom: 60}}>
        <TouchableOpacity style={styles.GetStarted} onPress={addDay}>
          <Text style={styles.text}>
            Get Started  <FontAwesome style={{marginLeft: 2}} name='arrow-circle-o-right' color='black' size={20}/>
          </Text>
  
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#191b1f',
},
input: {
    backgroundColor: '#666f75',
    fontSize: 20,
    borderColor: 'grey',
    borderWidth: 1,
    marginHorizontal: 15,
    margin: 10,
    height: 70,
    borderRadius: 15,
},
inputText: {
    textAlign: 'center',
    color: '#56A3A6',
    fontSize: 19,
    fontWeight: '600',
    marginTop: 60
},
GetStarted: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 365,
    height: 70,
    marginBottom: 10,
    borderRadius: 15,
    padding: 5,
    backgroundColor: '#56a3a6'
},
text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 19,
    fontWeight: '800',
},
clock: {
  textAlign: 'center',
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
}
})
