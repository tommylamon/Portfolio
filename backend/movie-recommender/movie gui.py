from flask import Flask, request, render_template
import pandas as pd

app = Flask(__name__)
movies = pd.read_csv('movies.csv')

@app.route("/", methods=["GET", "POST"])
def home():
    recommendations = []
    if request.method == "POST":
        title = request.form.get("movie")
        recommendations = recommend(title).tolist()
    return render_template("movies.html", recommendations=recommendations)

if __name__ == "__main__":
    app.run(debug=True)