import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {

    // Componente para renderizar barra superior, logo e home button.
    return (
        <h1 className="logoh1">
            <Link to="/"><span class="material-icons" style={{ position: "absolute", left: "45px" }}> home <p style={{ fontSize: "15px", marginBottom: "20px" }}>inicio</p></span></Link>
            <Link to="/"><img src="https://s3-sa-east-1.amazonaws.com/prod-jobsite-files.kenoby.com/uploads/frameworkpadawans-1588010537-logo-menupng.png"></img></Link></h1>
    )
}

export default Logo;