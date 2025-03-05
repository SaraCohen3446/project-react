import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice.js";

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
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}  // עדכון שם המשתמש
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // עדכון המייל
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // עדכון הסיסמה
                    required
                />
                <button type="submit" disabled={loading}>Sign Up</button>  {/* כפתור שמפסק עם טעינה */}
            </form>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}  {/* הצגת הודעת הצלחה */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}  {/* הצגת הודעת שגיאה */}
            {error && <p style={{ color: "red" }}>{error.message}</p>}  {/* הצגת שגיאות מתוך Redux, אם יש */}
        </div>
    );
};

export default SignUp;
