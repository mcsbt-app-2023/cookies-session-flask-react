from flask import Flask, request, session, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "this is a secret"


@app.route("/login", methods=["POST"])
def login():
    json = request.get_json()

    if "username" not in json or "password" not in json:
        return jsonify({"message": "ensure you pass username and password"}), 400
    elif json["username"] == "pepe" and json["password"] == "pepe":
        session["username"] = json["username"]
        return jsonify({"username": session["username"], "logged_in": True})
    else:
        return jsonify({"message": "incorrect credentials"}), 401


@app.route("/is_logged_in")
def is_logged_in():
    if "username" in session:
        username = session["username"]
        return jsonify({"username": username, "logged_in": True})
    else:
        return jsonify({"message": "not logged in, OR NO COOKIE BEING ATTACHED"}), 400


@app.route("/logout", methods=["POST"])
def logout():
    if "username" in session:
        session.pop("username")

    return jsonify({"message": "logged user out"}), 200


app.run(debug=True, port=8080)
