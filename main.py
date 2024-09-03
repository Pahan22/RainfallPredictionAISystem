from geopy.geocoders import Nominatim

# Create a geolocator object with a specific user agent
geolocator = Nominatim(user_agent="shenalorlof@gmail.com")

# Function to get latitude and longitude
def get_lat_long(city_name):
    location = geolocator.geocode(city_name)
    if location:
        return location.latitude, location.longitude
    else:
        return None, None

# Enter the city name
city = input("Enter the city name: ")

# Get latitude and longitude
latitude, longitude = get_lat_long(city)

if latitude and longitude:
    print(f"City : {city} are {latitude} and {longitude}, respectively.")
else:
    print(f"Could not find the location for {city}.")
