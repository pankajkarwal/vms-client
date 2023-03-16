import React, { useEffect, useState } from 'react'
import { addVisitor, getVisitors } from '../services/VisitorService'
import { DynamicTable } from '@opensource/bit-scope.dynamic-table'
import { VisitorForm } from '../components/CreateVisitor';
import constant from '../utils/constant';
import { Link, NavLink, Outlet, redirect, useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import Toast from '../utils/Toast';
import { formatRoute } from 'react-router-named-routes'
import ConfirmDialog from '../utils/ConfirmDialog';
import DeleteIcon from '@mui/icons-material/Delete';


export default function VisitorList() {
  const [rows, setRows] = useState([])
  let dialogOpen = false;
  const [id, setId] = useState(0);
  const [openBox,setOpenBox] = useState(false);
  const [openPopup, setOpenPopup] = useState(false)
  const [clickedRow, setClickedRow] = React.useState();
  const onDelete = (visitorId) => {
    
   // Call the api for deleting the visitor record from the database
    console.log("VIsitor Id",visitorId)
  };
  const navigate = useNavigate();

  const editPage = (visitorId) => {
    navigate(formatRoute(constant.APP_ROUTES.EDIT_VISITOR, { id: visitorId }));
  }

  const addPage = () => {
    navigate(constant.APP_ROUTES.ADD_VISITOR);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'contactNo', headerName: 'Contact No', width: 100 },
    { field: 'created_at', headerName: 'Created On', width: 200 },
    {
      field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(e) => editPage(params.row._id)}
              variant="contained"
              color="success"
            >
              Edit
            </Button>

            &nbsp;&nbsp;
            <div>
              <IconButton aria-label="delete" onClick={() => setOpenBox(true)}>
                <DeleteIcon />
              </IconButton>
              <ConfirmDialog
                title={constant.MODELS.VISITOR.DELETE_HEADER}
                open={openBox}
                setOpen={setOpenBox}
                onConfirm={(e) => onDelete(e,params.row._id)}
              >
                {constant.MODELS.VISITOR.DELETE_TEXT}
              </ConfirmDialog>
            </div>

          </>
        );
      }
    }
  ]
  useEffect(() => {
    getVisitors().then((res) => {
      const filteredData = res && res.data && res.data.data && res.data.data.length > 0 && res.data.data.map((item, i) => {
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
  const handlePopup = (val) => {
    setOpenPopup(val)
  }
  return (
    <>
      <button onClick={addPage} >Add Visitor</button>
      <button onClick={() => { dialogOpen = true }} >Open Dialog</button>
      <DynamicTable tableHeader={"Visitor List"} checkboxSelection={false} columns={columns} rows={rows && rows.length > 0 ? rows : []} pageSize={5} rowsPerPageOptions={5} />
      {/* <ConfirmDialog title="Delete Confirmation" open={true} />

     */}

    </>
  )
}
