import React, { useState } from 'react'
import { Link } from "react-router-dom";

const NavBar = (props) => {
    const [name, setName] = useState("");

    const onChange = (e) => {
        setName(e.target.value);
    }
    return (
        <nav class="navbar fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">Marvel</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                    <label htmlFor="" style={{ color: 'white',margin:"10px" }}>Search Your Favourite Characters</label>

                    <form class="d-flex">
                        <input value={name} onChange={onChange} class="form-control me-2" type="search" placeholder="" name='name' aria-label="Search" />
                        <button onClick={(e) => {
                            e.preventDefault();
                            props.fetchChar(name);
                        }} class="btn btn-outline-success" type="submit"><Link to="/name">Search</Link></button>
                    </form>
                </div>
            </div>
        </nav>
    )

}

export default NavBar
