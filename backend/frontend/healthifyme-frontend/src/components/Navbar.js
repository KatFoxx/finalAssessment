import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [cookies, , removeCookie] = useCookies(['user']);
    const navigate = useNavigate();
    // Checks if user is logged in
    useEffect(() => {
        const user = cookies.user;
        if (user) {
            setUser(user);
        }
    }, [cookies]);

    const handleLogout = () => {
        removeCookie('user', { path: '/' }); 
        setUser(null);
        navigate('/'); // Redirect to the Home component
    };

    return (
        <nav>
            <ul>
                {/* Common Links */}
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Contact">Contact</Link>
                </li>
                <li>
                    <Link to="/About">About</Link>
                </li>
                {!user && (
                    <>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                {/* Links for Logged-in Users */}
                {user && (
                    <>
                        <li>
                            <Link to="/workout">Workouts</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="btn logout">
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
