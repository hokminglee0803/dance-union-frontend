import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function CourseTable({ pageData }) {
    return (
        <TableContainer component={Paper} >
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell></StyledTableCell>
                        {
                            pageData.map(item => {
                                return (
                                    <StyledTableCell colSpan={2} align="center">
                                        {item.title}
                                    </StyledTableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="center">
                            年齡
                        </StyledTableCell>
                        {
                            pageData.map(item => {
                                return (
                                    <StyledTableCell colSpan={2} align="center">
                                        <div dangerouslySetInnerHTML={{ __html: item?.age }} />
                                    </StyledTableCell>
                                )
                            })
                        }
                    </StyledTableRow>

                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="center">
                            課堂
                        </StyledTableCell>
                        {
                            pageData.map(item => {
                                return (
                                    <StyledTableCell colSpan={2} align="center">
                                        <div dangerouslySetInnerHTML={{ __html: item?.course }} />
                                    </StyledTableCell>
                                )
                            })
                        }
                    </StyledTableRow>

                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            演出相關
                        </StyledTableCell>
                        {
                            pageData.map(item => {
                                return (
                                    <StyledTableCell colSpan={2} align="center">
                                        <div dangerouslySetInnerHTML={{ __html: item?.show }} />
                                    </StyledTableCell>
                                )
                            })
                        }
                    </StyledTableRow>

                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row" align="center">
                            師資
                        </StyledTableCell>
                        {
                            pageData.map(item => {
                                return (
                                    <StyledTableCell colSpan={2} align="center">
                                        <div dangerouslySetInnerHTML={{ __html: item?.exam }} />
                                    </StyledTableCell>
                                )
                            })
                        }
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}