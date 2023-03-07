import React, { useState, useEffect } from 'react'
import { Lightbox } from '@opensource/bit-scope.lightbox'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import constant from '../utils/constant';
import Button from '@mui/material/Button';
import { addVisitor, getVisitor, updateVisitor } from '../services/VisitorService'
import { useParams, useNavigate } from 'react-router-dom'

export const CreateVisitor = () => {
    let history = new useNavigate();
    let { id } = useParams();
    const [data, setData] = useState({
        name: '',
        address: '',
        contactNo: ''
    });

    let visitorId = "";

    useEffect(() => {
        // Component did Mount

        if (id) {
            visitorId = id;

            // get data from database and set into state variables
            getVisitor(id).then((res) => {
                console.log("Response is ", res);
                const resData = res.data.data;
                setData(resData);

            }).catch((err) => {
                console.log("Error is", err.message());
            })

        }
    }, [])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateVisitor(data).then((res) => {
                console.log("Data Updated succesfully!!!")
            }).catch((err) => {
                throw err.message;
            })
        }
        else {
            addVisitor(data).then((res) => {
                console.log("Data saved succesfully!!!")
            }).catch((err) => {
                throw err.message;
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
                    <Button variant="contained" size="medium">
                        Cancel
                    </Button>
                </Box>
            </div>
        </Box>
    );
    return (
        <div>
            { id ? 
             <Lightbox title={constant.PAGES.VISITOR.EDIT_VISTOR_MODAL_TITLE} content={formData} buttonTitle={constant.PAGES.VISITOR.EDIT_VISITOR_BUTTON_TEXT} />
            :
         <Lightbox title={constant.PAGES.VISITOR.ADD_VISTOR_MODAL_TITLE} content={formData} buttonTitle={constant.PAGES.VISITOR.ADD_VISITOR_BUTTON_TEXT} />
        }
            </div>
    )
}
