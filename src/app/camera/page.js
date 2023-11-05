"use client";

import React, { useState, useRef, useContext, use } from "react";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useAtom } from "jotai";
import { AllUserData } from "../storing/userData";
import { v4 } from "uuid";
import { debounce } from "lodash";
import { ArrowBack } from "@mui/icons-material";

function Camera() {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const router = useRouter();
  const [data, setData] = useAtom(AllUserData);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      webcamRef.current = stream; // Assign the stream to the video element
      setShowCamera(true);
    } catch (error) {
      console.log("Error accessing camera");
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  const stopCamera = () => {
    if (webcamRef.current && showCamera) {
      webcamRef.current.getTracks().forEach(function (track) {
        track.stop();
        track.enabled = false;
      });
      webcamRef.current = null;
      setShowCamera(false);
    }
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

  const handleResult = (result, error) => {
    if (!!showCamera) {
      console.log("cek " + result?.text + " error " + error);

      if (!!result) {
        convertObject(result?.text);
        stopCamera();
      }
    }
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
        {showCamera && (
          <QrReader
            ref={webcamRef}
            onResult={handleResult}
            constraints={{ facingMode: "user" }}
            style={{ width: "40%", height: "40%" }}
          />
        )}
      </Grid>
    </div>
  );
}
export default Camera;
