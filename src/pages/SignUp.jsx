import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice.js";
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.user);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^[A-Za-z\\d]{8,}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotification(null);

        if (!emailRegex.test(email)) {
            setNotification({ type: "error", message: "Please provide a valid email address." });
            return;
        }

        if (!passwordRegex.test(password)) {
            setNotification({ type: "error", message: "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character." });
            return;
        }

        dispatch(registerUser({ userName, email, password }));
    };

    useEffect(() => {
        error &&
            setNotification({ type: "error", message: error.message }); // אם יש שגיאה, מציג את ההודעה המתאימה
    }, [error]);

    useEffect(() => {
        if (user) {
            setNotification({ type: "success", message: `Welcome ${user.userName}!` });
            const timer = setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    }, [user]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", padding: 0, mt: "-100px" }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center", bgcolor: "#F7F2F3", width: "1000px" }}>
                <Typography variant="h3" sx={{ mb: 3, color: "#00174F" }}>Sign Up</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField label="Username" variant="outlined" fullWidth value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#00174F", color: "white", '&:hover': { bgcolor: "#002B7F" }, py: 1.5, fontSize: "1.2rem" }} disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </Button>
                </Box>
                {notification && <Alert severity={notification.type} sx={{ mt: 3, fontSize: "1.1rem" }}>{notification.message}</Alert>}
            </Paper>
        </Container>
    );
};

export default SignUp;
