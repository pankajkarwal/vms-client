import React, { useEffect, useState } from 'react'
import * as apiServices from '../../services/UserService'
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


export default function UserList() {
  const [rows, setRows] = useState([])
  const [vId, setVId] = useState(0);
  const [openBox, setOpenBox] = useState(false);
  const navigate = useNavigate();

  const onDelete = (e) => {
    e.stopPropagation()
    // Call the api for deleting the visitor record from the database
    apiServices.deleteUser(vId).then((res) => {
      if (res && res.data) {
        navigate(0);
        Toast(constant.SUCCESS.USER.DELETED_USER, 'success')
      }
    }).catch((error) => {
      Toast(error && error.data && error.data.error ? error.data.error : constant.ERRORS.DEFAULT_ERROR, 'error')
    })

  };

  const editPage = (userId) => {
    navigate(formatRoute(constant.APP_ROUTES.USER.EDIT_USER, { id: userId }));
  }

  const addPage = () => {
    navigate(constant.APP_ROUTES.USER.ADD_USER);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'super-app-theme--header' },
    { field: 'first_name', headerName: 'First Name', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'last_name', headerName: 'Last Name', width: 150, headerClassName: 'super-app-theme--header' },
    { field: 'email', headerName: 'Email', width: 250, headerClassName: 'super-app-theme--header' },
    { field: 'created_at', headerName: 'Date of Creation', width: 300, headerClassName: 'super-app-theme--header' },
    {
      field: 'actions', headerName: 'Actions', width: 470, headerClassName: 'super-app-theme--header', renderCell: (params) => {
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
                title={constant.MODELS.USER.DELETE_HEADER}
                open={openBox}
                setOpen={setOpenBox}
                onConfirm={onDelete}
              >
                {constant.MODELS.USER.DELETE_TEXT}
              </ConfirmDialog>
            </div>

          </>
        );
      }
    }
  ]
  useEffect(() => {
    // Component did Mount
    apiServices.getUsers().then((res) => {
      const filteredData = res && res.data && res.data.data && res.data.data.length > 0 && res.data.data.map((item, i) => {
        if(item.created_at){
          item.created_at = DateConversion(item.created_at,'MMMM Do YYYY, h:mm:ss a')
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item></Item>
        <h4><Item>{constant.PAGES.USER.LIST_PAGE_CAPTION}</Item></h4>
        <Item> <Button variant="contained" onClick={addPage} >{constant.LABEL_CONSTANTS.USER.BTN_ADD_USER}</Button></Item>
      </Box>

      <Box
        sx={{
          '& .super-app-theme--header': {
            backgroundColor: '#3f51b5',
            color: 'white'
          },
        }}
      >
        <DynamicTable
          tableStyle={{ height: 600, width: '1000' }}
          checkboxSelection={false}
          columns={columns}
          rows={rows && rows.length > 0 ? rows : []}
          pageSize={constant.TABLE.DEFAULT_PAGE_SIZE}
          rowsPerPageOptions={constant.TABLE.DEFAULT_ROWS_PER_PAGE}
          headerClassName={'super-app-theme--header'}
        />


      </Box>



    </>
  )
}
