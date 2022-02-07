import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button, TextInput } from 'react-native-web';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function App() {

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');


  const getCoordinates = async () => {

    try {
        const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=TING5iJW7YfSuGjqRg3VgVvrBkHnKjGL&location=Washington,DC`);
        const json = await response.json();
        console.log(json.results);
        setRegion(json.results);
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error);
    }
}




const showAddress = () =>{
  
  setRegion

}



/*
const findAddress = () => {
  const addressCoordinates = address.results;
}
*/

  useEffect(() => (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(location);
    console.log('Location:', location)
  })(), []);




  const coordinates = {
    latitude: 60.201373,
    longitude: 24.934041
  };


  return (
    <View style={styles.container}>
       <MapView
        style={styles.map}
        region={ region }
      >
        <Marker
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>
      
      <TextInput 
      style={styles.input}
      placeholder= {'Write an address'}
      value={address}
      onChangeText={text => setAddress(text)} 
       />

      <View style={styles.buttonView}>
        <Button onPress={ getCoordinates } title='Find address' />
      </View>

    </View>
  );
}

     /*
   
      
*/

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "50%",
    height: "50%",
    borderColor: 'gray'
  },
  input: {
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
  },
  buttonView: {
    marginBottom: 10,
  }

});
