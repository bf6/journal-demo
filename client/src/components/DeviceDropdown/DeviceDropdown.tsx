import React from "react";
import { DeviceDropdownProps } from "./DeviceDropdown.types";

export const DeviceDropdown: React.FC<DeviceDropdownProps> = ({
  onChange,
  name,
  devices,
}) => (
  <select
    onChange={onChange}
    className="bg-gray-500 text-white m-0.5"
    name={name}
  >
    {devices.map((device) => (
      <option key={device.deviceId} value={device.deviceId}>
        {device.label}
      </option>
    ))}
  </select>
);
