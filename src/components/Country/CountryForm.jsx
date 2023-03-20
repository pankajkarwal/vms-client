import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import constant from '../../utils/constant';
import Button from '@mui/material/Button';
import * as countryService from '../../services/CountryService'
import { useParams, useNavigate, Outlet, useLocation, redirect } from 'react-router-dom'
import Toast from './../../utils/Toast';

export const CountryForm = () => {
    const navigate = new useNavigate();
    const params = new useParams();

    let countryId = params && params.id ? params.id : ""
    const [data, setData] = useState({
        name: '',
    });
    
    const [dataError, setDataError] = useState({
        nameError: '',
    });

    useEffect(() => {
        // Component did Mount
       
        if (countryId) {
            // get data from database and set into state variables
            countryService.getCountry(countryId).then((res) => {
                const resData = res.data.data;
                setData(resData);

            }).catch((err) => {
                Toast(err && err.data && err.data.error ? err.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
            })

        }

        // Cleaning the code
        return () => {
            countryId = ""
            setData([])
        }
    }, [])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.name =="" && data.name.trim() =="")
            {
                setDataError({...dataError,nameError: 'Country name field is required'})
                // errors.nameError='Name field is required'
                return false;
            }
        if (countryId) {
            countryService.updateCountry({ countryDetails: data }).then((res) => {
                
                Toast(constant.SUCCESS.COUNTRY.UPDATED_COUNTRY, 'success')
                navigate(-1)

            }).catch((err) => {
                throw err.message;
            })
        }
        else {
            
            countryService.addCountry(data).then((res) => {
                if(res.data.data)
                Toast(constant.SUCCESS.COUNTRY.ADDED_COUNTRY, 'success')
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
                    label="Country Name"
                    name="name"
                    value={data.name}
                    onChange={(e) => handleChange(e)}
                />
                <br />
                <label style={{"color":"red","fontSize":"15px"}}>{dataError.nameError}</label>
               
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
