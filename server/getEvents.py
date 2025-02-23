
from flask import json
from server.db import query_db

def getEvents():
    data = {
        "events": []
    }

    for event in query_db('select * from events'):
      data["events"].append({
        "id": event["id"],
        "name": event["name"],
        "startTime": event["startTime"],
        "duration": event["duration"],
        "daysOfWeek": event["daysOfWeek"]
      })

    return data