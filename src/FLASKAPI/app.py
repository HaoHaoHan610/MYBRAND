from flask import Flask, jsonify
from api.controllers.input import bp as bp_input
from api.controllers.output import bp as bp_output
def create_app():
    app = Flask(__name__)
    
    app.register_blueprint(bp_input)
    app.register_blueprint(bp_output)


    @app.route('/')
    def home():
        return '<h1>Khanh bu cu</h1>'
    return app
if __name__ == '__main__':
    app = create_app()
    app.run(debug= True,host='0.0.0.0',port=5000)

