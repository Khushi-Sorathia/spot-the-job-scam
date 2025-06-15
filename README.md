# 🔍 Spot the Scam

An AI-powered scam detection web application that classifies whether a message or URL is potentially a scam. Designed to be intuitive, fast, and highly accurate — Spot the Scam enables users to identify threats in real-time through a clean and interactive interface.

🌐 Live Demo: [https://spot-the-scam.netlify.app](https://spot-the-scam.netlify.app)

---

## 📘 Project Overview

With the rapid rise of online phishing attacks, scams, and fraudulent content, users often find it difficult to differentiate between genuine and malicious communication. Spot the Scam was developed to address this challenge using Artificial Intelligence.

This project combines:

- A machine learning model trained on labeled scam data
- A responsive and secure web interface
- Real-time prediction through a hosted backend API

It serves as an accessible tool for individuals to stay safer online.

---

## ⚙️ Key Features & Technologies Used

✔️ Key Features:

- Accepts free-form text and URLs for scam analysis
- Returns a scam prediction with confidence score
- Highlights risky keywords using intuitive UI cues
- Fully responsive design for desktop and mobile use

🛠️ Technologies Used:

| Layer     | Technologies                            |
| --------- | --------------------------------------- |
| Frontend  | React, TypeScript, Tailwind CSS         |
| Backend   | Flask, Python                           |
| ML Model  | Scikit-learn (Logistic Regression)      |
| Data Prep | Pandas, Numpy, Regex, TF-IDF Vectorizer |
| Hosting   | Netlify (Frontend), Render (Backend)    |

---

## 🧠 Data Science Focus

### 📊 Data Preprocessing

- Lowercased all text and removed punctuation
- Filtered out stopwords and non-alphabetic characters
- Applied TF-IDF Vectorization to convert text into numerical features

### 🧠 Model Building

- Model: Logistic Regression (for speed, transparency, and performance)
- Trained on a labeled dataset of scam vs. non-scam messages
- Stratified train-test split to preserve class distribution

### 📈 Model Evaluation

- Precision: 91%
- Recall: 76%
- F1-Score: 0.84

The model performs with balanced accuracy and minimal false positives, making it highly effective for real-world use.

### Interpretation

- Probability scores indicate scam likelihood
- Keywords contributing to the prediction are visually emphasized
- False positive rate is minimized by optimizing threshold

### 📁 External Files

To keep the GitHub repository lightweight, all large files are hosted externally:

- 🔗 Model File (model_xgb.pkl)
- 📊 Processed Dataset (cleaned_train.csv)
- 📄 Training Logs and Notebooks

📁 Google Drive Link: [https://drive.google.com/file/d/1XSqmUCYdMo8NP8pjKiw6_vTIRmFCAqgQ/view?usp=sharing](https://drive.google.com/file/d/1XSqmUCYdMo8NP8pjKiw6_vTIRmFCAqgQ/view?usp=sharing)
(Access is set to “Anyone with the link can view”)

---

## 🚀 Setup Instructions

Follow these steps to run Spot the Scam locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Khushi-Sorathia/spot-the-job-scam.git
cd spot-the-scam
```

### 2️⃣ Setup the Frontend

```bash
cd src
npm install
npm run dev
```

Frontend will be available at: [http://localhost:5173/](http://localhost:5173/)

### 3️⃣ Setup the Backend

```bash
cd backend
pip install -r requirements.txt
python main.ipynb
```

Backend will run at: [http://localhost:5000/](http://localhost:5000/)

Ensure CORS is enabled to allow communication between frontend and backend.

---

## 📁 Folder Structure

```
spot-the-scam/
🔹 backend/                # Flask API for real-time inference
🔹 ├─ main.ipynb           # Main notebook
🔹 ├─ model_xgb.pkl        # Trained model
🔹 └─ r.txt                # Python dependencies
🔹 └─ train.csv
🔹 └─ test.csv
🔹 src/                   # React source files
🔹 ├─ components/         # Reusable UI components
🔹 └─ pages/              # Main pages like Home
🔹 public/                # Static assets
🔹 index.html
🔹 package.json            # Frontend dependencies
🔹 tailwind.config.js      # Styling config
```

---

## 👨‍💼 Contributors

- [Diya K Bhat](https://github.com/diyakbhat27)
- [Khushi S Sorathia](https://github.com/Khushi-Sorathia)

---


🔗 For more information or to try the app, visit:\
[https://spot-the-scam.netlify.app](https://spot-the-scam.netlify.app)

