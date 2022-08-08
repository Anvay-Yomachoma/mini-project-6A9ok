import React, { useEffect, useState } from 'react'
// import axios from '../axios';
// import Projects from './Projects'
import Row from './Row'

function Table(props) {
    let projects;
    const [allProjects, setAllProjects] = useState([]);
    const [displayProjects, setDisplayProjects] = useState([]);
    const [updateProject, setUpdateProject] = useState(false);
    const searchVal = props.searchVal;

    const fetchProjects = async () => {
        const response = await fetch("http:localhost:9000/all");
        console.log(response.data);
        return response.data;
    }
    useEffect(() => {
        const getProjects = async () => {
            projects = await fetchProjects();
            if (projects) setAllProjects(projects);
        }
        getProjects();
    }, []);

    useEffect(() => {
        const getProjects = async () => {
            projects = await fetchProjects();
            if (projects) setAllProjects(projects);
        }
        getProjects();
        return () => {
            setUpdateProject(false);
        }
    }, [updateProject]);

    useEffect(() => {
        projects = allProjects.filter((project) => {
            console.log(searchVal);
            console.log(project.membersDetails.usn);
            return (project.subject && project.subject.toLowerCase() == searchVal.toLowerCase()) || (project.membersDetails.usn && project.membersDetails.usn.toLowerCase() == searchVal.toLowerCase()) || (project.title && project.title.toLowerCase() == searchVal.toLowerCase());
        });
        setDisplayProjects(projects);

    }, [allProjects]);

    return (
        <div className="table">
            <div className="tableHead">
                <p>Name</p>
                <p>USN</p>
                <p>Subject</p>
                <p>Project Title</p>
                <p>Links</p>
                <p>Marks</p>
            </div>
            {displayProjects && displayProjects.length != 0 ? displayProjects.map((project) => {
                return <Row project={project}></Row>
            }) : <p>No projects found</p>}
        </div>
    )
}


export default Table