import requests
import json
import urllib
from urllib.request import urlopen

def get_weather_json():
    response = requests.get("https://data.buienradar.nl/2.0/feed/json")
    json_object = response.json()
    return json_object

def get_closest_station(json_object,user_lat,user_long):
    lat_long_station = [[x["$id"],x["stationname"],x["lat"],x["lon"]] for x in json_object["actual"]["stationmeasurements"]]
    closest_station = {"stationname":"","$id":0,"distance":10}
    for station in lat_long_station:
        if (abs(station[2]-user_lat) + abs(station[3]-user_long)) < closest_station["distance"]:
            closest_station["distance"] = (abs(station[2]-user_lat) + abs(station[3]-user_long))
            closest_station["stationname"] = station[1]
            closest_station["$id"] = station[0]
    return closest_station
    #lat_long_station = [[x["stationname"],x["lat"],x["lon"],x["windgusts"],x["humidity"]] for x in json_object["actual"]["stationmeasurements"]]

def get_values_station(json_object,station_id):
    station_values = [x for x in json_object["actual"]["stationmeasurements"] if x["$id"] == station_id]
    return station_values[0]