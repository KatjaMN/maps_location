import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button, TextInput, Text } from 'react-native-web';
//import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function App() {

  const [location, setLocation] = useState(null);
  const [addressText, setAddressText] = useState('');
  const [addressCoordinates, setAddressCoordinates] = useState('');
  const [region, setRegion] = useState('');


  const getAddressCoordinates = async () => {

    try {
        const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=TING5iJW7YfSuGjqRg3VgVvrBkHnKjGL&location=${addressText}`);
        const json = await response.json();
        console.log(json.results);
        setAddressCoordinates(json.results);
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error);
    }
}


const region = {
  latitude: addressCoordinates.locations.latLng.lat,
  longitude: addressCoordinates.locations.latLng.lng,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221
}


const initial = {
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221
}


const coordinates = {
  latitude: 60.201373,
  longitude: 24.934041
};


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


  return (
    <View style={styles.container}>
       <MapView
        style={styles.map}
        region={ region }
        initialRegion={ initial }
      >
        <Marker
          coordinate={coordinates}
          title='Haaga-Helia'
        />
      </MapView>
      
      <Text>Write an address</Text>
      <TextInput 
      style={styles.input}
      placeholder= {'Write an address'}
      value={addressText}
      onChangeText={text => setAddressText(text)} 
       />

      <View style={styles.buttonView}>
        <Button onPress={ getAddressCoordinates } title='Find address' />
      </View>

    </View>
  );
}

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
