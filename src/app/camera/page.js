"use client";

import React, { useState, useRef, useContext, use } from "react";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { AllUserData } from "../storing/userData";
import { v4 } from "uuid";
import { debounce } from "lodash";
import { ArrowBack } from "@mui/icons-material";
import { Html5Qrcode } from "html5-qrcode";

function Camera() {
  const webcamRef = useRef(null);
  const qrCodeRef = useRef(null);
  const router = useRouter();
  const [data, setData] = useAtom(AllUserData);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      webcamRef.current = stream;
      qrCodeRef.current = new Html5Qrcode("qr-code-reader");
      qrCodeRef.current.start(
        { facingMode: { exact: "environment" } },
        config,
        qrCodeSuccessCallback
      );
    } catch (error) {
      console.log("Error accessing camera");
    }
  };

  const qrCodeSuccessCallback = (decodedText) => {
    console.log("Decoded QR code:", decodedText);
    handleResult(decodedText);
  };
  const config = { fps: 10, qrbox: { width: 1000, height: 1000 } };

  useEffect(() => {
    startCamera();
  }, []);

  const stopCamera = () => {
    qrCodeRef.current
      .stop()
      .then((ignore) => {
        // QR Code scanning is stopped.
      })
      .catch((err) => {
        // Stop failed, handle it.
      });
    webcamRef.current = null;
    router.push("/");
  };

  const backHome = () => {
    stopCamera();
    router.push("/");
  };

  const convertObject = (value) => {
    const temp = JSON.parse(value);
    const currDate = Date.now();
    console.log("🚀 ~ file: page.js:56 ~ convertObject ~ temp:", temp.user);
    data.push({
      user: temp.user,
      issuedAt: currDate,
      id: v4(),
    });
    setData(data);
  };

  const handleResult = (value) => {
    convertObject(value);
    stopCamera();
  };

  return (
    <div>
      <Grid item xs={12}>
        Camera Page
      </Grid>
      <Grid item xs={12}>
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          onClick={backHome}
          color="warning"
        >
          Back To Home
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box id="qr-code-reader" />
      </Grid>
    </div>
  );
}

export default Camera;
