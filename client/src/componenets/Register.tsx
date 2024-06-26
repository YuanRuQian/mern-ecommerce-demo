/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { RegisterProps } from "../utils/types";
import { useDispatch } from "react-redux";
import { registerAsync } from "../slice/authSlice";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const navigateToProducts = () => {
        navigate("/products");
    };

    const [open, setOpen] = React.useState(false);

    const [error, setError] = React.useState<string>("");

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const [formData, setFormData] = useState<RegisterProps>({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<RegisterProps>({
        username: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const validate = () => {
        const newErrors: RegisterProps = {
            username: "",
            email: "",
            password: ""
        };
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/;

        if (!usernameRegex.test(formData.username)) {
            newErrors.username =
                "Username must be 3-20 characters long and contain no special characters.";
        }
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email must be a valid email address.";
        }
        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be minimum 8 characters, maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character.";
        }

        return newErrors;
    };

    const onHandleRegister = (formData: RegisterProps) => {
        dispatch(registerAsync(formData))
            .unwrap()
            .then(() => {
                setFormData({ username: "", email: "", password: "" });
                setErrors({ username: "", email: "", password: "" });
                navigateToProducts();
            })
            .catch((error) => {
                setError(error.message);
                setOpen(true);
            });
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.values(validationErrors).every((err) => err === "")) {
            // Submit form data to the server
            console.log("Form data is valid. Submitting:", formData);
            onHandleRegister(formData);
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <Box
            sx={{ display: "flex", flexWrap: "wrap" }}
            flexDirection={"column"}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            alignItems="center"
            justifyContent="center"
        >
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel
                    error={!!errors.username}
                    htmlFor="outlined-password"
                >
                    Username
                </InputLabel>
                <OutlinedInput
                    id="outlined-password"
                    type="text"
                    onChange={handleChange}
                    error={!!errors.username}
                    label="Username"
                    name="username"
                    value={formData.username}
                />
                <FormHelperText error={!!errors.username}>
                    {errors.username}
                </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel error={!!errors.email} htmlFor="outlined-email">
                    Email
                </InputLabel>
                <OutlinedInput
                    id="outlined-email"
                    type="email"
                    onChange={handleChange}
                    error={!!errors.email}
                    label="Email"
                    name="email"
                    value={formData.email}
                />
                <FormHelperText error={!!errors.email}>
                    {errors.email}
                </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel
                    error={!!errors.password}
                    htmlFor="outlined-adornment-password"
                >
                    Password
                </InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    error={!!errors.password}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                color={errors.password ? "error" : "inherit"}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    value={formData.password}
                />
                <FormHelperText error={!!errors.password}>
                    {errors.password || ""}
                </FormHelperText>
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                Register
            </Button>
            <Snackbar
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Register;
