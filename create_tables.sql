/*Scripts to create our tables in the MariaDB database*/
delete from music;

CREATE TABLE music (
	username text,
	music_vibe text,
	playlist_name text,
	playlist_id text,
	playlist_length float,
	creation_time datetime,
	songs_ID text
  );
 
CREATE TABLE users (
	user_id float,
	user_email text,
	move_round_username text,
	spotify_username text
);

CREATE TABLE routes(
	user_id float,
	route_id float,
	departure text,
	arrival text,
	travel_length float,
	activity_intensity text,
	transportation_mode text,
	weather text
);

CREATE TABLE co2_savings(
	route_id float,
	user_id float,
	co2_saved float,
	energy_saved float
);

CREATE TABLE calories_burnt(
	route_id float,
	user_id float,
	calories_burnt float
);