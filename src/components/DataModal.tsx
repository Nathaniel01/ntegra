import { Card, CardContent, Typography, CardHeader, Table, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react'
import { LaunchData } from '../interfaces';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
};



const DataModal = ({ data: { name, date_utc, rocket, details, success, launchpad } }: { data: LaunchData }) => {

    return (
        <Card sx={style}>
            <CardHeader title={name}>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography>
                                    Date:
                                </Typography>
                            </TableCell>
                            <TableCell colSpan={4}> <>{date_utc}</></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography>
                                    Rocket ID:
                                </Typography>
                            </TableCell>
                            <TableCell colSpan={4}> {rocket}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography>
                                    Success:
                                </Typography>
                            </TableCell>
                            <TableCell colSpan={4}> {success.toString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography>
                                    Launchpad ID:
                                </Typography>
                            </TableCell>
                            <TableCell colSpan={4}> {launchpad}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Typography>
                                    Details:
                                </Typography>
                            </TableCell>
                            <TableCell colSpan={4}> {details ? details : "N/A"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default DataModal