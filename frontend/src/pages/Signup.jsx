import { useState } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";


function Signup() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setLoading(true);


        try {

            const response = await api.post(
                "/auth/signup",
                {
                    name,
                    email,
                    password
                }
            );


            const {
                token,
                user
            } = response.data;


            login(token, user);


            navigate("/dashboard");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Signup failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Task Manager</h1>

                <h2>Create Account</h2>


                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <div>

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            required
                        />

                    </div>


                    <div>

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            required
                        />

                    </div>


                    <div>

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Minimum 6 characters"
                            minLength="6"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating account..."
                            : "Sign Up"
                        }

                    </button>

                </form>


                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}


export default Signup;