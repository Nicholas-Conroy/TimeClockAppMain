import { View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/Pages/Login';
import TimeClock from './src/Pages/TimeClock';
import Records from './src/Pages/Records';
import NewDay from './src/Pages/NewDay';
import AddShifts from './src/Pages/AddShifts';

export default function App() {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(null);

//Calls Login page if user is false (not logged in)
if (!user) {
  return (<Login status={user => setUser(user)} />)
}

//renders extra tab if boss is using app, allows for shift scheduling
// if(user === 'JUjk57uHYzdztZkJb37e1yOwpdW2'){
//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//         <Tab.Navigator
//         screenOptions={{
//           tabBarStyle: {
//             backgroundColor: 'black',
//           },
//           headerShown: false
//         }}
//         >
//           <Tab.Screen
//             name='Home'
//             component={NewDay}
//             // children={() => <NewDay userID={user}/>}
//             //send user key (ID) to New Day page
//             initialParams={{ user: user }}
//             options={{
//               tabBarIcon: ({ color, size }) => {
//                 return <FontAwesome name='calendar' color={color} size={size} />
//               },
//               tabBarActiveTintColor: '#56a3a6'
//             }}
//           />
  
//           <Tab.Screen
//             name='New Sheet'
//             component={TimeClock}
//             // children={() => <TimeClock userID={user}/>}
//             //send user key (ID) to TimeClock page
//             initialParams={{ user: user }}
//             options={{
//               tabBarIcon: ({ color, size }) => {
//                 return <FontAwesome name='plus-square-o' color={color} size={size} />
//               },
//               tabBarActiveTintColor: '#56a3a6'
  
//             }}
//           />
  
//           <Tab.Screen
//             name='Saved'
//             component={Records}
//             initialParams={{ user: user }}
//             options={{
//               tabBarIcon: ({ color, size }) => {
//                 return <FontAwesome name='edit' color={color} size={size} />
//               },
//               tabBarActiveTintColor: '#56a3a6'
//             }}
//           />
  
//           <Tab.Screen
//             name='NewShifts'
//             component={AddShifts}
//             initialParams={{ user: user }}
//             options={{
//               tabBarIcon: ({ color, size }) => {
//                 return <FontAwesome name='calendar' color={color} size={size} />
//               },
//               tabBarActiveTintColor: '#56a3a6',
//               tabBarLabel: 'New Shifts'
//             }}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </View>
//   )
// }

return (
  <View style={styles.container}>
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
        },
        headerShown: false
      }}
      >
        <Tab.Screen
          name='Home'
          component={NewDay}
          // children={() => <NewDay userID={user}/>}
          //send user key (ID) to New Day page
          initialParams={{ user: user }}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name='calendar' color={color} size={size} />
            },
            tabBarActiveTintColor: '#56a3a6'
          }}
        />

        <Tab.Screen
          name='New Sheet'
          component={TimeClock}
          // children={() => <TimeClock userID={user}/>}
          //send user key (ID) to TimeClock page
          initialParams={{ user: user }}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name='plus-square-o' color={color} size={size} />
            },
            tabBarActiveTintColor: '#56a3a6'

          }}
        />

        <Tab.Screen
          name='Saved'
          component={Records}
          initialParams={{ user: user }}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome name='edit' color={color} size={size} />
            },
            tabBarActiveTintColor: '#56a3a6'
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  </View>
)
}

const styles = StyleSheet.create({
container: {
  flex: 1
}
})
