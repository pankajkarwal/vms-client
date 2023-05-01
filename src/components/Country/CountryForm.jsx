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
import constant from '../../utils/constant';
import * as countryService from '../../services/CountryService'
import { useParams, useNavigate } from 'react-router-dom'
import Toast from './../../utils/Toast';
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

export const CountryForm = () => {
  const classes = useStyle()
  const navigate = new useNavigate();
  const params = new useParams();

  let countryId = params && params.id ? params.id : ""
  //Data
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    // Component did Mount

    if (countryId) {
      // get data from database and set into state variables
      countryService.getCountry(countryId).then((res) => {
        const resData = res.data.data;
        setInitialValues(resData)


      }).catch((err) => {
        Toast(err && err.data && err.data.error ? err.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
      })

    }

    // Cleaning the code
    return () => {
      countryId = ""

      setInitialValues({})
    }
  }, [])

  const onSubmit = (values, { setSubmitting }) => {
    if (countryId) {
      countryService.updateCountry({ countryDetails: values }).then((res) => {
        Toast(constant.SUCCESS.COUNTRY.UPDATED_COUNTRY, 'success')
        navigate(-1)

      }).catch((error) => {
        setSubmitting(false);
        Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
      })
    }
    else {

      countryService.addCountry(values).then((res) => {
        if (res.data.data)
          Toast(constant.SUCCESS.COUNTRY.ADDED_COUNTRY, 'success')
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
          <CardHeader title="COUNTRY FORM"></CardHeader>
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
                          label="Country Name"
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
