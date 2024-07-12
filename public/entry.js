document.getElementById('entryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const employeeData = {
        employee_id: document.getElementById('employee_id').value,
        date_of_birth: document.getElementById('date_of_birth').value,
        department: document.getElementById('department').value,
        in_time: document.getElementById('in_time').value,
        out_time: document.getElementById('out_time').value,
        miss_time: document.getElementById('miss_time').value,
        late_entry: document.getElementById('late_entry').checked
    };

    fetch('/submit_entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
    }).then(response => response.json()).then(data => {
        if (data.success) {
            alert('Entry submitted successfully');
        } else {
            alert('Error submitting entry');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});
