var allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');
var message = document.getElementById('message');
var form = document.getElementById('uploadForm');
form.addEventListener('submit', validateForm);

function validateForm(event) {
    event.preventDefault();
    var fileUpload = document.getElementById('file-upload').files[0];
    if (allowedFileTypes.indexOf(fileUpload.type) > -1) {
        var formData = new FormData();
        formData.append('file', fileUpload);

        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener('progress', progressHandler, false);
        ajax.addEventListener('load', completeHandler, false);
        ajax.addEventListener('error', errorHandler, false);
        ajax.addEventListener('abort', abortHandler, false);

        ajax.open('POST', 'http://localhost:3000/upload');
        ajax.send(formData);
        return true;
    } else {
        var errors = document.getElementById('errors');
        errors.classList.toggle('d-none');
        errors.innerHTML = 'Images only.';
        return false;
    }
}

function progressHandler(event) {
    var percent = (event.loaded / event.total) * 100;
    progressBar.style.width = Math.round(percent) + '%';
    document.getElementById('status').innerHTML = Math.round(percent) + '% uploaded';
}

function completeHandler(event) {
    if (event.target.responseText === 'done') {
        window.location.assign('http://localhost:3000/dashboard');
    }
    document.getElementById('progress-bar').style.width = 0;
}

function errorHandler(event) {
    document.getElementById('status').innerHTML = 'Upload Failed';
}

function abortHandler(event) {
    document.getElementById('status').innerHTML = 'Upload Aborted';
}