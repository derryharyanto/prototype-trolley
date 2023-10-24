"use client";
import React, { useState, useRef, useContext } from "react";
import Webcam from "react-webcam";

import Image from "next/image";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  TextField,
  Typography,
  Divider,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { CameraEnhance } from "@mui/icons-material";
import { QrReader } from "react-qr-reader";
import { useRouter, useParams } from "next/navigation";
import { useAtom } from "jotai";
import { AllUserData } from "./storing/userData";

export default function Home() {
  const webcamRef = useRef(null);
  const router = useRouter();
  const [data, setData] = useAtom(AllUserData);

  const toggleCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      webcamRef.current = stream;
      // Access granted, so show the camera stream.
      setShowCamera(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const nextPage = () => {
    router.push("/camera");
  };

  const stopCamera = () => {
    webcamRef.current.getTracks().forEach((track) => track.stop());
    webcamRef.current = null;
    setShowCamera(false);
  };

  return (
    <main>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="bold">
            Trolley System
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            startIcon={<CameraEnhance />}
            variant="outlined"
            onClick={nextPage}
            color="primary"
          >
            <Typography>Scan a Barcode</Typography>
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography>All Rented User</Typography>
          <Grid item xs={12}>
            {data}
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
