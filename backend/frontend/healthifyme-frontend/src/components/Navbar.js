import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [cookies, , removeCookie] = useCookies(['user']);
    const navigate = useNavigate();

    useEffect(() => {
        const user = cookies.user;
        if (user) {
            setUser(user);
        }
    }, [cookies]);

    const handleLogout = () => {
        removeCookie('user', { path: '/' }); // Ensure the correct path is used
        setUser(null);
        navigate('/'); // Redirect to the homepage (or login)
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
                            <button onClick={handleLogout}>
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
