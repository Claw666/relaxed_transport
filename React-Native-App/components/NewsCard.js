import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { selectSteps, selectTravelTimeInformation, setNews, selectNews,  selectWeather, selectCal, selectCo2, selectTravelMode} from "../slices/navSlices";
import { WebView } from 'react-native-webview';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import MenuNavigation from "./MenuNavigation";




const NewsCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cal = useSelector(selectCal);
  const co2 = useSelector(selectCo2);
  const travelMode = useSelector(selectTravelMode);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const newsData = useSelector(selectNews);
  
  useEffect(() => {
    const getNews = async () => {
      try {
        fetch(`https://lneprkwux0.execute-api.eu-central-1.amazonaws.com/test/news?country=nl&category=business`).then((res) => res.json())
          .then((data) => {
            // console.log(data.body);
            dispatch(setNews(data.body))
          })
      } catch (err) {
        console.log('Warning:', err);
      }
    }

    getNews()
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
            <Text style={tw` text-xl text-center font-bold text-white`}> News </Text >
            <FlatList
        showsHorizontalScrollIndicator={false}
        data={newsData}
        horizontal={false}
        keyExtractor={(item) => item.title}
        renderItem={({ item: { id, icon, title, image }, item }) => (
          <TouchableOpacity
            style={[tw` p-3 m-2 bg-gray-700 rounded-l`]}
            onPress={() => {
            }}
          >
            <View >
              {/* <Icon
                style={tw`p-2`}
                type='font-awesome-5' name={item.icon} color="white" /> */}

              <Text style={[ {
                marginTop: 2,
                fontSize: 12,
                color: 'white',
                fontWeight: 'normal',
                
              }]}>{item.title}</Text>

            </View>
          </TouchableOpacity>
        )}
      />
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

export default NewsCard;

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
