export type DeviceList = {
  video: MediaDeviceInfo[];
  audio: MediaDeviceInfo[];
};

export enum VideoRecorderState {
  REQUESTING_PERMISSION,
  INITIALIZED,
  RECORDING,
  REVIEWING,
}
