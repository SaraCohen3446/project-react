import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice.js";
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert, Paper } from "@mui/material";

const LogIn = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <Container  
            sx={{ top:"0px", width:"1500px", padding: 0, height:"550px", }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: "center", bgcolor: "#F7F2F3" }}>
                <Typography variant="h3" sx={{ mb: 3, color: "#00174F" }}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField label="email" variant="outlined" fullWidth value={email} onChange={(e) => setemail(e.target.value)} required />
                    <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="submit" variant="contained" fullWidth
                        sx={{ bgcolor: "#00174F", color: "white", '&:hover': { bgcolor: "#002B7F" }, py: 1.5, fontSize: "1.2rem" }}
                        disabled={loading}>{loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>
                </Box>
                {user && <Alert severity="success" sx={{ mt: 3, fontSize: "1.1rem" }}>Welcome {user.userName}!</Alert>}
                {error && <Alert severity="error" sx={{ mt: 3, fontSize: "1.1rem" }}>{error.message}</Alert>}
            </Paper>
        </Container>
    );
};

export default LogIn;
