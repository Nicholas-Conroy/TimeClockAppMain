import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import firebase from '../../firebaseConfig';
import { useRoute } from '@react-navigation/native';


export default function TimeClock({ route }) {
  const today = new Date();
  //route allows TimeClock to accept params from App.tsx, so we can pass the userID to this page
  const userRoute = useRoute();

  //value that stores wether the stopwatch is running or not
  const [stopWatch, setStopWatch] = useState(false);

  //value that stores how much time has elapsed
  const [elapsedTime, setElapsedTime] = useState(0);

  // reference to interval
  const intervalRef = useRef(null);

  //TEMP: name of user
  let userName = useRef();

  let tempText = useRef();


  //TEMP: get name of user
  useEffect(() => {
    firebase.database().ref('Users').child(userRoute.params?.user).child('name').once('value', snapshot => {
      userName.current = snapshot.val();
    })
    if(userName.current === 'Bossman')
      tempText.current = 'It\'s the boss';
  }, []);

  function clockIn() {
    //check that "get started" has been pressed, which sends date key, necessary for storing clock in/out data correctly in database
    if(!route.params?.dateKey) {
      Alert.alert('Please press "Get Started" on the New Day page');
      return;
    }
    //resets stopWatch and clears interval
    setElapsedTime(0);
    clearInterval(intervalRef.current);

    //starts stopwatch and starts counting up in intervals of 10ms. It keeps track of how much time has
    //passed and updates every 10ms show time
    setStopWatch(true);
    intervalRef.current = setInterval(() => {
      setElapsedTime(prevElapsedTime => prevElapsedTime + 10);
    }, 10);


    //add clock in time/date to database, under correct userID
    firebase.database().ref('Users').child(userRoute.params?.user).child(route.params?.dateKey).update({
      clockInTime: today.toLocaleTimeString()
    })
  }

  

  function clockOut() {
    //check that "get started" has been pressed, which sends date key, necessary for storing clock in/out data correctly in database
    if (!route.params?.dateKey) {
      Alert.alert('Please press "Get Started" on the New Day page');
      return;
    }
    //stops stopWatch and clears interval
    setStopWatch(false);
    clearInterval(intervalRef.current);

    //adds clockout date and time to database for correct user (probably don't need date)
    firebase.database().ref('Users').child(userRoute.params?.user).child(route.params?.dateKey).update({
      clockOutTime: today.toLocaleTimeString(),
      timeWorked: elapsedTime
    });
  }



  // Takes in a value (time) and formats to display in minutes, seconds, and milliseconds
  const formatTime = time => {
    //~~ converts whatever values calculated to integers to store in variables
    const minutes = ~~(time / 60000);
    const seconds = ~~((time % 60000) / 1000);
    const milliseconds = ~~((time % 1000) / 10);

    //returns formatted time
    return `${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}.${(milliseconds < 10 ? '0' : '') + milliseconds}`;
  };

   

return (
  // <View style={styles.main(trfaksue)}>
  <View>

    <Text style={styles.inputText}>Time Clock</Text>

    <Text style={styles.clock}>{formatTime(elapsedTime)}</Text>

    <View style={{ flexDirection: 'row', justifyContent: 'center', bottom: 130 }}>

      <TouchableOpacity onPress={clockIn} style={styles.inBtn}>
        <Text style={styles.inBtntxt}>Clock in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={clockOut} style={styles.outBtn}>
        <Text style={styles.outBtntxt}>Clock Out</Text>
      </TouchableOpacity>

    </View>
    {/* TODO */}
    {/* <Text style={styles.inputText}>{tempText.current}</Text> */}
  </View>
)
}

const styles = StyleSheet.create({
  // TODO
// main: mode => {
//   let bColor = mode ? 'white' : '#191b1f'
//   return {
//     flex: 1,
//     backgroundColor: bColor
//   }
// },
btn: {
  backgroundColor: 'grey',
  width: 100,
  padding: 5,
  borderRadius: 10,
  marginBottom: 10,
  bottom: 50,
},
text: {
  color: 'white',
  textAlign: 'center'
},
inputText: {
  textAlign: 'center',
  color: 'white',
  fontSize: 35,
  fontWeight: 600,
  marginBottom: 400,
  marginTop: 50,
},
inBtn:{
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: '#666f75',
  borderTopLeftRadius: 5,
  borderBottomLeftRadius: 5,
  width:160,
  padding: 5,
  height:70,
},
inBtntxt:{
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 500,
  color: '#A2D596',
},
outBtn:{
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: '#666f75',
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
  width:160,
  padding: 5,
  left: 2,
  height:70,
},
outBtntxt:{
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 500,
  color:'#DA2E7C'
},
clock:{
  textAlign: 'center',
  color: 'white',
  fontSize: 35,
  fontWeight: 600,
  bottom: 230,
}
})