import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import firebase from '../firebaseConfig'

export default function SignUp({ user , status }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');


    function signUp() {
        const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                Alert.alert(`Welcome ${name}, your account has been successfully created!`);
                firebase.database().ref('Users').child(user.user.uid).update({name:name, phone:phone})
                status(user.user.uid);

            })
            .catch(error => {
                Alert.alert('Something went wrong ' + error);
                return;
            })
    }

    function gotoLogin() {
        user('x');
    }


    return (
        <View style={styles.main}>
            <View>
                <Text style={{ marginTop: 35, textAlign: 'center', color: 'white', fontWeight: '500', fontSize:25, letterSpacing: 2 }}>Create a new account</Text>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize:15, color: '#808080', marginBottom: 30 }}>Please fill in the form to continue</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder='name'
                placeholderTextColor={'#c9f3f5'}
                onChangeText={text => setName(text)}
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder='name@example.com'
                placeholderTextColor={'#c9f3f5'}
                onChangeText={text => setEmail(text)}
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder='phone Number'
                placeholderTextColor={'#c9f3f5'}
                onChangeText={text => setPhone(text)}
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder='******' 
                placeholderTextColor={'#c9f3f5'}
                onChangeText={text => setPassword(text)}
                autoCapitalize='none'
            />


            <TouchableOpacity onPress={signUp} style={[styles.SignUp, { backgroundColor: '#56a3a6', marginTop: 10 }]}>
                <Text style={styles.text}>Sign Up</Text>
            </TouchableOpacity>

            <Text onPress={gotoLogin}
            style={[styles.alreadytxt]}>Already have an Account? <Text style ={{color:'#56a3a6'}}> Log In</Text></Text>
            
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
    SignUp: {
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
    alreadytxt: {
        textAlign: 'right',
        color:'white',
        fontSize: 15,
        marginRight: 15,
    }
})
