import React, { useState, useEffect } from 'react';
const StudentCard = ({ student }) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{student.Name}</h5>
                    <p className="card-text">Roll No.:<br /> {student.RollNo}</p>
                    <p className="card-text">Email ID: <br />{student.EmailID}</p>
                </div>
            </div>
        </div>
    );
};
const Students = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await
                    fetch('https://sindhuravuri666.github.io/StudentList/StudentList.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchStudents();
    }, []);
    const filteredData = students.filter(student =>
        student.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-md-4">
                    Search Student: &nbsp;
                    <input type="text" onChange={handleSearch} />
                </div>
            </div>
            <div className="row mt-3">
                {filteredData.map((student, index) => (
                    <StudentCard key={index} student={student} />
                ))}
            </div>
        </div>
    );
};
export default Students;