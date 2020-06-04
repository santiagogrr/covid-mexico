import React from 'react';
import { Paper,  Table, TableBody, TableCell, TableContainer,TableHead, TableRow, withStyles, makeStyles } from '@material-ui/core';

import styles from './Table.module.css';

const TableComponent = () => {

	const useStyles = makeStyles({
		table: {
			minWidth: 650,
		},
	});
	
	const StyledTableCell = withStyles(() => ({
    head: {
      backgroundColor: "rgb(85,85,85)",
			color: "white",
			fontSize: 20
    },
		body: {
			fontSize: 18,
		},
	}))(TableCell);
	
	const StyledTableRow = withStyles((theme) => ({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: theme.palette.action.hover,
			},
		},
	}))(TableRow);

  function createData(department, contactNumber) {
    return { department, contactNumber};
  }

  const rows = [
    createData('Instituto Mexicano del Seguro Social (IMSS)', "800-2222-668"),
		createData('Unidad de Inteligencia Epidemiológica Sanitaria', "800-00-44-800"),
		createData('Instituto de Seguridad y Servicios Sociales de los Trabajadores del Estado (ISSSTE)', "55 4000 1000"),
		createData('Cruz Roja Mexicana', "5557-5757 / 5395-1111"),
		createData('Número Nacional de Emergencias', "911"),

	];
	
	const classes = useStyles();

  return (
    <div>
			<TableContainer component={Paper} className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Department</StyledTableCell>
            <StyledTableCell align="right">Contact Number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.department}>
              <StyledTableCell component="th" scope="row">
                {row.department}
              </StyledTableCell>
              <StyledTableCell align="right">{row.contactNumber}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </div>
  )
};

export default TableComponent;