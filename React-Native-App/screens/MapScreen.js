import { View, Image, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackActions } from '@react-navigation/native';
import NavigationCard from '../components/NavigationCard';
import RideOptionCard from '../components/RideOptionCard';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import MenuNavigation from '../components/MenuNavigation';
import NavDetailCard from '../components/NavDetailCard';
import WeatherCard from '../components/WeatherCard';
import NewsCard from '../components/NewsCard';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeScreen')}
        style={[tw` absolute top-10 left-4 z-50 p-3 rounded-full shadow-lg`, { backgroundColor: '#292F42' }]}>
        <Icon name='menu' color="white" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}><Map /></View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen name="NavigationCard" component={NavigationCard} options={{ headerShown: false }} />
          <Stack.Screen name="RideOptionCard" component={RideOptionCard} options={{ headerShown: false }} />
          <Stack.Screen name="NavDetailCard" component={NavDetailCard} options={{ headerShown: false }} />
          <Stack.Screen name="WeatherCard" component={WeatherCard} options={{ headerShown: false }} />
          <Stack.Screen name="NewsCard" component={NewsCard} options={{ headerShown: false }} />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 1,
  },
});