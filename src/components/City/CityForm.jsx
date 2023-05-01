import React, { useState, useEffect } from 'react'

import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
} from "@material-ui/core"


import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import * as apiService from '../../services/CityService'

import { useParams, useNavigate } from 'react-router-dom'
import Toast from '../../utils/Toast';
import constant from '../../utils/constant'
import TextFieldWrapper from '../UI/CustomTextField'

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

//validation schema
let validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
})

export const CityForm = () => {

  const classes = useStyle()
  const navigate = new useNavigate();
  const params = new useParams();

  let cityId = params && params.id ? params.id : ""

  //Data
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    // Component did Mount

    if (cityId) {
      // get data from database and set into state variables
      apiService.getCity(cityId).then((res) => {
        const resData = res.data.data;
        setInitialValues(resData)


      }).catch((err) => {
        Toast(err && err.data && err.data.error ? err.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
      })

    }

    // Cleaning the code
    return () => {
      cityId = ""
      setInitialValues([])
    }
  }, [])

  const onSubmit = (values, { setSubmitting }) => {
    console.log(values);

    if (cityId) {
      apiService.updateCity({ cityDetails: values }).then((res) => {
        Toast(constant.SUCCESS.CITY.UPDATED_CITY, 'success')
        navigate(-1)
      }).catch((error) => {
        setSubmitting(false);
        Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
      })
    }
    else {
      apiService.addCity(values).then((res) => {
        if (res.data.data)
          Toast(constant.SUCCESS.CITY.ADDED_CITY, 'success')
        navigate(-1)
      }).catch((error) => {
        setSubmitting(false);
        Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
      })
    }
  }

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item md={6}>
        <Card className={classes.padding}>
          <CardHeader title="CITY FORM"></CardHeader>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ dirty, isValid, values, handleChange, handleBlur }) => {
              return (
                <Form>
                  <CardContent>
                    <Grid item container spacing={1} justify="center">
                      <Grid item xs={12} sm={6} md={6}>
                        
                        <TextFieldWrapper
                          focused
                          label="City Name"
                          variant="outlined"
                          fullWidth
                          name="name"
                          value={values.name}
                        />
                      </Grid>

                    </Grid>
                  </CardContent>
                  <CardActions >
                    <Button
                      variant="contained"
                      color="primary"
                      type="Submit"
                      className={classes.button}>
                      Save
                    </Button>
                    <Button variant="contained" size="medium" onClick={(e) => navigate(-1, { replace: true })}>
                      Cancel
                    </Button>
                  </CardActions>
                </Form>
              )
            }}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  )
}
