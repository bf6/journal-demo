export type MuxPlaybackIdType = {
  id: string;
  policy: string;
  thumbnail_url: string;
  preview_gif_url: string;
  playback_url: string;
};

export type RecordingType = {
  created_at: string;
  duration: number;
  id: string;
  playback_ids: Array<MuxPlaybackIdType>;
};

export type VideoThumbnailProps = {
  recording: RecordingType;
  onClick: any;
};

export type RecordingListProps = {
  onClickRecording: any;
};
