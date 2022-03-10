import axios from "axios";
const key = "AIzaSyCRzUvhuzQkfxmFshgWiBsTZmgPuoQ6NqM";
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
})