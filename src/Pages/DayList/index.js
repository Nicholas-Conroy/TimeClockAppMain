//to hold list of days worked with hours, for the records page (like the tasklist.js for the TodoList App)
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DayList({data, deleteItem}) {
  return (
    <View style={styles.main}>
        
      <View style={styles.record}>
        <TouchableOpacity onPress={() => {deleteItem(data.key)}} style={styles.trashBtn}>
          <FontAwesome name='trash' color = 'grey' size ={20}/>
        </TouchableOpacity>
        <Text style={styles.inputText}>{data.date}</Text>
        <View style={styles.recordTimes}>
          <Text style={[styles.inputText, {color: '#b7edab'}]}>{data.clockIn}</Text>
          <Text style={[styles.inputText, {color: '#DA2E7C'}]}>{data.clockOut}</Text>
        </View>
      </View>
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
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomColor: 'white',
  padding: 10,
  borderBottomWidth: 1
},
recordTimes: {
  marginLeft: 45,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
inputText: {
  textAlign: 'center',
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
  marginTop: 50
},
trashBtn: {
  position: 'relative',
  top: 48,
  right: 9
}
})