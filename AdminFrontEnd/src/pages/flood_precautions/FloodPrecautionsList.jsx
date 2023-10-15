import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
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
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import styles from '@/styles/PageTitle.module.css'
import {Link} from 'react-router-dom';
import { ViewFloodPrecautionsList } from "../../components/FloodPrecautionComponents/ViewFloodPrecautionsList";
import EditFloodPrecautions  from "@/components/FloodPrecautionComponents/EditFloodPrecautions";
import { SearchAndFilter } from '../../components/FloodPrecautionComponents/SearchAndFilter';
// End Create new floodPrecautions Modal

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
export default function FloodPrecautionsList() {
  //FloodPrecautions List Refresher
  const [floodPrecautionsRefresh, setFloodPrecautionsRefresh] = React.useState(true);
  //Query//
  const[query, setQuery] = React.useState({limit: 6, offset:0});
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [totalRecords, setTotalRecords] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setQuery((oldValues)=>{
      oldValues.offset = newPage * rowsPerPage
      return oldValues
    })
    setFloodPrecautionsRefresh(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setQuery((oldValues)=>{
      oldValues.offset = 0;
      oldValues.limit = parseInt(event.target.value, 10);
      return oldValues;
    })
    setFloodPrecautionsRefresh(true);
  };

  // Edit FloodPrecautions Model
  const [editFloodPrecautions, setEditFloodPrecautions] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = (floodPrecautions) => {
    setEditFloodPrecautions(floodPrecautions)
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setFloodPrecautionsRefresh(true);
  };
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Flood Precautions List</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Flood Precautions List</li>
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
            Flood Precautions List
          </Typography>
          <Link to = "/flood_precautions/add">
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
              Create New Flood Precautions
            </Button>
          </Link>
          
        </Box>
        <SearchAndFilter setFloodPrecautionsRefresh={setFloodPrecautionsRefresh} offset={page*rowsPerPage} limit = {rowsPerPage} query = {query} setQuery = {setQuery}/>
        <ViewFloodPrecautionsList setTotalRecords={setTotalRecords} floodPrecautionsRefresh={floodPrecautionsRefresh} setFloodPrecautionsRefresh={setFloodPrecautionsRefresh} handleEditOpen={handleEditOpen} query={query} rowsPerPage={rowsPerPage} totalRows={10} />
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
          }}
        >
          <Table>
            {/* View FloodPrecautions */}
                        
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[6, 12, 24, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={totalRecords}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "Precautions Per Page",
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
        /*Update FloodPrecautions*/
      }
      
      <EditFloodPrecautions 
        handleClose={handleEditClose}
        aria-labelledby="customized-dialog-title"
        open={editOpen}
        floodPrecautions={editFloodPrecautions}
        setFloodPrecautions={setEditFloodPrecautions}
      />
    </>
  );
}
