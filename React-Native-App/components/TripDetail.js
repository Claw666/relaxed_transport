import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SwipeUpDown from "react-native-swipe-up-down";


const TripDetail = () => {
  return (
    <View style={styles.container}>


   
    <SwipeUpDown
      itemMini={(show) => (
        <View
          style={{
            alignItems: "center",
            flex: 1,
            backgroundColor: "green",
          }}
        >
          <Text onPress={show}>This is the mini view, swipe up!</Text>
        </View>
      )}
      itemFull={(close) => {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "red",
            }}
          >
            <Text onPress={close} style={styles.instructions}>
              Swipe down to close
            </Text>
          </View>
        );
      }}
      onShowMini={() => console.log("mini")}
      onShowFull={() => console.log("full")}
      animation="easeInEaseOut"
    //   extraMarginTop={inset.top}
      disablePressToShow={false} // Press item mini to show full
      style={{ backgroundColor: "#000" }} // style for swipe
    />
  </View>
  )
}

export default TripDetail

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      marginTop: 10,
    },
    instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5,
    },
    panelContainer: {
      flex: 1,
      justifyContent: "center",
    },
  });