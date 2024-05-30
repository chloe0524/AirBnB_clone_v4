#!/usr/bin/python3
"""
Module: 4-hbnb.py
Author: TheWatcher01
Date: 30-05-2024
Description: This module runs a Flask web application that serves a dynamic
web page related to the HBNB project. It retrieves data from a storage engine,
sorts it, and passes it to a template.
"""

import uuid
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from flask import Flask, render_template

app = Flask(__name__)


@app.teardown_appcontext
def close_db(error) -> None:
    """
    At the end of each web request, it removes the current SQLAlchemy Session.
    """
    storage.close()  # Close the database session


@app.route('/4-hbnb/', strict_slashes=False)
def hbnb() -> str:
    """
    Route that serves a dynamic web page. It retrieves data from the storage
    engine, sorts it, and passes it to a template.
    """
    # Retrieve and sort states
    states = sorted(storage.all(State).values(), key=lambda k: k.name)
    # For each state, retrieve and sort its cities
    st_ct = [[state, sorted(state.cities, key=lambda k: k.name)]
             for state in states]

    # Retrieve and sort amenities
    amenities = sorted(storage.all(Amenity).values(), key=lambda k: k.name)

    # Retrieve and sort places
    places = sorted(storage.all(Place).values(), key=lambda k: k.name)

    # Generate a unique ID for cache busting
    cache_id = uuid.uuid4()

    # Render the template with the sorted data and cache ID
    return render_template('3-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)  # Run the app
