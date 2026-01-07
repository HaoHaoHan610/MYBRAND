from flask import Flask, jsonify


def create_app():
    app = Flask(__name__)
    
    @app.route('/')
    def home():
        return '<h1>Khanh bu cu</h1>'
    return app
if __name__ == '__main__':
    app = create_app()
    app.run(debug= True,host='0.0.0.0',port=5000)

