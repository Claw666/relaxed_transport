# The line below is used to run the script. It is of the form
# python create_spotify_playlist.py <user_id> <vibe> <duration>
# python create_spotify_playlist.py pblanchet1234 chill 800

from datetime import datetime
import spotipy
import time
from spotipy.oauth2 import SpotifyClientCredentials,SpotifyOAuth
import pandas as pd
import spotipy.util as util
import sys

def GetPlaylistID(username, playlist_name,sp):
    playlist_id = ''
    playlists = sp.user_playlists(username)
    for playlist in playlists['items']:  # iterate through playlists I follow
        if playlist['name'] == playlist_name:  # filter for newly created playlist
            playlist_id = playlist['id']
    return playlist_id

def call_playlist(sp,creator, playlist_id,duration):
    
    playlist_features_list = ["artist","album","track_name",  "track_id","danceability","energy","key","loudness","mode", "speechiness","instrumentalness","liveness","valence","tempo", "duration_ms","time_signature"]
    playlist_df = pd.DataFrame(columns = playlist_features_list)
    
    playlist = sp.user_playlist_tracks(creator, playlist_id)["items"]
    for track in playlist:
        # Create empty dict
        playlist_features = {}
        # Get metadata
        playlist_features["artist"] = track["track"]["album"]["artists"][0]["name"]
        playlist_features["album"] = track["track"]["album"]["name"]
        playlist_features["track_name"] = track["track"]["name"]
        playlist_features["track_id"] = track["track"]["id"]
        
        # Get audio features
        audio_features = sp.audio_features(playlist_features["track_id"])[0]
        for feature in playlist_features_list[4:]:
            playlist_features[feature] = audio_features[feature]
        
        # Concat the dfs
        track_df = pd.DataFrame(playlist_features, index = [0])
        playlist_df = pd.concat([playlist_df, track_df], ignore_index = True)

        # Only keep the first songs untile the duration of our commute is over
        sum_length = 0
        adapted_playlist = []
        for index, row in playlist_df.iterrows():
            if sum_length + int(row["duration_ms"])/1000 < int(duration):
                adapted_playlist.append(row["track_id"])
                sum_length += row["duration_ms"]/1000

    return adapted_playlist

def create_playlist(username,vibe,duration):

    # All our variables needed for later
    cid = '64d54961573f46d28db7f25ae2450a14' # client_id of the Spotify app
    secret = '60d8195d48d54a65ae9def882081124c' # Secret id of the Spotify app
    scope = "playlist-modify-public" # Scope of our requests
    creation_time = datetime.now()
    creation_time_str = creation_time.strftime("%d/%m/%Y %H:%M")
    playlist_name = "Trip " + vibe + " " + creation_time_str # Playlist name
    playlist_vibe = { # Dictionary that stores the id of playlist we want
        "chill":"0vvXsWCC9xrXsKd4FyS8kM",
        "motivational":"3jxMoEAFkRawkZJlY9Yuke",
        "meditation":"37i9dQZF1DWZqd5JICZI0u",
        "casual":"6wjCvkAFovrVIRM8VfZLZG"
    }

    # We get the token and creat a spotipy object
    token = util.prompt_for_user_token(username,scope=scope,client_id=cid,client_secret=secret,redirect_uri='http://localhost:8000/')
    sp = spotipy.Spotify(auth=token)

    # We create the playlist in the user playlists
    sp.user_playlist_create(username, name=playlist_name)

    playlist_id = GetPlaylistID(username, playlist_name,sp) # We get the id of the playlist created
    songs = call_playlist(sp,"spotify",playlist_vibe[vibe],duration) # We collect the songs according to the vibe
    sp.user_playlist_add_tracks(username, playlist_id, songs) # We add the tracks to the playlist
    
    value_return = [
        username,
        vibe,
        playlist_name,
        playlist_id,
        duration,
        creation_time,
        str(songs)
    ]
    
    return value_return

if __name__ == "__main__":
    main(sys.argv[1],sys.argv[2],sys.argv[3])