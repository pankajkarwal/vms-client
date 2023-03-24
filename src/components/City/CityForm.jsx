import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import constant from '../../utils/constant';
import Button from '@mui/material/Button';
import * as apiService from '../../services/CityService'
import { useParams, useNavigate} from 'react-router-dom'
import Toast from '../../utils/Toast';

export const CityForm = () => {
    const navigate = new useNavigate();
    const params = new useParams();

    let cityId = params && params.id ? params.id : ""
    const [data, setData] = useState({
        name: '',
    });
    
    const [dataError, setDataError] = useState({
        nameError: '',
    });

    useEffect(() => {
        // Component did Mount
       
        if (cityId) {
            // get data from database and set into state variables
            apiService.getCity(cityId).then((res) => {
                const resData = res.data.data;
                setData(resData);

            }).catch((err) => {
                Toast(err && err.data && err.data.error ? err.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
            })

        }

        // Cleaning the code
        return () => {
            cityId = ""
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
                setDataError({...dataError,nameError: 'City name field is required'})
              
                return false;
            }
        if (cityId) {
            apiService.updateCity({ cityDetails: data }).then((res) => {
                
                Toast(constant.SUCCESS.CITY.UPDATED_CITY, 'success')
                navigate(-1)

            }).catch((err) => {
                throw err.message;
            })
        }
        else {
            
            apiService.addCity(data).then((res) => {
                if(res.data.data)
                Toast(constant.SUCCESS.CITY.ADDED_CITY, 'success')
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
                    label="City Name"
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
