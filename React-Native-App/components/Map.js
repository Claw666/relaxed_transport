import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrigin, selectDestination, setTravelTimeInformation, selectTravelMode, selectTransitMode, selectRoutingPref, setSetps, selectTravelTimeInformation, setCal, setCo2} from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useRef } from 'react';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const travelMode = useSelector(selectTravelMode);
  const transitMode = useSelector(selectTransitMode);
  const routingPref = useSelector(selectRoutingPref);
  const travelTime = useSelector(selectTravelTimeInformation);

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 150, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin && !destination) return;
    const getTravelTime = async () => {
      try {
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=metric&mode=${travelMode.mode}&key=${GOOGLE_MAPS_APIKEY}`).then((res) => res.json())
          .then((data) => {
            // console.log(data);
            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
          })
      } catch (err) {
        console.log('Warning:', err);
      }
    }

    getTravelTime()
  }, [origin, destination, GOOGLE_MAPS_APIKEY, travelMode]);

  useEffect(() => {
    if (!origin && !destination) return;
    const getSteps = async () => {
      try {
        fetch(`https://lneprkwux0.execute-api.eu-central-1.amazonaws.com/test/route?mode=${travelMode.mode}&origin=${origin.description}&destination=${destination.description}&departure=28/03/2022 10:40&key=AIzaSyCpO7sOkYBBe9BFFDxe5ze7-mDK-qCMF3g`).then((res) => res.json())
          .then((data) => {
            // console.log(data.body.steps);
            dispatch(setSetps(data.body.steps));
          })
      } catch (err) {
        console.log('Warning:', err);
      }
    }

    getSteps()
  }, [origin, destination, travelMode]);

  useEffect(() => {
    if (!origin && !destination) return;
    const minute = travelTime?.duration?.value / 60;
    const getCal = async () => {
      try {
        fetch(`https://lneprkwux0.execute-api.eu-central-1.amazonaws.com/test/calories?sex=male&exercise=walking&duration=${minute}`).then((res) => res.json())
          .then((data) => {
            // console.log(data?.body);
            dispatch(setCal(data?.body));
          })
      } catch (err) {
        console.log('Warning:', err);
      }
    }

    getCal()
  }, [travelTime]);

  useEffect(() => {
    if (!origin && !destination) return;
    const distance = travelTime?.distance?.value / 1000;
    const getCO2 = async () => {
      try {
        fetch(`https://lneprkwux0.execute-api.eu-central-1.amazonaws.com/test/co2emissions?mode=transit&distance=${distance}`).then((res) => res.json())
          .then((data) => {
            console.log(data.body);
            dispatch(setCo2(data?.body.estimateCO2kg));
          })
      } catch (err) {
        console.log('Warning:', err);
      }
    }

    getCO2()
  }, [travelTime]);



  return (
    <MapView
      // provider={MapView.PROVIDER_GOOGLE}
      ref={mapRef}
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.020,
        longitudeDelta: 0.008,
      }}
      enablePoweredByContainer={false}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          mode="WALKING"
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={7}
          strokeColor="#353A50"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}

    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})