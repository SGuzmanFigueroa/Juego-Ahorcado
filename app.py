from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# In-memory storage for scores
scores = []

@app.route("/", methods=["GET"])
def home():
    # Renderiza index.html desde la carpeta templates
    return render_template("index.html")

@app.route("/save_score", methods=["POST"])
def save_score():
    data = request.get_json()
    scores.append(data["score"])
    return jsonify({"message": "Puntuación guardada correctamente.", "scores": scores})

if __name__ == "__main__":
    app.run(debug=True)