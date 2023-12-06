import * as React from "react";
import { Box, CardContent, Grid, Hidden, Typography } from "@mui/material";
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
import { ViewFloodList } from "../../components/FloodComponents/ViewFloodList";
import EditFlood from "@/components/FloodComponents/EditFlood";
import { SearchAndFilter } from '../../components/FloodComponents/SearchAndFilter';
import DistrictCities from "../../components/FloodComponents/DistrictCities";
// End Create new flood Modal

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

export default function FloodsListPage() {
  const [selectedFlood, setSelectedFlood] = React.useState(null) 
  //Flood List Refresher
  const [floodsRefresh, setFloodsRefresh] = React.useState(true);
  //Query//
  const[query, setQuery] = React.useState({limit: 10, offset:0});
  // Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalRecords, setTotalRecords] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setQuery((oldValues)=>{
      oldValues.offset = newPage * rowsPerPage
      return oldValues
    })
    setFloodsRefresh(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setQuery((oldValues)=>{
      oldValues.offset = 0;
      oldValues.limit = parseInt(event.target.value, 10);
      return oldValues;
    })
    setFloodsRefresh(true);
  };

  // Edit Flood Model
  const [editFlood, setEditFlood] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  function getDate(dateString){
    const dateObject = new Date(dateString);

    const month = dateObject.toLocaleString('en-US', { month: 'short' });
    const year = dateObject.getFullYear();

    return month + "-" + year
  }
  const handleEditOpen = (flood) => {
    setEditFlood(flood)
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setFloodsRefresh(true);
  };
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Floods List</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>Floods List</li>
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
            Floods List
          </Typography>
          <Link to = "/floods/add">
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
              Add Flood
            </Button>
          </Link>
          
        </Box>
        <Grid container alignItems="center" justifyContent="center" spacing={3}>
          <Grid item xs = {12} md = {8}>
            <DistrictCities cities = {selectedFlood?selectedFlood.districts:[]}/>
          </Grid>
          <Grid item xs = {12} md ={4}>
            <Hidden mdUp>
              <Card >
                  here
              </Card>
            </Hidden>
            <Hidden mdDown>
              <Card
                style={{
                  height: '400px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <CardContent sx={{padding: 0}}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: '500',
                      textAlign: 'center',
                      backgroundColor: '#2196F3', // Blue background
                      color: '#FFFFFF', // White text
                      padding: '15px',
                      borderRadius: '8px 8px 0 0', // Rounded corners at the top
                      marginBottom: '10px',
                    }}
                  >
                    Flood Details
                  </Typography>
                  <div style={{ marginBottom: '20px', padding: '14px' }}>
                    {/* Additional styling for city information */}
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>Flood Date:</strong> {selectedFlood?getDate(selectedFlood.date):""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>Flooded Cities:</strong> {selectedFlood?selectedFlood.districts.length:""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>People Affected:</strong> -
                    </Typography>

                    {/* Styling for the nearby cities list */}
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '8px' }}>
                      <strong>Affected Cities:</strong>
                    </Typography>
                    <ul style={{ maxHeight: '100px', overflowY: 'auto', padding: 0, marginBottom: '20px' }}>
                      {(selectedFlood?selectedFlood.districts:[]).map((city, index) => (
                        <li key={index}>{city}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Add more content or customize styles based on your needs */}
                </CardContent>
              </Card>
            </Hidden>
          </Grid>
          
          <Grid item xs = {12}>
            <SearchAndFilter setFloodsRefresh={setFloodsRefresh} offset={page*rowsPerPage} limit = {rowsPerPage} query = {query} setQuery = {setQuery}/>
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
                {/* View Floods */}
                <ViewFloodList setSelectedFlood={setSelectedFlood} setTotalRecords={setTotalRecords} floodsRefresh={floodsRefresh} setFloodsRefresh={setFloodsRefresh} handleEditOpen={handleEditOpen} query={query} rowsPerPage={rowsPerPage} totalRows={10} />

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
          </Grid>
        </Grid>
      </Card>
      
      {
        /*Update Flood*/
      }
      
      <EditFlood
        handleClose={handleEditClose}
        aria-labelledby="customized-dialog-title"
        open={editOpen}
        flood={editFlood}
        setFlood={setEditFlood}
      />
    </>
  );
}
