# CEL Take home
- Matt Suhay

This app was built using `Flask`, `python3.12`, `React 19`, and `bun 1.2.3`.

The app should be fully self contained and ready to go. All you'll need to do is have python3.10 or greater installed.

```
python3 -m venv .venv
. .venv/bin/activate
pip install Flask

flask run
```

## /client

To rebuild the client, you will need `bun 1.2.3` installed. To build, type the following:

```
cd client
bun install
bun run build
```

This will bundle the frontend into the `/static` directory at the root of the project.

## /static

These are generated files for the frontend for the Flask service to serve directly.

## database_default.db

This is a clean SQLLite db with the schema and two records applied to it. Feel free to rename this file if you'd like to start over.

## database.db

This is the current, active SQLLite file the app will use.

## schema.sql

This is the schema you can use to create a new db.