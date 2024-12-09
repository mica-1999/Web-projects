document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('document', document.getElementById('document').files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            loadDocuments();
        } else {
            alert('Document upload failed');
        }
    });
});

function loadDocuments() {
    fetch('/documents')
    .then(response => response.json())
    .then(data => {
        const documentList = document.getElementById('documentList');
        documentList.innerHTML = '';
        data.documents.forEach(doc => {
            const div = document.createElement('div');
            div.className = 'document';
            div.innerHTML = `<p>${doc.name}</p><button onclick="signDocument('${doc.id}')">Sign</button>`;
            documentList.appendChild(div);
        });
    });
}

function signDocument(documentId) {
    fetch(`/sign/${documentId}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Document signed successfully');
            loadDocuments();
        } else {
            alert('Document signing failed');
        }
    });
}

loadDocuments();