import * as React from "react";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { ViewUserList } from "../../components/UserComponents/ViewUserList";
import EditUser from "@/components/UserComponents/EditUser";
import { SearchAndFilter } from '../../components/UserComponents/SearchAndFilter';
// End Create new user Modal

function MembersLists(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

MembersLists.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UsersList() {
  //User List Refresher
  const [usersRefresh, setUsersRefresh] = React.useState(true);
  //Query//
  const[query, setQuery] = React.useState({limit: 10, offset:0});
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRecords, setTotalRecords] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setQuery((oldValues)=>{
      oldValues.offset = newPage * rowsPerPage
      return oldValues
    })
    setUsersRefresh(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setQuery((oldValues)=>{
      oldValues.offset = 0;
      oldValues.limit = parseInt(event.target.value, 10);
      return oldValues;
    })
    setUsersRefresh(true);
  };

  // Edit User Model
  const [editUser, setEditUser] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = (user) => {
    setEditUser(user)
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setUsersRefresh(true);
  };
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Users List</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Users List</li>
        </ul>
      </div>

      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 20px 15px",
          mb: "15px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #EEF0F7",
            paddingBottom: "10px",
            mb: "20px",
          }}
          className="for-dark-bottom-border"
        >
          <Typography
            as="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            Users List
          </Typography>
          <Link to = "/users/add">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                borderRadius: "8px",
                fontWeight: "500",
                fontSize: "13px",
                padding: "12px 20px",
                color: "#fff !important",
              }}
            >
              <AddIcon
                sx={{ position: "relative", top: "-1px" }}
                className='mr-5px'
              />{" "}
              Create New User
            </Button>
          </Link>
          
        </Box>
        <SearchAndFilter setUsersRefresh={setUsersRefresh} offset={page*rowsPerPage} limit = {rowsPerPage} query = {query} setQuery = {setQuery}/>
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table 
            sx={{ minWidth: 850 }} 
            aria-label="custom pagination table"
            className="dark-table"
          >
            {/* View Users */}
            <ViewUserList setTotalRecords={setTotalRecords} usersRefresh={usersRefresh} setUsersRefresh={setUsersRefresh} handleEditOpen={handleEditOpen} query={query} rowsPerPage={rowsPerPage} totalRows={totalRecords} />

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={totalRecords}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={MembersLists}
                  style={{ borderBottom: "none" }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
      
      {
        /*Update User*/
      }
      
      <EditUser
        handleClose={handleEditClose}
        aria-labelledby="customized-dialog-title"
        open={editOpen}
        user={editUser}
        setUser={setEditUser}
      />
    </>
  );
}
