$(document).ready(function() {

    checkScreen();

    var pattern = /^[-+]?[0-9]+\.?[0-9]*$/; // mengatur agar input form hanya bisa diisi angka dan spesial karakter
    var step = 0.00001; // mengatur bilangan desimal yang bisa diinput pada input form

    $('input').attr('pattern', pattern);
    $('input').attr('step', step);
    $('input').attr('required', true); // mengatur agar tiap isian form harus diisi (required)
    $('input').attr('autocomplete', 'off'); // mengatur agar history isian form tidak muncul (mematikan fitur autocomplete)

    $('#form-data').on('submit', function(event) {
        event.preventDefault(); // mencegah halaman reload ketika suubmit form

        var listData = [];
        var listColumns = []
        var data = 0;

        listColumns = [
            'X', 'id_tanggal_transaksi_awal', 'tanggal_transaksi_awal', 'tipe_kartu', 'id_merchant', 'nama_merchant', 'tipe_mesin',
            'tipe_transaksi', 'nama_transaksi', 'nilai_transaksi', 'id_negara', 'nama_negara', 'nama_kota', 'lokasi_mesin',
            'pemilik_mesin', 'waktu_transaksi', 'kuartal_transaksi', 'kepemilikan_kartu', 'nama_channel', 'id_channel',
            'rata_rata_nilai_transaksi', 'maksimum_nilai_transaksi', 'minimum_nilai_transaksi', 'rata_rata_jumlah_transaksi'
        ];

        // perulangan untuk get data dari input form lalu dikonversi ke tipe data float untuk dimasukan ke dalam listData
        for (var i = 0; i < listColumns.length; i++) {
            data = $('#' + listColumns[i]).val();
            listData.push(parseFloat(data));
        }

        // AJAX untuk kirim data dan menerima data kembalian dari app.py
        $.ajax({
                url: 'getResult',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(listData),
                contentType: "application/json; charset=UTF-8"
            })
            .done(function(data) {
                if (data == 0) {
                    $('.text-hasil').text("TRANSAKSI NORMAL");
                    $('.alert-hasil').removeClass('alert-danger');
                    $('.alert-hasil').addClass('alert-success');
                } else {
                    $('.text-hasil').text("TRANSAKSI FRAUD");
                    $('.alert-hasil').removeClass('alert-success');
                    $('.alert-hasil').addClass('alert-danger');
                }
            })
            .fail(function(err) {
                $('.text-hasil').text("ERROR");
                $('.alert-hasil').removeClass('alert-success');
                $('.alert-hasil').addClass('alert-danger');
                console.log("gagal")
            })

        $('.btn-refill').css('display', 'inline-block'); // menampilkan tombol btn-refill (cek ulang)
    });

    $('.btn-refill').on('click', function() {
        reset(); // memanggil fungsi reset() ketika tombol cek ulang diklik
    });

    $(window).on('resize', checkScreen);
});

// fungsi untuk membersihkan form dan mengembalikan ke tampilan awal
function reset() {
    $('.text-hasil').text("-");
    $('.btn-refill').css('display', 'none');
    $('.alert-hasil').removeClass('alert-danger');
    $('.alert-hasil').addClass('alert-success');
    $('input').val(null);
    $('#X').focus();
}

// fungsi untuk cek lebar layar untuk mengatur jarak antar baris di form isian
function checkScreen() {
    if ($(window).width() <= 767) {
        $("div.row").removeClass('my-3');
    } else {
        $("div.row").addClass('my-3');
    }
}