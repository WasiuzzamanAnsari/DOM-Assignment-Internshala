document.addEventListener("DOMContentLoaded", function() {
    // Access student records from local storage

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentForm = document.getElementById('studentForm');
    const studentRecords = document.getElementById('studentRecords');
  
    // Record display function

    function displayStudents() {
        studentRecords.innerHTML = '';
        students.forEach((student, index) => {
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('record');
            studentDiv.innerHTML = `
                <span>${student.name}</span>
                <span>${student.studentID}</span>
                <span>${student.email}</span>
                <span>${student.contact}</span>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            `;
            studentRecords.appendChild(studentDiv);
        });
    }
  
    // add student function and Form Validation

    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();
  
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
  
        // form reset
        studentForm.reset();
  
        displayStudents();
    });
  
    // Function to edit a student record
    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;
  
        deleteStudent(index);
    };
  
    // Function to delete a record
    window.deleteStudent = function(index) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    };
  
    displayStudents();
  });