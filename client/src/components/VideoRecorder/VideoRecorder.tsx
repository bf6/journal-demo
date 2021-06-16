import React from "react";
import { DeviceList, VideoRecorderState } from "./VideoRecorder.types";
import { RecordingContext } from "../../contexts/RecordingProvider";
import { RecorderButton } from "../RecorderButton/RecorderButton";
import { DeviceDropdown } from "../DeviceDropdown/DeviceDropdown";

export const VideoRecorder: React.FC = () => {
  const { uploadVideo } = React.useContext(RecordingContext);
  const [
    availableDevices,
    setAvailableDevices,
  ] = React.useState<DeviceList | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const recorderRef = React.useRef<MediaRecorder | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const videoSegments = React.useRef<Blob[]>([]);
  const recordedVideo = React.useRef<Blob | null>(null);
  const [videoDeviceId, setVideoDeviceId] = React.useState<string>(null);
  const [audioDeviceId, setAudioDeviceId] = React.useState<string>(null);
  const [recorderState, setRecorderState] = React.useState<VideoRecorderState>(
    VideoRecorderState.REQUESTING_PERMISSION
  );

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const list: DeviceList = { video: [], audio: [] };

    devices.forEach((device) => {
      if (device.kind === "videoinput") {
        list.video.push(device);
      }
      if (device.kind === "audioinput") {
        list.audio.push(device);
      }
    });
    setAvailableDevices({ ...list });
  };

  const onChangeVideo = (e) => {
    setVideoDeviceId(e.target.value);
  };

  const onChangeAudio = (e) => {
    setAudioDeviceId(e.target.value);
  };

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoDeviceId ? { deviceId: videoDeviceId } : true,
        audio: audioDeviceId ? { deviceId: audioDeviceId } : true,
      });
      streamRef.current = stream;
      (videoRef.current as HTMLVideoElement).srcObject = stream;
      videoRef.current.muted = true;
      videoRef.current.controls = false;
      setRecorderState(VideoRecorderState.INITIALIZED);
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const startCamera = async () => {
    try {
      await getDevices();
      startStream().then(async () => {
        await getDevices();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const startRecording = async () => {
    recorderRef.current = new MediaRecorder(streamRef.current, {
      mimeType: "video/webm;codecs=vp8,opus",
    });
    recorderRef.current.ondataavailable = (e) => {
      videoSegments.current.push(e.data);
    };
    recorderRef.current.start();
    setRecorderState(VideoRecorderState.RECORDING);
  };

  const stopRecording = async () => {
    recorderRef.current.onstop = () => {
      recordedVideo.current = new Blob(videoSegments.current, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(recordedVideo.current);
      videoRef.current.srcObject = null;
      videoRef.current.src = url;
      videoRef.current.controls = true;
      videoRef.current.muted = false;
    };
    recorderRef.current.stop();
    setRecorderState(VideoRecorderState.REVIEWING);
  };

  const discardRecording = async () => {
    videoSegments.current = [];
    recordedVideo.current = null;
    startCamera();
    setRecorderState(VideoRecorderState.INITIALIZED);
  };

  const submitRecording = async () => {
    const videoFile = new File([recordedVideo.current], "recording", {
      type: recordedVideo.current.type,
    });
    uploadVideo(videoFile);
    discardRecording();
  };

  const displayAudioDropdown = () =>
    availableDevices.audio.length > 0 && availableDevices.audio[0].label;

  const displayVideoDropdown = () =>
    availableDevices.video.length > 0 && availableDevices.video[0].label;

  React.useEffect(() => {
    startCamera();
  }, []);

  const isLoaded = () =>
    availableDevices?.audio.length > 0 || availableDevices?.video.length > 0;

  return (
    isLoaded() && (
      <div className="relative flex flex-col min-h-96 justify-center">
        <>
          <video autoPlay muted ref={videoRef} />
          {recorderState === VideoRecorderState.RECORDING && (
            <div className="w-12 h-12 rounded-full bg-red-500 animate-pulse bg-black absolute top-0 right-0 m-2" />
          )}
          <div className="flex flex-col mb-5">
            {displayAudioDropdown() && (
              <DeviceDropdown
                name="Audio Devices"
                onChange={onChangeAudio}
                devices={availableDevices.audio}
              />
            )}
            {displayVideoDropdown() && (
              <DeviceDropdown
                name="Video Devices"
                onChange={onChangeVideo}
                devices={availableDevices.video}
              />
            )}
          </div>
          {recorderState === VideoRecorderState.INITIALIZED && (
            <RecorderButton
              onClick={startRecording}
              color="green"
              label="Start recording"
            />
          )}
          {recorderState === VideoRecorderState.RECORDING && (
            <RecorderButton
              onClick={stopRecording}
              color="red"
              label="Stop recording"
            />
          )}
          {recorderState === VideoRecorderState.REVIEWING && (
            <>
              <RecorderButton
                onClick={submitRecording}
                color="blue"
                label="Submit recording"
              />
              <RecorderButton
                onClick={discardRecording}
                color="gray"
                label="Discard recording"
              />
            </>
          )}
        </>
      </div>
    )
  );
};
