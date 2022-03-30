import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import {
  selectDestination,
  setDestination,
  setOrigin,
} from "../slices/navSlices";
import { useDispatch } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const favLocations = [
  {
    id: 123,
    icon: "home",
    location: "Home",
    destination: "Lange Niezel 29-1 1012 GS Amsterdam",
    lonLat: {
      "lat": 52.374779, 
      "lng": 4.898659,
    } 
  },
  {
    id: 456,
    icon: "briefcase",
    location: "Work",
    destination: "Evert van de Beekstraat 354, 1118 CZ Schiphol",
    lonLat: {
      "lat": 52.30356090000001,
      "lng": 4.749838200000001,
    }
  },
  {
    id: 789,
    icon: "book-outline",
    location: "University",
    destination: "Science Park 1012 WX Amsterdam",
    lonLat: {
      "lat": 52.3538242,
      "lng": 4.9572223,
    }
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <FlatList
      data={favLocations}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View 
        style={[tw`bg-gray-600`,{height:0.3}]}
         />
      )}
      renderItem={({ item: { location, destination, icon, lonLat } }) => (
        <TouchableOpacity 
        style={[tw`flex-row p-5`]}
        onPress={() => {
          dispatch(
            setDestination({
              location: lonLat,
              description: destination,
            })
          );
          navigation.navigate("RideOptionCard");
        }}
        >
          <Icon
            style={[tw`mr-4 rounded-full p-3`, {backgroundColor: '#3ACCE1'}]}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg text-white`}>{location}</Text>
            <View style={{paddingRight:50}}>
            <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
