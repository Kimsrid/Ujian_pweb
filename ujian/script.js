let pemesanan = [];

const fotoAlbums = {
    album1: 'chillkill.png',
    album2: 'Aespa_-_Drama.png',
    album3: 'istj.jpg',
    album4: 'smwinter.jpg',
    album5: 'hard.jpg',

};

function simpanData() {
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const telepon = document.getElementById('telepon').value;
    const album = document.getElementById('album').value;
    const jumlahPesanan = document.getElementById('jumlahPesanan').value;

    if (nama && alamat && telepon && album && jumlahPesanan) {
        const pemesananBaru = { nama, alamat, telepon, album, jumlahPesanan };
        pemesanan.push(pemesananBaru);

        tampilkanDataPemesanan();

        localStorage.setItem('pemesanan', JSON.stringify(pemesanan));

        document.getElementById('nama').value = '';
        document.getElementById('alamat').value = '';
        document.getElementById('telepon').value = '';
        document.getElementById('album').value = '';
        document.getElementById('jumlahPesanan').value = '';
        document.getElementById('fotoAlbum').src = '';
    } 
}

function tampilkanDataPemesanan() {
    const daftarPemesanan = document.getElementById('daftarPemesanan');
    daftarPemesanan.innerHTML = '';

    pemesanan.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nama}</td>
            <td>${item.alamat}</td>
            <td>${item.telepon}</td>
            <td>${item.album}</td>
            <td>${item.jumlahPesanan}</td>
            <td><img src="${fotoAlbums[item.album]}" alt="Foto Album" class="img-fluid" width="200" height="200"></td>
            <td>
                <button type="button" class="btn btn-warning btn-sm" onclick="editData(${index})">Edit</button>
                <button type="button" class="btn btn-danger btn-sm ml-2" onclick="hapusData(${index})">Hapus</button>
            </td>
        `;
        daftarPemesanan.appendChild(tr);
    });
}

function tampilkanFotoAlbum() {
    const albumSelect = document.getElementById('album');
    const selectedAlbum = albumSelect.value;
    const fotoAlbum = document.getElementById('fotoAlbum');

    if (fotoAlbums[selectedAlbum]) {
        fotoAlbum.src = fotoAlbums[selectedAlbum];
        fotoAlbum.style.display = 'block';
    } else {
        fotoAlbum.src = '';
        fotoAlbum.style.display = 'none';
    }
}

function editData(index) {
    const item = pemesanan[index];
    const namaInput = document.getElementById('nama');
    const alamatInput = document.getElementById('alamat');
    const teleponInput = document.getElementById('telepon');
    const albumSelect = document.getElementById('album');
    const jumlahPesananInput = document.getElementById('jumlahPesanan');
    const fotoAlbum = document.getElementById('fotoAlbum');

    namaInput.value = item.nama;
    alamatInput.value = item.alamat;
    teleponInput.value = item.telepon;
    albumSelect.value = item.album;
    jumlahPesananInput.value = item.jumlahPesanan;
    tampilkanFotoAlbum();

    pemesanan.splice(index, 1);

    tampilkanDataPemesanan();
}

function hapusData(index) {
    pemesanan.splice(index, 1);

    tampilkanDataPemesanan();

    localStorage.setItem('pemesanan', JSON.stringify(pemesanan));
}

document.addEventListener('DOMContentLoaded', () => {
    const storedData = localStorage.getItem('pemesanan');
    if (storedData) {
        pemesanan = JSON.parse(storedData);
        tampilkanDataPemesanan();
    }
});
