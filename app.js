const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

fileInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];

    fileInfo.innerHTML = `
    <b>Nombre del archivo:</b> ${selectedFile.name}<br>
    <b>Tipo MIME:</b> ${selectedFile.type}<br>
    <b>Tamaño:</b> ${selectedFile.size} bytes
  `;

    if (isValidFileType(selectedFile.type) && selectedFile.size <= MAX_FILE_SIZE) {
        preview.style.display = 'block';
        preview.style.width = '300px';
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
    } else {
        preview.style.display = 'none';
        alert('El archivo no es válido');
    }
});

function isValidFileType(fileType) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    return allowedTypes.includes(fileType);
}

function formatFileSize(size) {
    if (size === 0) return '0 bytes';
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(size) / Math.log(1024)));
    return Math.round(size / Math.pow(1024, i), 2) + ' ' + units[i];
}