import React, { useEffect, useState } from "react";
// import axios from '../axios';

function Row(props) {
    const project = props.project;
    const [marks,setMarks] = useState(project.marks) ;
    const id = project.id;

    useEffect(() => {
        update(marks) ;
    },[marks]);
    const update = async (marks) => {
        const updatedProject = { ...project, marks: marks };
        const response = await fetch("http:localhost:9000",
        {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProject)
        });
        console.log(response.json().data);
    }

    const handleMarks = (e) => {
        if(project.assignedFaculty!="admin"){
            alert("You are not the Assigned Faculty");
            return ;
        } 

        let marksPara = e.target.previousSibling;
        marksPara.innerHTML = `<textarea cols="5">${marksPara.innerText}</textarea>`;

        let textarea = document.querySelector("textarea");
        textarea.addEventListener("blur", function () {
            marksPara.innerHTML = textarea.value;
            // update(textarea.value);
            setMarks(textarea.value) ;
        });
    }
    return (
        <div className="row">
            <p>{project.membersDetails.name}</p>
            <p>{project.membersDetails.usn}</p>
            <p>{project.subject}</p>
            <p>{project.title}</p>
            <p>
                <button className="linkBtns" style={{ backgroundColor: "#0189CB" }}>
                    <a href={project.projLink}>Source Code</a>
                </button>
                <button className="linkBtns" style={{ backgroundColor: "#E75059" }}>
                    <a href={project.report}>Project Report</a>
                </button>
            </p>
            <p className="marksTab">
                <p className="marks">
                    {marks}
                </p>
                <button className="editMarksBtn" onClick={handleMarks}>Assign</button>
            </p>
        </div >
    )
}

export default Row