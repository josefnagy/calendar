import axios from "axios";

const KEY = "AIzaSyDVEmKeHryShoAlFPfYlk3gLZ87661nCSE";

export default axios.create({
  baseURL:
    "https://calendar-jb007c-default-rtdb.europe-west1.firebasedatabase.app",
  params: {
    key: KEY,
  },
});
