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
    static insertPost(title, text){
        return axios.post(url, {
            title,
            text
        });
    }

    // Update Post
    static updatePost(id, title, text){
        return axios.patch(`${url}/${id}`, {
            title,
            text
        });
    }

    // Delete Post 
    static deletePost(id){
        return axios.delete(`${url}/${id}`)
    }
}

export default PostService;