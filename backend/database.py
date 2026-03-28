from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["ai_meeting_app"]

users_collection = db["users"]
results_collection = db["results"]