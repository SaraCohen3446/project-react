import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice.js"; // ייבוא פעולה שמבצע את הרישום
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert, Paper, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [notification, setNotification] = useState(null);
    const { loading, error, user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        setNotification(null);

        if (!emailRegex.test(email)) {
            setNotification({ type: "error", message: "Please provide a valid email address." });
            return;
        }

        if (password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/[0-9]/.test(password)) {
            setNotification({ type: "error", message: "Password must be at least 8 characters long and include uppercase, lowercase and a number." });
            return;
        }

        dispatch(registerUser({ userName, email, password }));
    };

    useEffect(() => {
        if (user) {
            setNotification({ type: "success", message: `Welcome ${user.userName}!` });
            const timer = setTimeout(() => {
                navigate("/"); // מנווט לדף הבית אחרי הצלחה
            }, 1000);
        }
    }, [user]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", padding: 0, mt: "120px" }}>
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
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ bgcolor: "#00174F", color: "white", '&:hover': { bgcolor: "#002B7F" }, py: 1.5, fontSize: "1.2rem" }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
                    </Button>
                </Box>
                {notification && <Alert severity={notification.type} sx={{ mt: 3, fontSize: "1.1rem" }}>{notification.message}</Alert>}
            </Paper>
        </Container>
    );
};

export default SignUp;
