# 🎬 **Movie Recommendation System** 🍿✨

This repository features a **content-based movie recommendation system** built using **FastAPI** for the backend and a modern **React.js frontend**. The model uses movie metadata and NLP techniques to suggest similar movies based on a given input.

---

## 🛠 **Tools & Technologies**

This project is built with:

- **Python** – Core language for data processing & backend  
- **Pandas & NumPy** – Data manipulation  
- **Scikit-learn** – Feature vectorization  
- **FastAPI** – High-performance Python backend  
- **React.js** – Dynamic frontend framework  
- **Pickle** – Model and data serialization  
- **Render** – Deployment platform

---

## 🎥 **Dataset & Features**

Two public movie datasets were merged and cleaned to form a consolidated database. From this, the following features were extracted:

- `movie_id`  
- `title`  
- `genres`  
- `keywords`  
- `overview`

These features were merged into a single `tags` column to generate textual data for similarity analysis.

---

## ⚙️ **Project Workflow**

The project follows these key steps:

1️⃣ **Data Merging** – Combine two datasets for a complete metadata view  
2️⃣ **Feature Selection** – Use only relevant columns (e.g., genres, keywords, overview)  
3️⃣ **Text Preprocessing** – Normalize, clean, and prepare text features  
4️⃣ **Feature Engineering** – Create a unified `tags` column combining all text-based features  
5️⃣ **Vectorization** – Convert text to numerical format using **CountVectorizer**  
6️⃣ **Similarity Matrix** – Use **cosine similarity** to compute movie similarity scores  
7️⃣ **Recommendation Function** – Return top similar movies based on user input  
8️⃣ **Model Persistence** – Store precomputed similarity matrix and movie data using Pickle  
9️⃣ **FastAPI Backend** – Build RESTful API to serve recommendations  
🔟 **React Frontend** – Interactive UI for movie search and suggestions  

---

## 🚀 **How to Run the Project Locally**

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd movie-recommendation-system
```

### Step 2: Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Step 3: Frontend Setup (React)
```bash
cd ../cancer-predictor  # Your frontend folder (reuse or rename accordingly)
npm install
npm run dev
```

---

## 🌐 **Deployment**

The project is deployed using **Render**:
- **FastAPI backend** is hosted as a web service
- **React frontend** is deployed as a static site

---

## 🎯 **Key Features**

✔ Personalized movie recommendations  
✔ Content-based filtering using NLP  
✔ Modern frontend UI built with React  
✔ Fast and lightweight FastAPI backend  
✔ Fully deployed using Render

---

## 📂 **Sample Git Commands**

```bash
git add .
git commit -m "Initial commit with movie recommendation engine"
git push origin main
```

---

## 📄 **License**

This project is licensed under the **MIT License**.
