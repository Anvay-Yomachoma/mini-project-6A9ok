import React from 'react'

function Heading(props) {
    return (
        <div className="heading">
            <p className="welcome">{props.intro[0]}</p>
            <p className="upload">{props.intro[1]}</p>
        </div>
    )
}

export default Heading