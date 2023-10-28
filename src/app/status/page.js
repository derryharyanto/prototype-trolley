"use client";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useState, useContext, use } from "react";
import { AllUserData } from "../storing/userData";
import { ArrowBack, DeleteForever } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function ShowUser() {
  const [data, setData] = useAtom(AllUserData);
  const router = useRouter();

  const backToHome = () => {
    router.push("/");
  };

  const deleteUser = (uuid) => {
    const newArray = data.filter((data) => data.id !== uuid);
    setData(newArray);
  };

  const convertToUTC = (param) => {
    const utcFormat = new Date(param);
    const options = {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = utcFormat.toLocaleString("in-ID", options);
    return formattedDate;
  };

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Issued At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.user}</TableCell>

                <TableCell>{convertToUTC(data.issuedAt)}</TableCell>
                <TableCell>
                  {console.log("check skg ", Date.now())}
                  {console.log("check tadi ", data.issuedAt)}
                  {Date.now() - 1200000 < data.issuedAt
                    ? "IN PROGESS"
                    : "OVEDUE"}
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<DeleteForever />}
                    variant="outlined"
                    onClick={deleteUser(data.id)}
                    color="error"
                  >
                    Finish Borrow
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        startIcon={<ArrowBack />}
        variant="outlined"
        onClick={backToHome}
        color="warning"
      >
        Back To Home
      </Button>
    </Grid>
  );
}
export default ShowUser;
