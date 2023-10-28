"use client";

import React, { useState, useRef, useContext, use } from "react";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { useAtom } from "jotai";
import { AllUserData } from "../storing/userData";
import { v4 } from "uuid";

function Camera() {
  const webcamRef = useRef(null);
  const qrReaderRef = useRef(null);
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
      webcamRef.current.getTracks().forEach((track) => track.stop());
      webcamRef.current = null;
      setShowCamera(false);
    }
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

  return (
    <div>
      <h1>Camera Page</h1>
      <Grid item xs={12}>
        {showCamera && (
          <QrReader
            ref={qrReaderRef} // Assign the ref to QrReader
            onResult={(result, error) => {
              console.log("cek " + result?.text + " error " + error);

              if (!!result) {
                stopCamera();
                convertObject(result?.text);
                qrReaderRef.current.stop();
              }
            }}
            //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
            // open the front camera
            constraints={{ facingMode: "environment" }}
            style={{ width: "40%", height: "40%" }}
          />
        )}
      </Grid>
    </div>
  );
}
export default Camera;
