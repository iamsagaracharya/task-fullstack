import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


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
                "/auth/login",
                {
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
                "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>Task Manager</h1>

                <h2>Login</h2>


                {error && (

                    <div className="error">
                        {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

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
                            placeholder="Enter your password"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Logging in..."
                            : "Login"
                        }

                    </button>

                </form>


                <p>

                    Don't have an account?

                    {" "}

                    <Link to="/signup">
                        Sign up
                    </Link>

                </p>

            </div>

        </div>

    );

}


export default Login;