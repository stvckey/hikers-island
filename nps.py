import urllib.request, json
from dotenv import load_dotenv
import os

# Fetching environment variables from .env
load_dotenv()

API_KEY = os.getenv('NPS_API_KEY')

def get_parks():
    base_url = "https://developer.nps.gov/api/v1/parks"
    params = {"api_key": API_KEY, "limit": 49, "start": 1}  # Adjust the limit based on your needs

    parks = []
    total = 0

    #while loop to print ALL of the responses:
    req = urllib.request.Request(base_url + "?" + urllib.parse.urlencode(params))
    response = urllib.request.urlopen(req).read()
    data = json.loads(response.decode('utf-8'))

    parks.extend(data["data"])
    total = data["total"]
    
        #if len(parks) < int(total):
        #    params["start"] += params["limit"]
        #else:
        #    break
    
    #count = 1
    max_desc = 0
    all_park_info = {}
    
    for park in parks:
        park_state = park['addresses'][0]['stateCode']
        park_name = park['fullName']
        park_coord = park["latLong"]
        park_address = [park["addresses"][0]["line1"], park["addresses"][0]["line2"],park["addresses"][0]["city"],park["addresses"][0]["postalCode"]]
        try:
            park_phone = park['contacts']['phoneNumbers'][0]['phoneNumber']
        except IndexError:
            park_phone = park['contacts']['phoneNumbers']
        park_desc = park["description"]
        
        if len(park_phone) > max_desc:
            max_desc = len(park_phone)
        
        all_park_info.update(
            {
                "name": park_name,
                "address": [park_address[0], park_address[1], park_address[2], park_address[3]],
                "state": park_state,
                "coord": park_coord,
                "phone": park_phone,
                "desc": park_desc,
            }
        )
        
        return(all_park_info)      
        #count += 1

get_parks()

