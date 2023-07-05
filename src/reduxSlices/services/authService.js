import axios from 'axios'

const API_URI = 'http://localhost:5000/api'

const register = async(userData)=>{
const response = await axios.post(API_URI + '/register',userData)
if (response.data){
localStorage.setItem('user',JSON.stringify(response.data))
}

return response.data;

}
const login = async(userData)=>{
const response = await axios.post(API_URI + '/login',userData)
if (response.data){
localStorage.setItem('user',JSON.stringify(response.data))
}

return response.data;

}
const logout =async ()=>{
localStorage.removeItem('user')
}
const authService = {
  register,
  logout,
  login
}
export default authService