from sqlalchemy import create_engine
from sqlalchemy.types import Float,Integer, Text, String, DateTime,BigInteger
import mysql.connector


def create_db_connection():
    mydb = mysql.connector.connect(
        host="dscs-db.cn8v5eptroy1.eu-central-1.rds.amazonaws.com",
        user="dscs_user",
        password="dscs_password",
        database="dscs_db"
        )
    return mydb

def add_playlist_to_table(value_return): 
    # Function to add the values of a spotify create playlist query to the database
    tablename = "music" # db table to store music information
    connection = create_db_connection() # We create a connection to the db
    cur = connection.cursor() # We create a cursor to connect to the db
    sql = "INSERT INTO " + tablename + " VALUES (%s, %s,%s, %s,%s, %s,%s)" # sql query
    val = (value_return[0], value_return[1],value_return[2],value_return[3],\
        value_return[4],value_return[5],value_return[6])
    cur.execute(sql, val) # We execute the cursor
    connection.commit() # We commit the execution

def add_user_to_table(user_values):
    tablename = "users"
    connection = create_db_connection() # We create a connection to the db
    cur = connection.cursor() # We create a cursor to connect to the db
    sql = "INSERT INTO " + tablename + " VALUES (%s, %s,%s, %s)" # sql query
    val = (user_values[0], user_values[1],user_values[2],user_values[3])
    cur.execute(sql, val) # We execute the cursor
    connection.commit() # We commit the execution

def add_route_to_table(route_values):
    tablename = "routes"
    connection = create_db_connection() # We create a connection to the db
    cur = connection.cursor() # We create a cursor to connect to the db
    sql = "INSERT INTO " + tablename + " VALUES (%s,%s,%s,%s,%s,%s,%s,%s)" # sql query
    val = (route_values[0], route_values[1],route_values[2],route_values[3],\
        route_values[4], route_values[5],route_values[6],route_values[7])
    cur.execute(sql, val) # We execute the cursor
    connection.commit() # We commit the execution

def add_co2_to_table(co2_values):
    tablename = "co2_savings"
    connection = create_db_connection() # We create a connection to the db
    cur = connection.cursor() # We create a cursor to connect to the db
    sql = "INSERT INTO " + tablename + " VALUES (%s,%s,%s,%s)" # sql query
    val = (co2_values[0], co2_values[1],co2_values[2],co2_values[3])
    cur.execute(sql, val) # We execute the cursor
    connection.commit() # We commit the execution

def add_calories_to_table(calories_values):
    tablename = "calories_burnt"
    connection = create_db_connection() # We create a connection to the db
    cur = connection.cursor() # We create a cursor to connect to the db
    sql = "INSERT INTO " + tablename + " VALUES (%s,%s,%s)" # sql query
    val = (calories_values[0], calories_values[1],calories_values[2])
    cur.execute(sql, val) # We execute the cursor
    connection.commit() # We commit the execution