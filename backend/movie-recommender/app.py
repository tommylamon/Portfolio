import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from flask import Flask, render_template, request

app = Flask(__name__)

# Load movie data
movies = pd.read_csv("movies.csv")

# Setup recommender
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(movies["description"])
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
indices = pd.Series(movies.index, index=movies["title"]).drop_duplicates()

def recommend(title, cosine_sim=cosine_sim):
    """Return top 4 similar movies as a Python list."""
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:5]
    movie_indices = [i[0] for i in sim_scores]
    return movies["title"].iloc[movie_indices].tolist()  # <- FIX: return list

@app.route("/")
def home():
    return render_template("movies.html")

@app.route("/search", methods=["POST"])
def search():
    movie_title = request.form.get("movie")
    if movie_title not in indices:
        return render_template("movies.html", error="Movie not found")
    
    recommendations = recommend(movie_title)  # already a list now
    return render_template("movies.html", recommendations=recommendations, query=movie_title)

if __name__ == "__main__":
    app.run(debug=True)