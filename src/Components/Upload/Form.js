import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import MemberRow from './MemberRow';
// import axios from '../axios';

function Form() {
    const initialState = { semester: 1, subject: "", title: "", assignedFaculty: "", projLink: "", report: "", teamId: "", marks: NaN };

    const [details, setDetails] = useState(initialState);

    const [members, setMembers] = useState([{ name: "", usn: "" }]);

    const [noMembers, setNoMembers] = useState(1);

    const [formErrors, setFormErrors] = useState({ name: [], usn: [] });

    const [teamId, setTeamId] = useState(null);

    const [modalShow, setModalShow] = useState(false);

    let memberArr = [];

    let names;
    let usns;

    const handleMembers = () => {
        names = Array.from(document.querySelectorAll(".name")).map((input) => {
            return input.value;
        });

        usns = Array.from(document.querySelectorAll(".usn")).map((input) => {
            return input.value;
        });

        setFormErrors(validate(usns));

        if (formErrors.usn.length != 0) {
            return 0;
        }
        else if (formErrors.usn.length == 0) {
            for (let i = 0; i < noMembers; i++) {
                memberArr[i] = { name: names[i], usn: usns[i] };
            }
            setMembers(memberArr);
            setDetails({ ...details, membersDetails: members });
        }
    }

    const validate = (usns) => {
        const errors = { usn: [] };
        const regex = /1[dD][sS]\d\d[cC][sS]\d\d\d/i;
        usns.forEach((element, index) => {
            if (!regex.test(element))
                errors.usn[index] = "Enter a valid USN";
        });
        return errors;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    }

    const handleNoMembers = (value) => {
        for (let i = 0; i < value; i++) {
            memberArr.push({ name: "", usn: "" });
        }
        setMembers(memberArr);
        setNoMembers(value);
    };

    const uploadTeamId = async (USN, subjectCode) => {
        const response = await fetch("http://localhost:9000/TeamId",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ USN, subjectCode })
            });
        console.log(response.json().data);
    }
    const fetchTeamId = async () => {
        const response = await fetch("http://localhost:9000/TeamId");
        console.log(response.json().data);
        return response.json().data;
    }

    const handleTeamId = (e) => {
        e.preventDefault();
        handleMembers();
        if (formErrors.usn.length == 0) {
            let select = document.getElementsByClassName('subjectname');
            let subCode = select.options[select.selectedIndex].value;
            uploadTeamId(usns[0], subCode);

            let teamid = fetchTeamId();
            setTeamId(teamid);
        }
    }

    const upload = async (project) => {
        // const response = await fetch("http://localhost:6000/upload") ;
        fetch("http://localhost:9000/upload").then(response => {
            return response.json().data.floc;
        }).then(floc => {
            return { ...project, report: floc };
        }).then(project => {

            return fetch("http://localhost:9000/form", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project)
            })
        })
            .then(data => {
                if (!data.ok) {
                    throw Error(data.status);
                }
                return data.json();
        })
            .catch(e => {
                console.log(e);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMembers({ ...members, teamId: teamId });

        members.forEach((member, index) => {
            const project = {
                ...details,
                membersDetails: { name: member.name, usn: member.usn },
            };
            upload(project);
        })
        Array.from(document.querySelectorAll("input")).map((input) => {
            input.value = "";
        });
        setDetails(initialState);
        setMembers([{ name: "", usn: "" }]);
        setTeamId(null);
        showModal();
    }

    const showModal = () => {
        setModalShow(true);
    };

    const hideModal = () => {
        setModalShow(false);
        return true;
    };

    return (
        <React.Fragment>
            <form className="form" onSubmit={handleTeamId}>

                <div className="noMembers">
                    <label>No. of Members :</label>
                    <select name="noMembers" onChange={(e) => { handleNoMembers(e.target.value) }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                {members.map((curItem, index) => {
                    return (
                        <React.Fragment>
                            <MemberRow key={index} i={index} obj={curItem}></MemberRow>
                            {Object.keys(formErrors).length !== 0 &&
                                <div className="errors">
                                    <span>{formErrors.usn[index]}</span>
                                </div>
                            }
                        </React.Fragment>
                    )
                })}

                <div className="noMembers semester">
                    <label>Semester :</label>
                    <select name="semester" onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>

                <div>
                    <label>Subject Name :</label>
                    <select
                        type="text"
                        name="subject"
                        className="subjectname"
                        defaultValue=""
                        placeholder="eg.Computer Networks"
                        value={details.subject}
                        required
                        onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        <option value="CNL">Computer Networks</option>
                        <option value="DMS">Database Management System</option>
                        <option value="OPJ">Object Oriented Programming with Java</option>
                        <option value="SSL">System Software</option>
                    </select>
                </div>

                <div>
                    {/* <label>Subject Code :</label>
                <input type="text" placeHolder={"eg.1DS19CS5DSCNL"} value={subCode} required onChange={e => { setSubCode(e.target.value) }} />*/}
                    <label>Assigned Faculty :</label>
                    <select
                        type="text"
                        name="assignedFaculty"
                        className="subjectname"
                        defaultValue=""
                        value={details.assignedFaculty}
                        required
                        onChange={handleChange}>
                        <option value="" disabled>Select</option>
                        <option value="admin">admin</option>
                        <option value="AG">Prof. Anupama G</option>
                        <option value="VM">Dr.Vindhya M</option>
                        <option value="DG">Dr.Deepak G</option>
                        <option value="RRS">Dr.Ramya R S</option>
                        <option value="AM">Prof. Almas M</option>
                    </select>
                </div>

                <div>
                    <label>Project Title :</label>
                    <input
                        type="text"
                        name="title"
                        className="subjectcode"
                        value={details.title}
                        required
                        onChange={handleChange} />
                </div>

                <div>
                    <label>Project Type :</label>
                    <input type="radio" name="gender" checked readOnly />
                    <label>Minor Project</label>
                    <input type="radio" name="gender" readOnly />
                    <label>Major Project</label>
                </div>

                <div>
                    <label className="report" htmlFor="report">Upload Synopsis/Report :</label>
                    <input
                        type="file"
                        className="report"
                        name="report"
                        required
                        value={details.report}
                        onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="projectlink">Upload Project Link :</label>
                    <input
                        type="text"
                        name="projLink"
                        className="projectlink"
                        placeholder="Github/Drive Link"
                        required
                        value={details.projLink}
                        onChange={handleChange} />
                </div>

                <button
                    className="generateId"
                    disabled={teamId}
                    type="submit">
                    Generate Team Id
                </button>

                {teamId && <p className="teamId">Team ID : {teamId}</p>}
                {teamId && <button onClick={handleSubmit} className="submit">Submit</button>}
            </form>
            <Modal show={modalShow} handleClose={hideModal}></Modal>
        </React.Fragment>
    )
}

export default Form;