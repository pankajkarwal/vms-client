import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import constant from '../utils/constant';
import Button from '@mui/material/Button';
import { addVisitor, getVisitor, updateVisitor } from '../services/VisitorService'
import { useParams, useNavigate } from 'react-router-dom'
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
    const [dataError, setDataError] = useState({
        nameError: '',
        addressError: '',
        contactNoError: ''
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
        if(data.name ==="" && data.name.trim() ==="")
            {
                setDataError({...dataError,nameError: 'Visitor name field is required'})
                return false;
            }
            if(data.address ==="" && data.address.trim() ==="")
            {
                setDataError({...dataError,addressError: 'Address field is required'})
                return false;
            }
            if(data.contactNo ==="" && data.contactNo.trim() ==="")
            {
                setDataError({...dataError,contactNoError: 'Contact Number field is required'})
                return false;
            }
        if (visitorId) {
            updateVisitor({ visitorDetails: data }).then((res) => {
                // navigate(constant.APP_ROUTES.GET_VISITOR);
                Toast(constant.SUCCESS.VISITOR.UPDATED_VISITOR, 'success')
                navigate(-1)

            }).catch((err) => {
                throw err.message;
            })
        }
        else {
            addVisitor(data).then((res) => {
                //navigate(constant.APP_ROUTES.GET_VISITOR)
                Toast(constant.SUCCESS.VISITOR.ADDED_VISITOR, 'success')
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
                 <label style={{"color":"red","fontSize":"15px"}}>{dataError.nameError}</label>
                <TextField
                    //   error
                    id="outlined-error-helper-text"
                    label="Contact Number"
                    name='contactNo'
                    value={data.contactNo}
                    onChange={(e) => handleChange(e)}
                />
                 <label style={{"color":"red","fontSize":"15px"}}>{dataError.contactNoError}</label>
            </div>

            <div>
                <TextField
                    id="outlined-error"
                    label="Address"
                    name="address"
                    value={data.address}
                    onChange={(e) => handleChange(e)}
                />
                 <label style={{"color":"red","fontSize":"15px"}}>{dataError.addressError}</label>
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
