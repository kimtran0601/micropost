import axios from "axios";

const url = 'api/users/login/'

class UserService{
    // Get Post
    static async login(username, password){
        return axios.post(url, {
            username,
            password
        });
    }
}

export default UserService;