import React from "react";
import { RecordingContext } from "../../contexts/RecordingProvider";
import { VideoThumbnailProps, RecordingListProps } from "./RecordingList.types";

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  recording,
  onClick,
}) => {
  const [previewImage, setPreviewImage] = React.useState(
    recording.playback_ids[0].thumbnail_url
  );

  const setPreviewImageGif = () => {
    setPreviewImage(recording.playback_ids[0].preview_gif_url);
  };

  const setPreviewImageThumbnail = () => {
    setPreviewImage(recording.playback_ids[0].thumbnail_url);
  };
  return (
    <button
      className="max-w-xs m-1"
      onMouseEnter={setPreviewImageGif}
      onMouseLeave={setPreviewImageThumbnail}
      onClick={() => onClick(recording)}
    >
      <img
        className="object-contain"
        src={previewImage}
        alt="Recording Thumbnail"
      />
    </button>
  );
};

export const RecordingList: React.FC<RecordingListProps> = ({
  onClickRecording,
}) => {
  const { recordings } = React.useContext(RecordingContext);

  return (
    <div className="flex flex-wrap justify-center">
      {recordings.map((recording) => (
        <VideoThumbnail recording={recording} onClick={onClickRecording} />
      ))}
    </div>
  );
};
