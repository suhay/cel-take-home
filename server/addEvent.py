from datetime import datetime, timedelta

from server.db import insert_db, query_db


def addEvent(name="", startTime="", duration=0, daysOfWeek=""):
    results = {}
    days = daysOfWeek.split(',')

    newEventStart = datetime.strptime(startTime, "%H:%M:%S")
    newEventEnd = newEventStart + timedelta(minutes=duration)

    for day in days:
      for event in getEventsOnDay(day)["events"]:
          if (event["startTime"] != None):
              eventStart = datetime.strptime(event["startTime"], "%H:%M:%S")
              eventEnd = eventStart + timedelta(minutes=event["duration"])

              if timesOverlap(eventStart, eventEnd, newEventStart, newEventEnd):
                results['error'] = "Event already exists for this time"
                return results

    insert_db('insert into events (name, startTime, duration, daysOfWeek) values (?, ?, ?, ?)', [name, startTime, duration, daysOfWeek])
    results['data'] = "Event added"
    return results

def timesOverlap(start1, end1, start2, end2):
    if start1 < start2:
      return end1 > start2
    else:
      return start1 < end2

def getEventsOnDay(day):
    data = {
        "events": []
    }

    for event in query_db('select * from events where daysOfWeek like ?', ['%'+day+'%']):
      data["events"].append({
        "id": event["id"],
        "name": event["name"],
        "startTime": event["startTime"],
        "duration": event["duration"],
        "daysOfWeek": event["daysOfWeek"]
      })

    return data