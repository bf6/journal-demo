import React from "react";
import * as UpChunk from "@mux/upchunk";
import { getMuxUploadUrl, listMuxAssets } from "../services/ApiService";

const RecordingContext = React.createContext({
  recordings: null,
  uploadVideo: (video: File) => {},
});

const RecordingProvider = ({ children }) => {
  const refreshAssets = async () => {
    let resp = await listMuxAssets();
    updateRecordingContext((prevContext) => ({
      ...prevContext,
      recordings: resp.data,
    }));
  };

  const getUploadUrl = async () => {
    let resp = await getMuxUploadUrl();
    return resp.url;
  };

  const uploadVideo = async (file: File) => {
    UpChunk.createUpload({
      endpoint: getUploadUrl,
      file,
      chunkSize: 5120,
    });
  };
  const initialContext = {
    recordings: [],
    uploadVideo,
  };

  const [recordingContext, updateRecordingContext] = React.useState(
    initialContext
  );

  React.useEffect(() => {
    refreshAssets();
  }, []);

  return (
    <RecordingContext.Provider value={recordingContext}>
      {children}
    </RecordingContext.Provider>
  );
};

export { RecordingProvider, RecordingContext };
