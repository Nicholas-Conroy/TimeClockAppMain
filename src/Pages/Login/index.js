import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import firebase from '../../firebaseConfig'
import SignUp from '../SignUp';

export default function Login({ status }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  function login() {
    const user = firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        Alert.alert(`Welcome back ${email.split('@')[0]}!`); //takes only the part of the email before the @ sign, I think it looks better than the whole email
        status(user.user.uid);
      })
      .catch(error => {
        Alert.alert('Something went wrong: ' + error);
        return;
      })
    status();
  }

  function gotoSignUp(){
    setUser(null);
  }

  if (!user) {
    return <SignUp user={x => {setUser(x)}} status={status} />
  }
  

  return (
    <View style={styles.main}>
    
      <Text style={{ marginBottom: 50, marginTop: 35, textAlign: 'center', color: 'white', fontWeight: '500', fontSize: 25, letterSpacing: 2 }}>Welcome!</Text>
      <Text style={{ marginBottom: 50, textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#808080', marginBottom: 30 }}>Please log into your account</Text>
      
      <TextInput
        style={styles.input}
        placeholder='name@example.com'
        placeholderTextColor={'#c9f3f5'}
        onChangeText={text => setEmail(text)}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        placeholder='******'
        placeholderTextColor={'#c9f3f5'}
        onChangeText={text => setPassword(text)}
        autoCapitalize='none'
      />

      <TouchableOpacity onPress={login}
        style={[styles.Login, { backgroundColor: '#56a3a6', marginTop: 10 }]}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>


      <Text onPress={gotoSignUp}
            style={[styles.dontHavetxt]}>Don't have an Account? <Text style ={{color:'#56a3a6'}}> Sign Up</Text></Text> 

    </View>
  )
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
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
    color: 'white',
    padding: 10
  },
  inputText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 19,
    fontWeight: '600'
  },
  Login: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 365,
    height: 70,
    marginBottom: 10,
    borderRadius: 15,
    padding: 5
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 19,
    fontWeight: '800'
  },
  dontHavetxt: {
      textAlign: 'right',
      color:'white',
      fontSize: 15,
      marginRight: 15,
  }
})
