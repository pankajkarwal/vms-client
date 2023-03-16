import React, { useState, useEffect } from 'react'
import { Lightbox } from '@opensource/bit-scope.lightbox'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import constant from '../utils/constant';
import Button from '@mui/material/Button';
import { addVisitor, getVisitor, updateVisitor } from '../services/VisitorService'
import { useParams, useNavigate, Outlet, useLocation, redirect } from 'react-router-dom'
import Toast from './../utils/Toast';

export const VisitorForm = () => {
    const navigate = new useNavigate();
    const params = new useParams();

    let visitorId = params && params.id ? params.id : ""
    const [data, setData] = useState({
        name: '',
        address: '',
        contactNo: ''
    });


    useEffect(() => {
        // Component did Mount
       
        if (visitorId) {
            // get data from database and set into state variables
            getVisitor(visitorId).then((res) => {
                const resData = res.data.data;
                setData(resData);

            }).catch((err) => {
                Toast(err && err.data && err.data.error ? err.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
                console.log("Error is", err.message());
            })

        }

        // Cleaning the code
        return () => {
            visitorId = ""
            setData([])
        }
    }, [])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (visitorId) {
            updateVisitor({ visitorDetails: data }).then((res) => {
                // navigate(constant.APP_ROUTES.GET_VISITOR);
                Toast(constant.SUCCESS.UPDATED_VISITOR, 'success')
                navigate(-1)

            }).catch((err) => {
                throw err.message;
            })
        }
        else {
            addVisitor(data).then((res) => {
                //navigate(constant.APP_ROUTES.GET_VISITOR)
                Toast(constant.SUCCESS.ADDED_VISITOR, 'success')
                navigate(-1)
            }).catch((error) => {
                Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
            })
        }
    }
    
    const formData = (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    id="outlined-error"
                    label="Visitor Name"
                    name='name'
                    value={data.name}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    //   error
                    id="outlined-error-helper-text"
                    label="Contact Number"
                    name='contactNo'
                    value={data.contactNo}
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <div>
                <TextField
                    id="outlined-error"
                    label="Address"
                    name="address"
                    value={data.address}
                    onChange={(e) => handleChange(e)}
                />
                <Box sx={{ '& button': { m: 1 } }}>
                    <Button variant="contained" size="medium" onClick={(e) => handleSubmit(e)}>
                        Save
                    </Button>
                    <Button variant="contained" size="medium" onClick={(e) =>  navigate(-1,{replace:true})}>
                        Cancel
                    </Button>
                </Box>
            </div>
        </Box>
    );


    return (
        <div>

            {formData}
        </div>
    )
}
