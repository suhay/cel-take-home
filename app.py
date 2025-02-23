from flask import Flask, g, json, request, send_from_directory

from server.addEvent import addEvent
from server.db import get_db
from server.getEvents import getEvents

app = Flask(__name__)

@app.route("/")
def root():
    return send_from_directory("static", "index.html")

@app.route("/api")
def api():
    return "Hello!"

@app.route("/api/getEvents")
def get_events():
    return json.dumps(getEvents())

@app.route("/api/addEvent", methods=["POST"])
def add_event():
    body = request.get_json()
    return json.dumps(addEvent(body['name'], body['startTime'], int(body['duration']), body['daysOfWeek']))

@app.route("/api/deleteEvent", methods=["POST"])
def delete_event():
    return "deleteEvent"

# @app.route("/api/init")
# def init():
#     init_db()
#     return "init"

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()
