import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice.js";
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert, Paper } from "@mui/material";

const SignUp = () => {
    const [userName, setUserName] = useState("");  // שמירה על שם המשתמש
    const [email, setEmail] = useState("");  // שמירה על המייל
    const [password, setPassword] = useState("");  // שמירה על הסיסמה
    const [successMessage, setSuccessMessage] = useState("");  // שמירה על הודעת הצלחה
    const [errorMessage, setErrorMessage] = useState("");  // שמירה על הודעת שגיאה
    const dispatch = useDispatch();

    // שליפת נתונים מ-state Redux
    const { loading, error, user } = useSelector(state => state.user);

    // רג'קס לבדוק תקינות של המייל
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // רג'קס לבדוק תקינות של הסיסמה
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // פונקציה שליחת הטופס
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage("");  // מנקה הודעות שגיאה קודמות

        // בדיקת תקינות המייל עם רג'קס
        if (!emailRegex.test(email)) {
            setErrorMessage("Please provide a valid email address.");
            return;
        }

        // בדיקת תקינות הסיסמה עם רג'קס
        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        // שליחה ל-Redux
        dispatch(registerUser({ userName, email, password }))
            .then(() => setSuccessMessage("Registration successful!"))  // אם ההרשמה הצליחה, מציגים את הודעת ההצלחה
            .catch(() => setSuccessMessage(""));  // אם יש שגיאה, מנקים את הודעת ההצלחה
    };

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh", // מקטין את הגובה כדי להרים את התוכן
                padding: 0,
                mt: "-100px" // דוחף את הכלפי מעלה
            }}
        >
            <Paper elevation={3} sx={{ p: 4, textAlign: "center", bgcolor: "#F7F2F3", width: "1000px" }}>
                <Typography variant="h3" sx={{ mb: 3, color: "#00174F" }}>Sign Up</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
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
                {successMessage && <Alert severity="success" sx={{ mt: 3, fontSize: "1.1rem" }}>{successMessage}</Alert>}
                {errorMessage && <Alert severity="error" sx={{ mt: 3, fontSize: "1.1rem" }}>{errorMessage}</Alert>}
                {error && <Alert severity="error" sx={{ mt: 3, fontSize: "1.1rem" }}>{error.message}</Alert>}
            </Paper>
        </Container>

    );
};

export default SignUp;
