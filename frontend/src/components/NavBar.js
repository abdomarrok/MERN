import { Link } from "react-router-dom"

const NavBar=()=>{
    return(
        <header>
            <div  className="container">
                <Link to ='/' >
                    Wourkout Buddy
                </Link>
            </div>
        </header>
    )
}

export default NavBar