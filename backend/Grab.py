import json
import random
import requests
from flask import Flask, request
from flask_restful import Resource, reqparse, Api



app = Flask(__name__)
api = Api(app)

data = {}



class Locate(Resource):
    def constructURL(self, origin, destination):
        return "https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + origin + "&destinations=" + destination + "&key=INSERT_API_KEY_HERE"

    def post(self):
        r1 = requests.get('http://10.0.12.76:9004/farmer_details')
        js = r1.json()
        print(js)

        dictionary = {}

        for farmer in js:
            dictionary[farmer['address']] = farmer['username']

        origin = "Pewaukee,WI"
        destinations = []
        for addr in dictionary:
            destinations.append(addr)

        destinationsShortened = destinations.copy()
        destinationURL = destinationsShortened.pop(0)

        for destination in destinationsShortened:
            destinationURL = destinationURL + "|" + destination

        url = self.constructURL(origin, destinationURL)

        r = requests.get(url)
        j = r.json()

        travelTimes = []
        # print(len(destinations))
        for i in range(len(destinations)):
            travelTimes.append(j['rows'][0]['elements'][i]['duration']['value'])

        for i in range(len(destinations)):
            print(destinations[i] + ": " + str(travelTimes[i]))


        with open('food.txt') as json_file:
            data = json.load(json_file)


        def searchIngredient(ingredient):
                recipes = []
                for recipe in data:
                    ingredients = data[recipe][1]
                    for ing in ingredients:
                        if (ingredient in ing):
                            recipes.append(recipe)
                            break
                return recipes

        foods = ["rice", "potato", "chicken"]
        r2 = requests.get('http://10.0.12.76:9004/food_details')
        j2 = r2.json()
        print(j2[0]['food'])
        random.shuffle(foods)
        recipes = searchIngredient(foods[0])

        for recipe in recipes:
            print(recipe)
            print(data[recipe][1])

        collection = {}
        recipdict = {}
        # for farmer in js:
        #     collection[farmer['address']] = farmer['username']
        print(recipes)
        for recipe in recipes:
            print("ffd")
            print(recipe)
            print("dsf")
            recipdict[recipe] = data[recipe][1]

        totaldict = {}
        # totaldict['farmers'] = collection
        totaldict['recipes'] = recipdict
        print(totaldict)
        return json.dumps(recipdict)




api.add_resource(Locate, '/locate')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='7002')
