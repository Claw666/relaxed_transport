import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { selectSteps, selectTravelTimeInformation, setWeather, selectWeather, selectCal, selectCo2, selectTravelMode} from "../slices/navSlices";
import { WebView } from 'react-native-webview';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import MenuNavigation from "./MenuNavigation";




const WeatherCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cal = useSelector(selectCal);
  const co2 = useSelector(selectCo2);
  const travelMode = useSelector(selectTravelMode);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const weatherData = useSelector(selectWeather);
  
  useEffect(() => {
    const getWeather = async () => {
      try {
        fetch(`https://lneprkwux0.execute-api.eu-central-1.amazonaws.com/test/weather`).then((res) => res.json())
          .then((data) => {
            // console.log(data.body);
            dispatch(setWeather(data.body))
          })
      } catch (err) {
        console.log('Warning:', err);
      }
    }

    getWeather()
  }, []);


  return (
    <SafeAreaView>
      <View style={[tw`flex-grow`, styles.bgColor]}>
        <View style={tw`flex-row p-2`} >
          <TouchableOpacity
            onPress={() => { navigation.navigate('RideOptionCard') }}
            style={[tw`p-3 mt-2 mr-1 z-50 ` ,]} >
            <Icon name='chevron-left' type="fontawesome" color='white' />
          </TouchableOpacity>
          <Text style={tw`pr-12 my-4 text-xl text-white`}>On Trip •</Text>
          <Text style={tw`relative -left-12 top-5 text-left text-sm text-white`}> {travelTimeInformation?.distance?.text} | </Text>
          <Text style={tw`relative -left-12 top-5 text-left text-sm text-white`}> {travelTimeInformation?.duration?.text} | </Text>
          <Text style={tw`relative -left-12 top-5 text-left text-sm text-white ${travelMode.mode !==( "walking" ) && 'hidden'}`}> {Math.floor(cal)} Cal</Text>
          <Text style={tw`relative -left-12 top-5 text-left text-sm text-white ${travelMode.mode !== "transit" && 'hidden'}`}> {Number((co2).toFixed(3))} CO2kg</Text> 
        </View>
        <View>
            <Text style={tw`my-4 text-xl text-center font-bold text-white`}>Amsterdam</Text>
            <Text style={tw`my-4 text-4xl text-center font-bold text-white`}>{weatherData?.temperature} </Text ><Text style={tw`relative -top-12  left-60 text-xl font-bold text-white`}>°C</Text>
            <Text style={tw` text-xl text-sm text-center my-1 text-white`}>Rainfall in the last 24h: {weatherData?.rainFallLast24Hour}% </Text>
            <Text style={tw` text-xl text-sm text-center my-1 text-white`}>Rainfall in the last hour:  {weatherData?.rainFallLastHour}%</Text>
            <Text style={tw` text-xl text-sm text-center my-1 text-white`}>Current wind speed: {weatherData?.windspeed} knots</Text>
            <Text style={tw` text-xl text-sm text-center my-1 text-white`}>Current wind direction: {weatherData?.winddirection}</Text>
        </View>

        {/* <FlatList data={steps}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item,index }) => (
            <TouchableOpacity>
              <View style={tw`-ml-6`}>
              <WebView
                    originWhitelist={['*']}
                    source={{ html: '${item.html_instructions}' }}
                />
                <Text style={tw`left-5 px-10 my-2 text-sm text-white`}>{item.html_instructions}</Text>
              </View>
  
            </TouchableOpacity>
          )}
        /> */}
        {/* <View style={tw`mt-auto mx-2`}>
          <TouchableOpacity disabled={!selected} style={[tw`py-2 m-2  rounded ${!selected && 'bg-gray-900'}`, styles.secondaryBackground]}>
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#292F42',
    color: 'white'
  },
  secondaryBackground: {
    backgroundColor: '#3ACCE1',
    color: 'white',
  }
});
