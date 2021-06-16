import React from "react";
import { RecordingProvider } from "../contexts/RecordingProvider";
import { VideoRecorder } from "../components/VideoRecorder/VideoRecorder";
import { RecordingList } from "../components/RecordingList/RecordingList";
import { RecordingType } from "../components/RecordingList/RecordingList.types";
import { VideoPlayer } from "../components/VideoPlayer/VideoPlayer";

export const Home: React.FC = () => {
  const [
    selectedRecording,
    setSelectedRecording,
  ] = React.useState<RecordingType>(null);

  const handleClickRecording = (recording) => {
    setSelectedRecording(recording);
  };

  const handleClickNewRecording = () => {
    setSelectedRecording(null);
  };

  const renderVideoElement = () => {
    if (selectedRecording === null) {
      return <VideoRecorder />;
    }
    return <VideoPlayer recording={selectedRecording} />;
  };

  return (
    <RecordingProvider>
      <div className="flex flex-col items-center p-5">
        <div className="mb-10 w-96">{renderVideoElement()}</div>
        <button
          className="bg-red-500 text-white font-thin text-xl p-3 rounded-xl mb-5"
          onClick={handleClickNewRecording}
          disabled={selectedRecording === null}
        >
          Record new entry
        </button>
      </div>
      <RecordingList onClickRecording={handleClickRecording} />
    </RecordingProvider>
  );
};
