import pandas as pd
from joblib import load
from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model

app = Flask(__name__, template_folder='template')
model = load_model('model.h5')

# route untuk menampilkan halaman awal (index.html)
@app.route('/')
def home():
    return render_template('index.html')

# route untuk melakukan klasifikasi data transaksi
# menerima data dari AJAX jQuery -> melakukan klasifikasi -> mengembalikan hasil klasifikasi ke AJAX
@app.route('/getResult', methods=['POST'])
def getResult():

    if (request.method == 'POST'):
        # daftar kolom yang ada pada dataset
        listColumns = [
            'X', 'id_tanggal_transaksi_awal',  'tanggal_transaksi_awal', 'tipe_kartu', 'id_merchant', 'nama_merchant', 'tipe_mesin',
            'tipe_transaksi', 'nama_transaksi', 'nilai_transaksi', 'id_negara', 'nama_negara', 'nama_kota', 'lokasi_mesin',
            'pemilik_mesin', 'waktu_transaksi', 'kuartal_transaksi', 'kepemilikan_kartu', 'nama_channel', 'id_channel',
            'rata_rata_nilai_transaksi', 'maksimum_nilai_transaksi', 'minimum_nilai_transaksi', 'rata_rata_jumlah_transaksi'
        ]

        listData = []
        formData = []

        # input data
        for x in range(24):
            data = request.json[x]
            formData.append(float(data))

        # append data
        listData.append(formData)

        # load the scaler
        scaler = load('scaler.bin')
        listData = pd.DataFrame(scaler.transform(listData), columns=listColumns)

        # predict
        hasilPrediksi = model.predict(listData)
        hasilPrediksi = round(hasilPrediksi[0][0])

        return jsonify(hasilPrediksi)

if (__name__ == '__main__'):
    app.run(debug=True)