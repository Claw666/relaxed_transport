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
      icon: "compass-outline",
      location: "Navigation Steps",
      url: "NavDetailCard"
    },
    {
      id: 456,
      icon: "cloudy-night-outline",
      location: "Weather",
      url: "WeatherCard"
    },
    {
      id: 789,
      icon: "newspaper-outline",
      location: "News",
      url: "NewsCard"
    },
  ];
  
  const MenuNavigation = () => {
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
        renderItem={({ item: { location, url, icon, lonLat }}) => (
          <TouchableOpacity 
          style={[tw`flex-row p-5`]}
          onPress={() => {
            navigation.navigate(url);
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
              <Text style={tw`pt-1 font-semibold text-lg text-white`}>{location}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  };
  
  export default MenuNavigation;
  
  const styles = StyleSheet.create({});
  