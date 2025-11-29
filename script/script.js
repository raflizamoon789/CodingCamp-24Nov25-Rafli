function tambah () {
    let gas = document.getElementById('todo').value;
    let te = document.getElementById('tanggal').value;


    document.getElementById('output').innerHTML = `${gas}${te}`
}