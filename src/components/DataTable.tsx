import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Column, LaunchData } from "../interfaces";
import fetchData from '../services/cloud';
import Modal from '@mui/material/Modal';
import DataModal from './DataModal';


const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'date_utc', label: 'Launch\u00a0Date', minWidth: 100 },
  {
    id: 'rocket',
    label: 'Rocket\u00a0ID',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'details',
    label: 'Details',
    minWidth: 170,
    maxWidth: 210,
    align: 'left',
  },
];


export default function DataTable() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<LaunchData[]>()
  const [open, setOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalData, setModalData] = useState<LaunchData>();


  const handleOpen = (data: LaunchData) => {
    setOpen(true)
    setModalData(data)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const init = () => {
    console.log("Initializing app...")
    fetchData()
      .catch((e) => {
        setErrorMessage("Error loading data") // show notification.
      })
      .then((res) => {
        setData(res as LaunchData[]);
      })
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 880 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {errorMessage && errorMessage !== "" &&
              <TableRow>
                <TableCell colSpan={4}>
                  {errorMessage}
                </TableCell>
              </TableRow>
            }
            {data && data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick={() => handleOpen(row)} style={{ cursor: 'pointer' }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value ? value : 'N/A'}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {modalData &&
            <DataModal
              data={modalData} />}
        </>
      </Modal>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data ? data.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(ev, newPage) => setPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}