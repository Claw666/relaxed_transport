import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { Icon } from "react-native-elements";
import {
  setDestination,
} from "../slices/navSlices";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "../components/NavFavourites";

// var day = new Date();
// var hr = day.getHours();
// if (hr >= 0 && hr < 12) {
//   var wish = "Good Morning !";
// } else if (hr == 12) {
//   var wish = "Good Noon !";
// } else if (hr >= 12 && hr <= 17) {
//   var wish = "Good Afternoon !";
// } else {
//   var wish = "Good Evening !";
// }
// var user = "Fahad Siddiqui";
const NavigationCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-none max-h-full`}>
      {/* <Text style={tw`text-center py-5 text-xl`}>
        {wish} , {user}
      </Text> */}
      <View style={[tw` flex-shrink`, styles.bgColor]}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Search for a destination"
            
            textInputProps={{ placeholderTextColor: 'white' }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            enablePoweredByContainer={false}
            minLength={3}
            fetchDetails={true}
            returnKeyType={"search"}
            styles={styles}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              // console.log(data.description)
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionCard");
            }}
          />
        </View>
        <NavFavourites />
      </View>
      {/* <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-200`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="#fff" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row  justify-between w-24 px-4 py-3 rounded-full border`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="#000"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default NavigationCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#353A50",
    color: 'white',
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  bgColor: {
    backgroundColor: '#292F42',
    color: 'white'
  }
});
