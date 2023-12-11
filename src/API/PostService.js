import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        // const response = await axios.get('http://127.0.0.1:5000/tutorials')
        // console.log(response);
        return response
    }
}