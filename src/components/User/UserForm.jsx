import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {
    Typography,
    Paper,
    Link,
    Grid,
    Button,
    CssBaseline,
    RadioGroup,
    FormLabel,
    MenuItem,
    FormGroup,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';

import constant from '../../utils/constant';
import * as apiService from '../../services/UserService'
import { useParams, useNavigate } from 'react-router-dom'
import Toast from './../../utils/Toast';

// Picker
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     TimePicker,
//     DatePicker,
// } from '@material-ui/pickers';

// function DatePickerWrapper(props) {
//     const {
//         input: { name, onChange, value, ...restInput },
//         meta,
//         ...rest
//     } = props;
//     const showError =
//         ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
//         meta.touched;

//     return (
//         <DatePicker
//             {...rest}
//             name={name}
//             helperText={showError ? meta.error || meta.submitError : undefined}
//             error={showError}
//             inputProps={restInput}
//             onChange={onChange}
//             value={value === '' ? null : value}
//         />
//     );
// }

// function TimePickerWrapper(props) {
//     const {
//         input: { name, onChange, value, ...restInput },
//         meta,
//         ...rest
//     } = props;
//     const showError =
//         ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
//         meta.touched;

//     return (
//         <TimePicker
//             {...rest}
//             name={name}
//             helperText={showError ? meta.error || meta.submitError : undefined}
//             error={showError}
//             inputProps={restInput}
//             onChange={onChange}
//             value={value === '' ? null : value}
//         />
//     );
// }

export const UserForm = () => {
    const navigate = new useNavigate();
    const params = new useParams();

    let userId = params && params.id ? params.id : ""
    const [data, setData] = useState([]);
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

    const onSubmit = async values => {

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
    const validate = values => {
        const errors = {};
        if (!values.first_name) {
            errors.first_name = 'Required';
        }
        if (!values.last_name) {
            errors.last_name = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    };

    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <CssBaseline />
            <Typography variant="h4" align="center" component="h1" gutterBottom>
                User Registration
            </Typography>

            <Form
                onSubmit={onSubmit}
                initialValues={data}
                validate={validate}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="first_name"
                                        component={TextField}
                                        type="text"
                                        value={values.first_name}
                                        label="First Name"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        required
                                        name="last_name"
                                        component={TextField}
                                        type="text"
                                        value={values.last_name}
                                        label="Last Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="email"
                                        fullWidth
                                        required
                                        component={TextField}
                                        type="email"
                                        value={values.email}
                                        label="Email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="password"
                                        fullWidth
                                        required
                                        component={TextField}
                                        type="password"
                                        //value={values.password}
                                        label="Password"
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <FormControlLabel
                                        label="Employed"
                                        control={
                                            <Field
                                                name="employed"
                                                component={Checkbox}
                                                type="checkbox"
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Best Stooge</FormLabel>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                label="Larry"
                                                control={
                                                    <Field
                                                        name="stooge"
                                                        component={Radio}
                                                        type="radio"
                                                        value="larry"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Moe"
                                                control={
                                                    <Field
                                                        name="stooge"
                                                        component={Radio}
                                                        type="radio"
                                                        value="moe"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Curly"
                                                control={
                                                    <Field
                                                        name="stooge"
                                                        component={Radio}
                                                        type="radio"
                                                        value="curly"
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid> */}
                                {/* <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Sauces</FormLabel>
                                        <FormGroup row>
                                            <FormControlLabel
                                                label="Ketchup"
                                                control={
                                                    <Field
                                                        name="sauces"
                                                        component={Checkbox}
                                                        type="checkbox"
                                                        value="ketchup"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Mustard"
                                                control={
                                                    <Field
                                                        name="sauces"
                                                        component={Checkbox}
                                                        type="checkbox"
                                                        value="mustard"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Salsa"
                                                control={
                                                    <Field
                                                        name="sauces"
                                                        component={Checkbox}
                                                        type="checkbox"
                                                        value="salsa"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Guacamole 🥑"
                                                control={
                                                    <Field
                                                        name="sauces"
                                                        component={Checkbox}
                                                        type="checkbox"
                                                        value="guacamole"
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid> */}
                                {/* <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="notes"
                                        component={TextField}
                                        multiline
                                        label="Notes"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="city"
                                        component={Select}
                                        label="Select a City"
                                        formControlProps={{ fullWidth: true }}
                                    >
                                        <MenuItem value="London">London</MenuItem>
                                        <MenuItem value="Paris">Paris</MenuItem>
                                        <MenuItem value="Budapest">
                                            A city with a very long Name
                                        </MenuItem>
                                    </Field>
                                </Grid> */}

                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>

                    </form>
                )}
            />
        </div>
    );
}

