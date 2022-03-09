import axios from "axios";
const key = "AIzaSyDB7JtvdNUVjb9kJacT5QzmreJ6Pm8L_CE";
const token = localStorage.getItem('SessionToken');

console.log("Token", token);


export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
})