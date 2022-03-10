import requests, json, time
import polyline, folium
import datetime
import re

with open('config.json') as f:
    config = json.load(f)
    key = config['apiKey']
    
mode = 'walking'
origin = 'Oqium'
destination = 'Oallery'
departure = "09/03/2022 12:48"
arrival = None
   
def convert_unix(date):
    if date != None:
        return int(time.mktime(datetime.datetime.strptime(date, "%d/%m/%Y %H:%M").timetuple()))
    else:
        return None
    
def json_route(origin, destination, departure, arrival):
    url = 'https://maps.googleapis.com/maps/api/directions/json?'
    params = {
        'mode': mode.lower(),
        'origin': origin,
        'destination':destination, 
        'region':'nl',
        'key': key
    }
    if departure != None:
        params['departure_time'] = convert_unix(departure)
    
    response = requests.post(url, params=params)
    if response.status_code == 200:
        return json.loads(response.text)
    else:
        return {}

def get_coordinates(raw_json):
    if len(raw_json) > 0:
        coordinates = polyline.decode(raw_json['routes'][0]['overview_polyline']['points'], 5)
        return coordinates
    else:
        return False

def make_map(coordinates):
    if coordinates != False:
        start_coord = coordinates[0]
        end_coord = coordinates[len(coordinates) - 1]

        map = folium.Map(location=map_start(start_coord, end_coord),
                    zoom_start=15)
        
        folium.PolyLine(coordinates,
                        color='red',
                        weight=5,
                        opacity=0.8).add_to(map)
        
        folium.Marker(location=start_coord, popup=f'Start Location - <b>{origin}</b>', tooltip=f'<strong>{origin}</strong>', icon=folium.Icon(color='red', icon='map-pin', prefix = 'fa')).add_to(map)
        folium.Marker(location=end_coord, popup=f'End Location - <b>{destination}</b>', tooltip=f'<strong>{destination}</strong>', icon=folium.Icon(color='red', icon='flag-checkered', prefix = 'fa')).add_to(map)
        map.save("map.html")
        #display(map)
    else:
        return "Could not process map"
        
def process_routing_info(raw_json):
    steps = []
    distance = raw_json['routes'][0]['legs'][0]['distance']['value']
    duration = raw_json['routes'][0]['legs'][0]['duration']['text']
    
    if mode in ['transit']:
        departure_time = raw_json['routes'][0]['legs'][0]['departure_time']['text']
        arrival_time = raw_json['routes'][0]['legs'][0]['arrival_time']['text']
        times = (departure_time, arrival_time)
        print(f"Planned departure: {departure_time}\nPlanned arrival: {arrival_time}")
    else:
        times = None
    
    if distance >= 1000:
        distance = round(distance/1000, 2)
        print('Distance: {} km'.format(distance))
    else:
        print('Distance {} m'.format(distance))
    print(f"Duration: {duration}")
    
    steps = [re.sub('<[^<]+?>', '', step['html_instructions'].replace('<div style="font-size:0.9em">', '\n')) for step in raw_json['routes'][0]['legs'][0]['steps']]
    for step in range(len(steps)):
        print(f"{step+1}. {steps[step]}")
    return [distance, duration, steps, times]

def main():
    raw_json = json_route(origin, destination, departure, arrival)
    #display(raw_json)
    coordinates = get_coordinates(raw_json)
    make_map(coordinates)
    route_info = process_routing_info(raw_json)
    
main()

