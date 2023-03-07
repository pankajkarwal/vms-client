import React,{useEffect, useState} from 'react'
import {getVisitors} from '../services/VisitorService'
import {DynamicTable} from '@opensource/bit-scope.dynamic-table'
import { CreateVisitor } from '../components/CreateVisitor';
import constant from '../utils/constant';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function VisitorList() {
  const [rows,setRows] = useState([])
  const [clickedRow, setClickedRow] = React.useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };
  const navigate = useNavigate();

  const handleClick = () => {
       navigate({'pathname':constant.APP_ROUTES.EDIT_VISITOR});
  }

  const columns =[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name',width:200 },
    { field: 'address', headerName: 'Address',width:300 },
    { field: 'contactNo', headerName: 'Contact No',width:100},
    { field: 'created_at', headerName: 'Created On',width:200},
    { field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
      return (
        <>
        {/* <button onClick={handleClick}>Edit</button> */}
        {/* <NavLink exact={true} to={constant.APP_ROUTES.EDIT_VISITOR} >Edit</NavLink> */}
    <Link to={constant.APP_ROUTES.EDIT_VISITOR}>Edit</Link>
        &nbsp;&nbsp;
        <Button
          onClick={(e) => onButtonClick(e, params.row)}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        </>
      );
    } }
  ]
    useEffect(()=>{
        getVisitors().then((res)=> {
            const filteredData = res && res.data && res.data.data && res.data.data.length>0 && res.data.data.map((item,i) => {
                return {
                  ...item,
                  id: i + 1                 
                }
            });
            
            setRows(filteredData)
        })
    },[])
  return (
    <>
    <div>VisitorList</div>
    <CreateVisitor />
    <DynamicTable columns={columns} rows={rows && rows.length>0 ? rows : []} pageSize={5} rowsPerPageOptions={5} />
    </>
  )
}
