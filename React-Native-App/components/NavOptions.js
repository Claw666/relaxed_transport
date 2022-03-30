import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch  } from "react-redux";
import { selectOrigin, setTravelMode, setTransitMode, setRoutingPref} from "../slices/navSlices";

const commuteType = [
  {
    id: "105",
    title: "Biking",
    mode: "bicycling",
    transitmode: "",
    screen: "MapScreen",
    icon: "bicycle"
  },
  {
    id: "106",
    title: "Walking",
    mode: "walking",
    transitmode: "",
    screen: "MapScreen",
    icon: "walking"
  },
  {
    id: "107",
    title: "Running",
    mode: "bicycling",
    transitmode: "",
    screen: "MapScreen",
    icon: "running"
  },
  {
    id: "101",
    title: "Bus",
    mode: "transit",
    transitmode: "bus",
    screen: "MapScreen",
    icon: "bus"
  },
  {
    id: "102",
    title: "Tram",
    mode: "transit",
    transitmode: "tram",
    screen: "MapScreen",
    icon: "tram"
  },
  {
    id: "103",
    title: "Metro",
    mode: "transit",
    transitmode: "subway",
    screen: "MapScreen",
    icon: "subway"
  },
  {
    id: "104",
    title: "Train",
    mode: "transit",
    transitmode: "train",
    screen: "MapScreen",
    icon: "train"
  },

];

const ActivityIntensity = [
  {
    id: "101",
    title: "No Sweat",
    routingPreference: "LESS_WALKING",
    screen: "MapScreen",
    icon: "tint-slash"
  },
  {
    id: "102",
    title: "Moderate",
    routingPreference: "FEWER_TRANSFERS",
    screen: "MapScreen",
    icon: "hand-sparkles"
  },
  {
    id: "103",
    title: "Sweaty",
    routingPreference: "",
    screen: "MapScreen",
    icon: "tint"
  },
];

const Mood = [
  {
    id: "101",
    title: "Business",
    routingPreference: "LESS_WALKING",
    screen: "MapScreen",
    icon: "user-tie"
  },
  {
    id: "102",
    title: "Casual",
    routingPreference: "FEWER_TRANSFERS",
    screen: "MapScreen",
    icon: "user"
  },
  {
    id: "103",
    title: "Sporty",
    image: "https://links.papareact.com/28w",
    screen: "MapScreen",
    icon: "dumbbell"
  },
];



const NavOptions = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedActInt, setSelectedActInt] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState(null);
  

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={commuteType}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, icon, title, image }, item }) => (
          <TouchableOpacity
            style={[tw` p-3 m-2 w-24 rounded-2xl ${id === selectedTransport?.id ? 'bg-gray-900': 'bg-gray-700'}`]}
            disabled={!origin}
            onPress={() => {
              // console.log(item.mode)
              dispatch(
                setTravelMode({
                  mode: item.mode
                }),
                setSelectedTransport(item)
              )
            }}
          >
            <View style={tw`${!origin && "opacity-20"}`}>
              <Icon
                style={tw`p-2`}
                type='font-awesome-5' name={item.icon} color="white" />

              <Text style={[tw`text-center`, {
                marginTop: 2,
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
                // textAlign: 'center'
              }]}>{item.title}</Text>

            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={{
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',

      }}>Activity Intensity</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={ActivityIntensity}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, icon, title, image }, item }) => (
          <TouchableOpacity
            onPress={() => { 
              dispatch(
                setRoutingPref({
                  pref: item.routingPreference
                })
              ),
              setSelectedActInt(item) 
            }}
            style={[tw`p-3 m-2 w-24 rounded-2xl ${id === selectedActInt?.id ? 'bg-gray-900': 'bg-gray-700'}`]}
            disabled={!origin}
          >
            <View style={tw`${!origin && "opacity-20"}`}>
              <Icon
                style={tw`p-2`}
                type='font-awesome-5' name={item.icon} color="white" />

              <Text style={[tw`text-center`, {
                marginTop: 2,
                fontSize: 15,
                color: 'white',
                fontWeight: 'bold',
              }]}>{item.title}</Text>

            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={{
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',

      }}>Mood</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={Mood}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, icon, title, image }, item }) => (
          <TouchableOpacity
            onPress={() => { setSelectedMood(item) }}
            style={[tw`p-3 m-2 w-24 rounded-2xl ${id === selectedMood?.id ? 'bg-gray-900': 'bg-gray-700'}`]}
            disabled={!origin}
          >
            <View style={tw`${!origin && "opacity-20"}`}>
              <Icon
                style={tw`p-2`}
                type='font-awesome-5' name={icon} color="white" />
              <Text style={[tw`text-center`, {
                marginTop: 2,
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
              }]}>{title}</Text>

            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[tw`py-4 mt-4 rounded`, styles.secondaryColor]}
        onPress={() => navigation.navigate('MapScreen')}
        disabled={!origin}
      >
        <Text style={tw`text-center text-white text-base font-bold`}>
          Select Destination
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default NavOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgColor: {
    backgroundColor: '#353A50',
    color: 'white'
  },
  secondaryColor: {
    backgroundColor: '#3ACCE1',
    color: 'white',
  }
});