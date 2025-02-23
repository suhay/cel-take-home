# CEL Take home
Matt Suhay

This app was built using `Flask`, `python3.12`, `React 19`, and `bun 1.2.3`.

The app should be fully self contained and ready to go. All you'll need to do is have python 3.10 or greater installed with Flask.

```
python3 -m venv .venv
. .venv/bin/activate
pip install Flask

flask run
```

Then, from a browser, open `http://127.0.0.1:5000`

### Assumptions

- One event can stop at the same time as one starts, much like calender events can butt up against each other
- Events will not run over midnight into the next day
- The same event will not run twice on the same day
- Events, currently, cannot be removed or edited, but can be in later iterations
- If an event runs on multiple days, and at least one of those days has a conflict, the event is invalid 


## The following info is for further clarification, the frontend is already bundled and does not need to be again

### /client

To rebuild the client, you will need `bun 1.2.3` installed. To build, type the following:

```
cd client
bun install
bun run build
```

This will bundle the frontend into the `/static` directory at the root of the project.

### /static

These are generated files for the frontend for the Flask service to serve directly.

### database_default.db

This is a clean SQLLite db with the schema and two records applied to it. Feel free to rename this file if you'd like to start over.

### database.db

This is the current, active SQLLite file the app will use.

### schema.sql

This is the schema you can use to create a new db.