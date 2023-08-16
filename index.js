const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');
const progressBar = document.getElementById('progressBar');

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif','application/pdf'];
const maxFileSize = 300 * 1024 * 1024; // 300 MB in bytes

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];

  if (!selectedFile) {
    fileInfo.innerHTML = 'Ningún archivo seleccionado.';
    preview.style.display = 'none';
    progressBar.style.display = 'none';
    return;
  }

  if (!allowedTypes.includes(selectedFile.type)) {
    fileInfo.innerHTML = 'Tipo de archivo no admitido. Por favor, elige un archivo .jpg, .png o .gif.';
    preview.style.display = 'none';
    progressBar.style.display = 'none';
    return;
  }

  if (selectedFile.size > maxFileSize) {
    fileInfo.innerHTML = 'El tamaño del archivo excede el límite de 300 MB.';
    preview.style.display = 'none';
    progressBar.style.display = 'none';
    return;
  }

  fileInfo.innerHTML = `
    Nombre del archivo: ${selectedFile.name}<br>
    Tipo MIME: ${selectedFile.type}<br>
    Tamaño: ${selectedFile.size} bytes
  `;

  preview.style.display = 'block';
  progressBar.style.display = 'block';

  const formData = new FormData();
  formData.append('file', selectedFile);

  axios.post('http://localhost:3000/upload', formData, {
    onUploadProgress: function(progressEvent) {
      const progressPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      progressBar.value = progressPercentage;
    }
  })
  .then(response => {
    console.log('Archivo subido con éxito:', response.data);
    alert('Archivo subido con éxito', response.data);
  })
  .catch(error => {
    console.error('Error al subir el archivo:', error);
    alert('Error al subir el archivo');
  });
});
