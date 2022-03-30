import { Text, View, KeyboardAvoidingView, Image } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlices';
import NavFavourites from '../components/NavFavourites';
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView>
        <View style={tw`p-5`}>
          <Text style={{
            marginTop: 10,
            marginBottom: 20,
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',

          }}>Start planning your journey!</Text>
          <GooglePlacesAutocomplete
            placeholder='Select your origin'
            textInputProps={{ placeholderTextColor: 'white' }}
            styles={{
              container: {
                flex: 0,
                color: "white",
              },
              textInput: {
                fontSize: 14,
                color: "white",
                backgroundColor: "#353A50",
              }
            }}
            onPress={(data, details = null) => {
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
              }));
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType={'search'}
            enablePoweredByContainer={false}
            minLength={3}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
          />
          <NavOptions />
          {/* <NavFavourites /> */}
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen;


