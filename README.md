# FraudDetection
Merupakan project Neural Network untuk fraud detection pada kartu kredit.

![](img/card.png)

### Project ini terdiri dari :
- 4 file .ipynb
- 2 dataset
- file model
- file scaler

### File IPYNB :
Merupakan file dari jupyter notebook untuk membangun project Fraud Detection. Berikut penjelasan tiap file:
- `ANN Fraud Detection`. Merupakan file untuk membuat model neural network
- `Manual Tuning ANN Fraud Detection`. Merupakan file untuk mencari konfigurasi terbaik. Mulai dari jumlah hidden layer, jumlah neuron, batch size, learning rate, dan konfigurasi neural network
- `Best Model Selection`. Merupakan file untuk mencari model yang terbaik dengan menguji sebanyak 200 kali iterasi.
- `Testing Model ANN Fraud Detection`. Merupakan file untuk prediksi fraud detection menggunakan model yang sudah dipilih sebelumnya.

### Dataset :
Terdiri dari 2 dataset berbentuk .csv yang merupakan data transaksi salah satu Bank di Indonesia. Dataset ini digunakan pada kompetensi FinHack 2018. Dapat ditemukan di [Github]( https://github.com/rezafaisal/FinHack2018)
- `fraud_data.csv` berisi data yang akan digunakan untuk proses pelatihan (training). Berisi 13.124 data dengan 27 atribut fitur dan 1 atribut kelas.
- `fraud_test.csv` berisi data yang akan digunakan untuk proses uji (testing).

### Model :
File `model.h5` merupakan model hasil dari pelatihan neural network yang didump menggunakan library joblib. Model ini yang selanjutnya digunakan untuk proses testing.

Performa model (`performance.txt`) diuji sebanyak 350 kali iterasi:
- Accuracy	: 97.05 %
- Precision	: 99.41 %
- Recall	: 94.79 %
- Specificity	: 99.41 %
- F1 Score	: 97.04 %
- Error Rate	:  2.95 %
- AUC		: 98.92 %

### Scaler :
File `scaler.bin` merupakan file StandardScaler() yang digunakan untuk normalisasi pada saat training. File ini diperlukan untuk menormalisasi data testing karena data testing yang tidak dinormalkan sesuai pada saat training, menyebabkan data tidak bisa terprediksi dengan benar.

### Scaler :
Folder `SmartFraudFlask` berisi file website `Smart Fraud Detection` yang digunakan untuk deteksi fraud berbasis website. Aplikasi ini dibangun menggunakan framework Flask.

### Best Regards :
18.11.2269 Adi Zaenul Mustaqim
S1 Informatika Universitas AMIKOM Yogyakarta angkatan 2018
