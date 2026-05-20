# 🦴 Knee OA Severity Analysis — ROI Extraction Framework

> A Lightweight, Transparent and Risk-Aware ROI Extraction Framework for Responsible Knee X-Ray Analysis

[![Python](https://img.shields.io/badge/Python-3.10-blue.svg)](https://www.python.org/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.12-orange.svg)](https://www.tensorflow.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-App-red.svg)](https://streamlit.io/)
[![Institution](https://img.shields.io/badge/MIT--AOE-Pune-green.svg)](https://www.mitaoe.ac.in/)

---

## 👥 Authors

**Arnav Shende · Aryan Medigeri · Sakshi Sharan**  

---

## 📄 About

This is the project implementation accompanying our research paper on deterministic ROI extraction for knee X-ray analysis. The system combines a classical image processing pipeline for Region of Interest (ROI) extraction with a deep learning model for osteoarthritis severity classification.

The framework is designed to be:
- **Lightweight** — runs on standard CPU hardware, no GPU required
- **Transparent** — fully deterministic, no black-box preprocessing
- **Risk-aware** — systematic failure detection with safety flags for clinical use

---

## 🔬 Research Highlights

| Metric | Value |
|---|---|
| Mean Intersection over Union (IoU) | 0.92 |
| Mean Dice Similarity Coefficient | 0.94 |
| Average ROI Area Reduction | 26.04% |
| Average Processing Time | 4.49 ms/image |

---

## 🧠 How It Works

### Step 1 — Deterministic ROI Extraction Pipeline
The system extracts the knee joint region using only classical image processing — **no training data required**:

1. **Intensity Normalization** — per-image mean/std normalization
2. **Otsu's Thresholding** — adaptive foreground segmentation
3. **Morphological Closing** — spatial refinement, artifact removal
4. **Connected Component Analysis** — largest component = knee joint
5. **Bounding Box Crop** — tight ROI extraction

### Step 2 — OA Severity Classification
The extracted ROI is passed into an **Xception CNN** fine-tuned on the Kellgren-Lawrence grading system:

| Grade | Severity |
|---|---|
| Grade 0 | Healthy — no signs of OA |
| Grade 1 | Doubtful — possible joint space narrowing |
| Grade 2 | Minimal — small osteophytes present |
| Grade 3 | Moderate — moderate joint space narrowing |
| Grade 4 | Severe — severe joint space loss |

### Step 3 — Grad-CAM Explainability
Gradient-weighted Class Activation Mapping highlights the anatomical regions that most influenced the classification decision.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10
- pip

### Installation

```bash
# Clone the repository
git clone https://github.com/Arnav-Shende007/Knee-Roi.git
cd Knee-Roi

# Install dependencies
pip install tensorflow==2.12.0
pip install streamlit opencv-python matplotlib pillow numpy
```

### Download the Model

Download the pre-trained Xception model from [Google Drive](https://drive.google.com/file/d/1HnM0EU6zPtJyV8sVtCflVo-qssLPbusm/view?usp=sharing) and place it at:

```
src/models/model_Xception_ft.hdf5
```

### Run the App

```bash
streamlit run app/app.py
```

Navigate to `http://localhost:8501` in your browser.

---

## 🖼️ Project Structure

```
.
├── app/
│   ├── app.py              # Main Streamlit application
│   └── img/                # App assets
├── src/
│   ├── models/             # Pre-trained model (download separately)
│   └── *.ipynb             # Training notebooks
├── assets/                 # Documentation assets
├── environment.yml         # Conda environment
└── README.md
```

---

## 📊 Dataset

The framework was evaluated on 1,650 knee X-ray images labeled using the **Kellgren-Lawrence grading system**, sourced from the [Knee Osteoarthritis Dataset with Severity Grading](https://www.kaggle.com/datasets/shashwatwork/knee-osteoarthritis-dataset-with-severity) on Kaggle.

---

## 📚 Citation

If you use this work, please cite our paper:

```
Shende, A., Medigeri, A., Sharan, S., Kale, L., & Bansode, S.
A Lightweight, Transparent and Risk-Aware ROI Extraction Framework 
for Responsible Knee X-Ray Analysis.
MIT Academy of Engineering, Pune, 2025.
```

---

## ⚠️ Disclaimer

This tool is intended for research and educational purposes only. It is not a certified medical device and should not be used as a substitute for professional medical diagnosis.