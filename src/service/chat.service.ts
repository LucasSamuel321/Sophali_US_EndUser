
import axios from 'axios';
import { config } from '../config';

const chattingService = {
sendMessage: async (data: any) => {
    const result = await axios.post(`${config.serverUrl}/endusers/send-message`, data)
    console.log("data", result.data);
    return result.data;
}

}

export default chattingService;