import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice.js";

const LogIn = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ userName, password }));
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>Login</button>
            </form>
            {user && <h1 style={{ color: "green" }}>Wellcome  {user.userName}!</h1>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
        </div>
    );
};

export default LogIn;
