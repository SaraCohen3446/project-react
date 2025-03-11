import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/userSlice.js"; // ייבוא פעולה שמבצע את ההתחברות
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert, Paper, InputAdornment, IconButton } from "@mui/material"; // ייבוא רכיבי MUI
import { Visibility, VisibilityOff } from "@mui/icons-material"; // ייבוא אייקוני עין

const LogIn = () => {
    const [email, setemail] = useState(""); // שדה לאחסון המייל
    const [password, setPassword] = useState(""); // שדה לאחסון הסיסמה
    const [showPassword, setShowPassword] = useState(false); // סטייט לניהול מצב ההצגה של הסיסמה
    const dispatch = useDispatch(); // גישה לפונקציות Redux
    const { loading, error, user } = useSelector(state => state.user); // שליפת מצב הטעינה, השגיאות והמשתמש ב-Redux
    const [notification, setNotification] = useState(null); // מצב לניהול הודעות

    // פונקציה שתתבצע בעת שליחת הטופס
    const handleSubmit = (e) => {
        e.preventDefault(); // מונע ריענון של הדף
        dispatch(loginUser({ email, password })); // שולח את המייל והסיסמה ל-Redux
    };

    // useEffect כדי לעדכן את ההודעה בהתאם למצב השגיאה או המשתמש
    useEffect(() => {
        if (error) {
            setNotification({ type: "error", message: error.message }); // אם יש שגיאה, מציג את ההודעה המתאימה
        } else if (user) {
            setNotification({ type: "success", message: `Welcome ${user.userName}!` }); // אם התחבר בהצלחה, מציג את הודעת ההצלחה
        }
    }, [error, user]); // הפעל כאשר השגיאה או המשתמש משתנים

    // useEffect שמנקה את ההודעה אחרי 3 שניות
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null); // מחיקת ההודעה אחרי 3 שניות
            }, 3000); // זמן של 3 שניות
            return () => clearTimeout(timer); // מנקה את הטיימר במקרה שהקומפוננטה תתעדכן
        }
    }, [notification]); // הפעל כשיש שינוי בהודעה

    // פונקציה להחלפת מצב ההצגה של הסיסמה
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword); // משנה את המצב של הצגת הסיסמה
    };

    return (
        <Container sx={{ top:"0px", width:"1500px", padding: 0, height:"550px", }}>
            {/* עטיפה של העמוד ב-Paper עם רקע וסטייל */}
            <Paper elevation={3} sx={{ p: 4, textAlign: "center", bgcolor: "#F7F2F3" }}>
                <Typography variant="h3" sx={{ mb: 3, color: "#00174F" }}>Login</Typography> {/* כותרת העמוד */}
                {/* טופס התחברות */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* שדה למייל */}
                    <TextField 
                        label="email" 
                        variant="outlined" 
                        fullWidth 
                        value={email} 
                        onChange={(e) => setemail(e.target.value)} 
                        required 
                    />
                    {/* שדה לסיסמה */}
                    <TextField 
                        label="Password" 
                        type={showPassword ? "text" : "password"} // הצגת טקסט אם showPassword הוא true, אחרת סיסמה
                        variant="outlined" 
                        fullWidth 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={handleClickShowPassword} 
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />} {/* הצגת אייקון עין */}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {/* כפתור לשליחה עם אינדיקציה לטעינה */}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth
                        sx={{ bgcolor: "#00174F", color: "white", '&:hover': { bgcolor: "#002B7F" }, py: 1.5, fontSize: "1.2rem" }}
                        disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"} {/* הצגת סיבוב טעינה אם הטעינה פעילה */}
                    </Button>
                </Box>
                
                {/* הצגת הודעות אם יש */}
                {notification && 
                    <Alert severity={notification.type} sx={{ mt: 3, fontSize: "1.1rem" }}>
                        {notification.message} {/* הצגת ההודעה */}
                    </Alert>
                }
            </Paper>
        </Container>
    );
};

export default LogIn;
