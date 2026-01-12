from flask import Flask, jsonify
from flask_cors import CORS
from api.controllers.input import bp as bp_input
from api.controllers.output import bp as bp_output
def create_app():
    app = Flask(__name__)

    # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}})

    app.register_blueprint(bp_input)
    app.register_blueprint(bp_output)

    @app.route("/")
    def home():
        return "<h1>Khanh bu cu</h1>"

    return app


# Create the WSGI app at module import time so gunicorn finds `app`
app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
