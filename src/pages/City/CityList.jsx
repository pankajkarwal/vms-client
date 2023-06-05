import React, { useEffect, useState } from 'react'
import * as apiServices from '../../services/CityService'
import { DynamicTable } from '@opensource/bit-scope.dynamic-table'
import constant from '../../utils/constant';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Box } from '@mui/material';
import Toast from '../../utils/Toast';
import { formatRoute } from 'react-router-named-routes'
import ConfirmDialog from '../../utils/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { DateConversion } from '../../utils/DateConversion';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../../store/reducer/counterSlice';


export default function CityList() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  const [rows, setRows] = useState([])
  const [vId, setVId] = useState(0);
  const [openBox, setOpenBox] = useState(false);
  const navigate = useNavigate();

  const onDelete = (e) => {
    e.stopPropagation()
    // Call the api for deleting the Country record from the database
    apiServices.deleteCity(vId).then((res) => {
      if (res && res.data) {
        Toast(constant.SUCCESS.CITY.DELETED_CITY, 'success')
        navigate(0);
      }
    }).catch((error) => {
      Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
    })

  };


  const editPage = (countryId) => {
    navigate(formatRoute(constant.APP_ROUTES.CITY.EDIT_CITY, { id: countryId }));
  }

  const addPage = () => {
    navigate(constant.APP_ROUTES.CITY.ADD_CITY);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'name', headerName: 'Name', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'created_at', headerName: 'Date of Creation', width: 250, headerClassName: 'super-app-theme--header' },
    {
      field: 'actions', headerName: 'Actions', width: 500, headerClassName: 'super-app-theme--header', renderCell: (params) => {
        return (
          <>
            <IconButton aria-label="edit" onClick={(e) => editPage(params.row._id)} >
              <ModeEditIcon />
            </IconButton>
            &nbsp;&nbsp;
            <div>
              <IconButton aria-label="delete" onClick={() => { setOpenBox(true); setVId(params.row._id) }}>
                <DeleteIcon />
              </IconButton>
              <ConfirmDialog
                id={params.row._id}
                title={constant.MODELS.CITY.DELETE_HEADER}
                open={openBox}
                setOpen={setOpenBox}
                onConfirm={onDelete}
              >
                {constant.MODELS.CITY.DELETE_TEXT}
              </ConfirmDialog>
            </div>

          </>
        );
      }
    }
  ]
  useEffect(() => {
    // Component did Mount
    apiServices.getCities().then((res) => {
      const filteredData = res && res.data && res.data.data && res.data.data.length > 0 && res.data.data.map((item, i) => {
        if (item.created_at) {
          item.created_at = DateConversion(item.created_at, 'MMMM Do YYYY, h:mm:ss a')
        }
        return {
          ...item,
          id: i + 1
        }
      });
      setRows(filteredData)
    }).catch((error) => {
      Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
    })
  }, [])
  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
        {...other}
      />
    );
  }
  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <Item>{constant.PAGES.CITY.LIST_PAGE_CAPTION}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item> <Button variant="contained" onClick={addPage} >{constant.LABEL_CONSTANTS.CITY.BTN_ADD_VISITOR}</Button></Item>
            </Grid>

          </Grid>

          <Grid item xs={12}>
            <Item>
              <Box
                sx={{
                  height: 300,
                  width: '100%',
                  '& .super-app-theme--header': {
                    backgroundColor: '#3f51b5',
                    color: 'white'
                  },
                }}
              >
                <button
                  aria-label="Increment value"
                  onClick={() => dispatch(increment())}
                >
                  Increment
                </button>{count}
                <DynamicTable
                  tableStyle={{ "width": "500", "height": 500 }}
                  checkboxSelection={false}
                  columns={columns}
                  rows={rows && rows.length > 0 ? rows : []}
                  pageSize={constant.TABLE.DEFAULT_PAGE_SIZE}
                  rowsPerPageOptions={constant.TABLE.DEFAULT_ROWS_PER_PAGE}
                  headerClassName={'super-app-theme--header'}
                />
              </Box>
            </Item>
          </Grid>

        </Grid>
      </Box>


    </>
  )
}
