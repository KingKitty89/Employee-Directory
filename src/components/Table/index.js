import React, { Component } from 'react';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from "../AppBar";
import API from "../../utils/API";
import Results from "../Results";


const styles = () =>
  createStyles({

  table: {
    minWidth: 650,
  },
});
class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: "",
      searchBy: "fullName",
    };
  }
  
  componentDidMount() {
    API.getUsers()
      .then((res) => {
        
        const tableData = res.data.results.map((user) => ({
          ...user,
          thumbnail: user.picture.thumbnail,
          fullName: user.name.first + " " + user.name.last,
          phone: user.phone,
          email: user.email,
        }));
        this.setState({ users: tableData }, () => console.log(this.state));
      })
      .catch((err) => console.log(err));
  }

  handleInputChange = (event) => {
    // Getting the value and name of the input
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState(
      {
        [name]: value,
      },
      () => console.log(this.state)
    );
  };

  render() {
    const { classes } = this.props;

  return (
    <TableContainer component={Paper}>
      <AppBar 
         search={this.state.search}
         handleInputChange={this.handleInputChange}
         />
       
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
            
            Image</TableCell>
            <TableCell align="center">
            
            Full Name</TableCell>
            <TableCell align="center">
            
            Phone</TableCell>
            <TableCell align="center">
            
            Email
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* filtering through users to search by full name */}
            {this.state.users
          
              .map((user, i) => (
                <Results
                  key={i}
                  thumbnail={user.picture.thumbnail}
                  fullName={user.fullName}
                  phone={user.phone}
                  email={user.email}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    );
  }
}

export default withStyles(styles)(UsersTable);