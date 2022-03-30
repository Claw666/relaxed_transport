import { StatusBar } from 'expo-status-bar';
import { View,StyleSheet,KeyboardAvoidingView,Platform } from 'react-native';
import {Provider} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#2A2E43'
    },
  };
  return (
    <Provider store={store}>
    <NavigationContainer theme={MyTheme}>
    <SafeAreaProvider>
    <KeyboardAvoidingView 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
    style={{flex:1}}
    keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
    >
    <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
    <Stack.Screen name="MapScreen" component={MapScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
    </KeyboardAvoidingView>
    </SafeAreaProvider>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgColor: {
    backgroundColor: '#292F42',
    color: 'white'
  }
});
