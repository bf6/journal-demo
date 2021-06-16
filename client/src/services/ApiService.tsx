const API_URL = "http://localhost:8000";

export const getMuxUploadUrl = async () => {
  try {
    let resp = await fetch(API_URL + "/mux/upload-url/");
    if (resp.ok) {
      return await resp.json();
    }
    throw new Error(await resp.json());
  } catch (e) {
    console.error(e);
  }
};

export const listMuxAssets = async () => {
  try {
    let resp = await fetch(API_URL + "/mux/assets/");
    if (resp.ok) {
      return await resp.json();
    }
    throw new Error(await resp.json());
  } catch (e) {
    console.error(e);
  }
};
