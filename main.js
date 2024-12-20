// Local Storage
document.addEventListener("DOMContentLoaded", function () {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.querySelector('#studentTable tbody');

    // Display Records Function
    function displayStudents() {
        studentTableBody.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentID}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    //   Submit Button
    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        // Form validation
        if (!name || !studentID || !email || !contact) {
            alert("All fields must be filled!");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert("Student Name should only contain letters.");
            return;
        }

        if (!/^\d+$/.test(studentID)) {
            alert("Student ID should only contain numbers.");
            return;
        }

        if (!/^\d{10}$/.test(contact)) {
            alert("Contact No. should be a valid 10-digit number.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert("Invalid email address.");
            return;
        }

        students.push({ name, studentID, email, contact });
        localStorage.setItem('students', JSON.stringify(students));
        studentForm.reset();
        displayStudents();
    });

    //    Edit Records
    window.editStudent = function (index) {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        // Delete Student Record
        deleteStudent(index);
    };
    
    // Delete Function
    window.deleteStudent = function (index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };

    displayStudents();
});