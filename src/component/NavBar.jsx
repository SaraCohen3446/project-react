import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../features/userSlice';

const NavBar = () => {
    let dis = useDispatch()
    let user = useSelector(st => st.user.user)
    const currentUser = user;
    return (
        <>
            <nav>
                <Link to="/">Home  </Link>
                <Link to="/login">Login  </Link>
                <Link to="/signin">Sign Up  </Link>
                {currentUser?.role == "MANAGER" &&(<Link to="/AddProduct">Add product</Link>)}
            </nav>
            {user && <button onClick={() => dis(logOut())}>logOut</button>}
        </>

    );
}


export default NavBar;
