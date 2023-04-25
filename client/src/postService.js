import axios from "axios";

const url = 'api/posts/'

class PostService{
    // Get Post
    static async getPost(){
        return new Promise (async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                console.log({data});
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date()
                    })));
            } catch (error) {
                reject(error);
            }
        })
    }

    // Create Post
    static insertPost(text){
        return axios.post(url, {
            text
        });
    }

    // Delete Post 
    static deletePost(id){
        return axios.delete(`${url}/${id}`)
    }
}

export default PostService;