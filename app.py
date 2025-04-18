from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import pandas as pd
import requests
import uvicorn  # <-- Required for running

app = FastAPI()

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

movie_dict = pickle.load(open("movie_dict.pkl", "rb"))
similar = pickle.load(open("similar.pkl", "rb"))
movie = pd.DataFrame(movie_dict)


def fetch_poster(movie_id):
    response = requests.get(
        f"http://api.themoviedb.org/3/movie/{movie_id}?api_key=8265bd1679663a7ea12ac168da84d2e8&language=en-US"
    )
    data = response.json()
    return "https://image.tmdb.org/t/p/w185" + data["poster_path"]


def recommend(movie_t):
    movie_index = movie[movie["title"] == movie_t].index[0]
    distance = similar[movie_index]
    movie_store = sorted(list(enumerate(distance)), reverse=True, key=lambda x: x[1])[1:6]

    recommended_movie = []
    recommended_poster = []

    for i in movie_store:
        movie_id = movie.iloc[i[0]].movie_id
        recommended_movie.append(movie.iloc[i[0]].title)
        recommended_poster.append(fetch_poster(movie_id))

    return recommended_movie, recommended_poster


@app.get("/movies")
def get_movies():
    return movie["title"].tolist()


@app.get("/recommend")
def get_recommendations(movie_title: str):
    names, posters = recommend(movie_title)
    return {"titles": names, "posters": posters}


# 👇 ADD THIS TO RUN LOCALLY AND ON RENDER
if __name__ == "__main__":
    import os
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=False)