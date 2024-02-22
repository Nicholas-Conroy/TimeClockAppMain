import { StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Touchable } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import firebase from '../../firebaseConfig';
import DayList from '../DayList';

export default function Records() {
  const navigate = useNavigation();
  const route = useRoute();
  // let shifts = useRef();
  const [shifts, setShifts] = useState([]);
  let workHours = useRef();

  //calls timeList every time Records page is focused on; so list of shifts is always properly updated
  useFocusEffect(
    React.useCallback(() => {
      timesList();
    }, [])
    
  );

  //gets array of data objects, with each object containing clockIn/Out times, and the date
  //array is used as data for FlatList
  function timesList(){
    workHours.current = 0;
     firebase.database().ref('Users').child(route.params?.user).once('value', (snapshot) => {
      // shifts.current = [];
      setShifts([]);
      snapshot.forEach((item) => {
        //only date key items (and their child nodes) are added to the list; phone, name, etc are skipped over)
        if (item.key.length === 20) {
          workHours.current += item.val().timeWorked;
        
          let data = {
            key: item.key,
            clockIn: item.val().clockInTime,
            clockOut: item.val().clockOutTime,
            date: item.val().date,
          }
          // shifts.current.push(data);
          setShifts(items => [...items, data]);
        }
      })
    })
  }


  function deleteRecord(key){
    firebase.database().ref('Users').child(route.params?.user).child(key).remove()
    .then(() => {
      //   // recordList.current = route.params?.shifts.filter(item => item.key !== key);
      const tempArray = shifts.filter(item => item.key !== key);
      // shifts.current = tempArray;
      setShifts(tempArray);
    })
  }

  const formatTime = time => {
    //~~ converts whatever values calculated to integers to store in variables
    const minutes = ~~(time / 60000);
    const seconds = ~~((time % 60000) / 1000);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    //returns formatted time
    return `${hours < 10 ? '0' : ''}:${(minutes < 10 ? '0' : '') + minutes}:${(seconds < 10 ? '0' : '') + seconds}`;
  };
  
  return (
    <View style={styles.main}>
      <View style={styles.hours}>
        <Text style={styles.hoursText}>Hours Worked (hr/min/sec): </Text>
        <Text style={styles.timeText}>{formatTime(workHours.current)}</Text>
      </View>
      <View style={styles.record}>
        <Text style={styles.inputText}>Day</Text>
        <View style={[styles.recordTimes, {marginLeft: 110}]}>
          <Text style={[styles.inputText, {color: '#b7edab'}]}>Clock In</Text>
          <Text style={[styles.inputText, {color: '#DA2E7C'}]}>Clock Out</Text>
        </View>
      </View>
      
      <FlatList
      data={shifts} 
      keyExtractor={(item) => item.key}
      renderItem={ ({item}) => (<DayList data ={item} deleteItem = {deleteRecord}/>)}/>


    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#191b1f',
},
record: {
  marginHorizontal: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomColor: 'white',
  padding: 10,
  borderBottomWidth: 1
},
recordTimes: {
  marginLeft: 40,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
inputText: {
  textAlign: 'center',
  color: 'white',
  fontSize: 17,
  fontWeight: '600',
  marginTop: 50
},
hoursText: {
  textAlign: 'left',
  color: 'white',
  fontSize: 17,
  fontWeight: '600',
  marginLeft: 20,
  marginTop: 10 
},
hours: {
  marginTop: 50,
  backgroundColor: 'black',
  marginHorizontal: 10,
  padding: 10,
  borderRadius: 10,
  height: 125
},
timeText: {
  color: 'white',
  textAlign: 'right',
  marginRight: 30,
  marginTop: 10,
  fontSize: 50,
  fontWeight: 600,
}
})