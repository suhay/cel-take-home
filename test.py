from datetime import datetime, timedelta


def addEvent(name="", startTime="", duration=0, daysOfWeek=""):
    results = {}
    days = daysOfWeek.split()

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
    
    #query_db('insert into events (name, startTime, duration, daysOfWeek) values (?, ?, ?, ?)', [name, startTime, duration, daysOfWeek])
    results['data'] = "Event added"
    return results

def timesOverlap(start1, end1, start2, end2):
    if start1 < start2:
      return end1 > start2
    else:
      return start1 < end2

def getEventsOnDay(day):
    data = {
        "events": [
          {"id": 1, "name": "event1", "startTime": "12:00:00", "duration": 60, "daysOfWeek": "Mo"},
          {"id": 2, "name": "event2", "startTime": "13:00:00", "duration": 60, "daysOfWeek": "Tu,Th"}
        ]
    }

    rtnData = {
      "events": []
    }

    for event in data['events']:
      if day in event['daysOfWeek']:
          rtnData["events"].append({
            "id": event["id"],
            "name": event["name"],
            "startTime": event["startTime"],
            "duration": event["duration"],
            "daysOfWeek": event["daysOfWeek"]
          })

    return rtnData


print(addEvent("Test", "12:00:00", 60, "Mo")) # Expected: "Event failed to add"
print(addEvent("Test", "12:30:00", 60, "Mo")) # Expected: "Event failed to add"
print(addEvent("Test", "12:00:00", 60, "Tu")) # Expected: "Event added"
print(addEvent("Test", "12:00:00", 60, "We,Fr")) # Expected: "Event added"
print(addEvent("Test", "12:30:00", 60, "Tu")) # Expected: "Event failed to add"
print(addEvent("Test", "12:00:00", 60, "Th")) # Expected: "Event added"