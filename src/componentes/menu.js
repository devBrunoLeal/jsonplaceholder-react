import React from 'react'
import { Link } from 'react-router-dom'
export default function Menu() {

    return (

        <div class="card text-white bg-dark mb-3" style={{ width: "1000px", marginTop: "100px" }}>
            <div class="card-header"><h2 className="cardh2">Menu</h2></div>
            <div class="menu">

                <Link to="/postagens"><button class="button button2">Postagens</button></Link>
                <br />
                <Link to="/albums"><button class="button button2">Albums</button></Link>
                <br />
                <Link to="/todos"><button class="button button2">To-dos</button></Link>

            </div>

            <p style={{ color: "white" }}>Desenvolvido por <strong>Bruno Matheus</strong> -  <a target="_blank" href="https://www.linkedin.com/in/bruno-leal-9554b414a/">Linkedin </a>  -  <a target="_blank" href="https://github.com/devBrunoLeal">GitHub</a></p>
        </div>

    )
}