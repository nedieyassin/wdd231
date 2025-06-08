const params = new URLSearchParams(window.location.search);

document.getElementById('display-fname').textContent = params.get('fname') || 'N/A';
document.getElementById('display-lname').textContent = params.get('lname') || 'N/A';
document.getElementById('display-email').textContent = params.get('email') || 'N/A';
document.getElementById('display-phone').textContent = params.get('phone') || 'N/A';
document.getElementById('display-bizName').textContent = params.get('bizName') || 'N/A';

const timestamp = params.get('timestamp');
if (timestamp) {
    const date = new Date(timestamp);
    document.getElementById('display-timestamp').textContent = date.toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
} else {
    document.getElementById('display-timestamp').textContent = 'N/A';
}
