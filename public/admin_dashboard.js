document.addEventListener('DOMContentLoaded', function() {
    fetch('/get_attendance').then(response => response.json()).then(data => {
        const tableBody = document.querySelector('#employeeTable tbody');
        data.forEach(record => {
            const row = document.createElement('tr');
            Object.values(record).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    }).catch(error => {
        console.error('Error:', error);
    });
});
