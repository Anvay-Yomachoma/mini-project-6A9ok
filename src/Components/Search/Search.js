import React, { useState } from 'react'
import Header from './../Header';
import SearchResult from './SearchResult';


function Search() {
    const [searchBy, setSearchBy] = useState(["usn", "eg.1DS19CS001"]);

    const [displayResult, setDisplayResult] = useState(false);

    const [searchVal,setSearchVal] = useState("") ;

    const regex = /1DS\d\dCS\d\d\d/i;

    const handleChange = (e) => {
        setSearchVal("") ;
        if (e.target.value === "usn")
            setSearchBy(["usn", "eg.1DS19CS001"]);
        else if (e.target.value === "projectTitle")
            setSearchBy(["projectTitle", "eg.Courier Management System"]);
        if (e.target.value === "subName")
            setSearchBy(["subName", "eg.Computer Networks"]);
    }

    const handleSubmit = () => {
        let searchValue = document.querySelector(".searchBar").value ;

        if(!searchValue){
            if(searchBy[0]=="usn")
                alert(`Enter the USN`);
            else if(searchBy[0]=="projectTitle")
                alert(`Enter the Project Title`);
            if(searchBy[0]=="subName")
                alert(`Enter the Subject Name`);
            return ;
        }

        if(searchBy[0]=="usn"){
            if(!regex.test(searchValue)) {
                alert("Enter a Valid USN!") ;
                return ;
            }
        }

        setDisplayResult(true) ;
        setSearchVal(searchValue) ;
    }
  

    return (
        <div>
            <Header links={[{ name: "", href: "" }, { name: "LOGOUT", href: "/facultylogin" }]}></Header>

            <div className="search">
                <h2>Project Archive</h2>
                <div>
                    <section>
                        <input type="text" placeholder={searchBy[1]} className="searchBar" />
                        <button className="searchBtn" onClick={handleSubmit}>Search </button>
                    </section>
                    <section className="radioBtns">
                        <p>Search by :</p>
                        <input type="radio" name="searchBy" value="usn" checked={searchBy[0] === "usn"} onChange={(e) => handleChange(e)} />
                        <label>USN</label>
                        <input type="radio" name="searchBy" value="projectTitle" checked={searchBy[0] === "projectTitle"} onChange={(e) => handleChange(e)} />
                        <label>Project Title</label>
                        <input type="radio" name="searchBy" value="subName" checked={searchBy[0] === "subName"} onChange={(e) => handleChange(e)} />
                        <label>Subject Name</label>
                    </section>
                </div>
            </div>
            
            {displayResult && <SearchResult searchVal={searchVal} searchBy={searchBy}></SearchResult>}
        </div>
    )
}

export default Search