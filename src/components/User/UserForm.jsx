import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import constant from '../../utils/constant';
import Button from '@mui/material/Button';
import * as apiService from '../../services/UserService'
import { useParams, useNavigate } from 'react-router-dom'
import Toast from './../../utils/Toast';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from '@material-ui/core/styles' 
import { Formik, Form } from "formik";
import { object, string, number, date, boolean } from "yup";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import TextFieldWrapper from '../UI/CustomTextField'
import SelectWrapper from './../UI/Select';
import DateTimePicker from './../UI/DateTimePicker';
import CheckboxWrapper from '../UI/CheckBox';
import SwitchWrapper from '../UI/Switch';

import countries from "../UI/data/countries";
import states from "../UI/data/states";
import ButtonWrapper from './../UI/Button';
import SnackbarWrapper from '../UI/SnackBar';



const theme = createTheme({});

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8)
    }
}));

const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    arrivalDate: "",
    departureDate: "",
    message: "",
    onOffSwitch: false,
    termsOfService: false
};

// validationSchema
// Only used in Native, not in New-MUI -->
// No min/max needed in validationSchema either
const minDate = new Date();
minDate.setDate(minDate.getDate() - 1);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 90);
const validationSchema = object({
    firstName: string().required("First name Required"),
    lastName: string().required("Last name Required"),
    email: string().email("Invalid email").required("Email required"),
    phone: number()
        .positive("The number must be positive")
        .integer("The number must be an integer")
        .typeError("Please enter a valid phone number")
        .required("Phone number required"),
    addressLine1: string().required("Address required"),
    addressLine2: string(),
    city: string().required("City required"),
    state: string().required("State required"),
    country: string().required("Country required"),
    arrivalDate: date()
        .required("Date of arrival required")
        .max(maxDate, "Reservation must be within 90 days")
        .min(minDate, "Cannot use past days"),
    departureDate: date()
        .required("Date of departure required")
        .max(maxDate, "Reservation must be within 90 days")
        .min(minDate, "Cannot use past days"),
    message: string(),
    onOffSwitch: boolean(),
    termsOfService: boolean()
        .oneOf([true], "The terms and conditions must be accepted.")
        .required("The terms and conditions must be accepted.")
});



export const UserForm = () => {
    const navigate = new useNavigate();
    const params = new useParams();

    let userId = params && params.id ? params.id : ""
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [dataError, setDataError] = useState({
        first_nameError: '',
        last_nameError: '',
        emailError: '',
        passwordError: ''
    });


    useEffect(() => {
        // Component did Mount

        if (userId) {
            // get data from database and set into state variables
            apiService.getUser(userId).then((res) => {
                const resData = res.data.data;
                setData(resData);

            }).catch((err) => {
                Toast(err && err.data && err.data.error ? err.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
            })

        }

        // Cleaning the code
        return () => {
            userId = ""
            setData([])
        }
    }, [])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.first_name === "" && data.first_name.trim() === "") {
            setDataError({ ...dataError, nameError: 'First name field is required' })

            return false;
        }
        if (data.last_name === "" && data.last_name.trim() === "") {
            setDataError({ ...dataError, addressError: 'Last Name field is required' })

            return false;
        }
        if (data.email === "" && data.email.trim() === "") {
            setDataError({ ...dataError, contactNoError: 'Email field is required' })

            return false;
        }
        if (data.password === "" && data.password.trim() === "") {
            setDataError({ ...dataError, passwordError: 'Password field is required' })

            return false;
        }
        if (userId) {
            apiService.updateUser({ userDetails: data }).then((res) => {
                // navigate(constant.APP_ROUTES.GET_VISITOR);
                Toast(constant.SUCCESS.USER.UPDATED_USER, 'success')
                navigate(-1)

            }).catch((err) => {
                throw err.message;
            })
        }
        else {
            apiService.addUser(data).then((res) => {
                Toast(constant.SUCCESS.USER.ADDED_USER, 'success')
                navigate(-1)
            }).catch((error) => {
                Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
            })
        }
    }

    // const formData = (
    //     <Box
    //         component="form"
    //         sx={{
    //             '& .MuiTextField-root': { m: 1, width: '25ch' },
    //         }}
    //         noValidate
    //         autoComplete="off"
    //     >
    //         <div>
    //             <TextField
    //                 id="outlined-error"
    //                 label="First Name"
    //                 name='first_name'
    //                 value={data.first_name}
    //                 onChange={(e) => handleChange(e)}
    //             />
    //              <label style={{"color":"red","fontSize":"15px"}}>{dataError.first_nameError}</label>
    //             <TextField
    //                 //   error
    //                 id="outlined-error-helper-text"
    //                 label="Last Name"
    //                 name='last_name'
    //                 value={data.last_name}
    //                 onChange={(e) => handleChange(e)}
    //             />
    //              <label style={{"color":"red","fontSize":"15px"}}>{dataError.last_nameError}</label>
    //         </div>

    //         <div>
    //             <TextField
    //                 id="outlined-error"
    //                 label="Email"
    //                 name="email"
    //                 value={data.email}
    //                 onChange={(e) => handleChange(e)}
    //             />
    //              <label style={{"color":"red","fontSize":"15px"}}>{dataError.emailError}</label>
    //              <TextField
    //                 id="outlined-error"
    //                 label="Password"
    //                 name="password"
    //                 value={data.password}
    //                 onChange={(e) => handleChange(e)}
    //             />
    //              <label style={{"color":"red","fontSize":"15px"}}>{dataError.emailError}</label>
    //             <Box sx={{ '& button': { m: 1 } }}>
    //                 <Button variant="contained" size="medium" onClick={(e) => handleSubmit(e)}>
    //                     Save
    //                 </Button>
    //                 <Button variant="contained" size="medium" onClick={(e) =>  navigate(-1,{replace:true})}>
    //                     Cancel
    //                 </Button>
    //             </Box>
    //         </div>
    //     </Box>
    // );


    const formData = () => {
        // const [open, setOpen] = useState(false);
        const classes = useStyles();

        // actions = { setSubmitting, resetForm, isSubmitting }
        const submitHandler = (values, actions) => {
            setTimeout(() => {
                // setSubmitting not needed with async
                actions.setSubmitting(false);
                actions.resetForm(initialFormState);
                //   setOpen(true);
                console.log(values); // test
            }, 2000);
        };

        const handleClose = (event, reason) => {
            if (reason === "clickaway") {
                return;
            }
            //setOpen(false);
        };

        return (
            <Grid container>
                <Grid item xs={12}>
                    {/* <Header /> */}
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <div className={classes.formWrapper}>
                            <Formik
                                initialValues={initialFormState}
                                validationSchema={validationSchema}
                                onSubmit={submitHandler}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography>Your details</Typography>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <TextFieldWrapper
                                                    name="firstName"
                                                    label="First Name"
                                                    type="text"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextFieldWrapper
                                                    name="lastName"
                                                    label="Last Name"
                                                    type="text"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="phone"
                                                    label="Phone"
                                                    type="number"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>Address</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="addressLine1"
                                                    label="Address Line 1"
                                                    type="text"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="addressLine2"
                                                    label="Address Line 2"
                                                    type="text"
                                                    value="abc"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextFieldWrapper name="city" label="City" type="text" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <SelectWrapper
                                                    name="state"
                                                    label="State"
                                                    type="text"
                                                    options={states}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SelectWrapper
                                                    name="country"
                                                    label="Country"
                                                    type="text"
                                                    options={countries}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>Booking information</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DateTimePicker
                                                    name="departureDate"
                                                    label="Date of Departure"
                                                />
                                            </Grid>


                                            {isSubmitting && (
                                                <Grid item xs={12}>
                                                    <LinearProgress />
                                                </Grid>
                                            )}
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="message"
                                                    label="Message"
                                                    multiline
                                                    rows={5}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SwitchWrapper
                                                    name="onOffSwitch"
                                                    legend="On/Off switch"
                                                    label="Choose light/dark theme"
                                                    color="error"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CheckboxWrapper
                                                    name="termsOfService"
                                                    legend="Terms of Service"
                                                    label="I agree"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ButtonWrapper>submit form</ButtonWrapper>
                                                {/* <SnackbarWrapper open={open} onClose={handleClose} /> */}
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Container>
                </Grid>
            </Grid>
        );
    };

    const classes = useStyles();

    // actions = { setSubmitting, resetForm, isSubmitting }
    const submitHandler = (values, actions) => {
        // setTimeout(() => {
        //     // setSubmitting not needed with async
        //     actions.setSubmitting(false);
        //     actions.resetForm(initialFormState);
        //     //   setOpen(true);
        //     console.log(values); // test
        // }, 2000);
        console.log("Values",values);
        if (userId) {
            apiService.updateUser({ userDetails: values }).then((res) => {
                // navigate(constant.APP_ROUTES.GET_VISITOR);
                Toast(constant.SUCCESS.USER.UPDATED_USER, 'success')
                navigate(-1)

            }).catch((err) => {
                throw err.message;
            })
        }
        else {
            apiService.addUser(values).then((res) => {
                Toast(constant.SUCCESS.USER.ADDED_USER, 'success')
                navigate(-1)
            }).catch((error) => {
                Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
            })
        }
    };


    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={12}>
                    {/* <Header /> */}
                </Grid>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <div className={classes.formWrapper}>
                            <Formik
                             enableReinitialize={true}
                                initialValues={initialFormState}
                                validationSchema={validationSchema}
                                onSubmit={submitHandler}
                            >
                                {({ dirty, isValid, values, handleChange, handleBlur }) => (
                                    <Form>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Typography>Your details</Typography>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <TextFieldWrapper
                                                    name="firstName"
                                                    label="First Name"
                                                    type="text"
                                                    value={values.firstName}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextFieldWrapper
                                                    name="lastName"
                                                    label="Last Name"
                                                    type="text"
                                                    value={values.lastName}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="email"
                                                    label="Email"
                                                    type="email"
                                                    value={values.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="password"
                                                    label="Password"
                                                    type="text"
                                                    values={values.password}
                                                />
                                            </Grid>
                                            {/* <Grid item xs={12}>
                                                <Typography>Address</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="addressLine1"
                                                    label="Address Line 1"
                                                    type="text"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="addressLine2"
                                                    label="Address Line 2"
                                                    type="text"
                                                    value="abc"
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextFieldWrapper name="city" label="City" type="text" />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <SelectWrapper
                                                    name="state"
                                                    label="State"
                                                    type="text"
                                                    options={states}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SelectWrapper
                                                    name="country"
                                                    label="Country"
                                                    type="text"
                                                    options={countries}
                                                />
                                            </Grid> */}
                                            {/* <Grid item xs={12}>
                                                <Typography>Booking information</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DateTimePicker
                                                    name="departureDate"
                                                    label="Date of Departure"
                                                />
                                            </Grid>


                                            {isSubmitting && (
                                                <Grid item xs={12}>
                                                    <LinearProgress />
                                                </Grid>
                                            )}
                                            <Grid item xs={12}>
                                                <TextFieldWrapper
                                                    name="message"
                                                    label="Message"
                                                    multiline
                                                    rows={5}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <SwitchWrapper
                                                    name="onOffSwitch"
                                                    legend="On/Off switch"
                                                    label="Choose light/dark theme"
                                                    color="error"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CheckboxWrapper
                                                    name="termsOfService"
                                                    legend="Terms of Service"
                                                    label="I agree"
                                                />
                                            </Grid> */}
                                            <Grid item xs={12}>
                                                <ButtonWrapper>submit form</ButtonWrapper>
                                                {/* <SnackbarWrapper open={open} onClose={handleClose} /> */}
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Container>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
