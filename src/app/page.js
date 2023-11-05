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
} from "@mui/material";
import { Assignment, CameraEnhance } from "@mui/icons-material";
import { useRouter, useParams } from "next/navigation";
import { useAtom } from "jotai";
import { AllUserData } from "./storing/userData";

export default function Home() {
  const webcamRef = useRef(null);
  const router = useRouter();
  const [data, setData] = useAtom(AllUserData);

  const cameraPage = () => {
    router.push("/camera");
  };

  const statusPage = () => {
    router.push("/status");
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
            onClick={cameraPage}
            color="primary"
          >
            <Typography>Scan a Barcode</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            startIcon={<Assignment />}
            variant="outlined"
            onClick={statusPage}
            color="primary"
          >
            Check Status
          </Button>
        </Grid>
      </Grid>
    </main>
  );
}
