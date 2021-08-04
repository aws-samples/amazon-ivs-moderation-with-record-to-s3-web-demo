import axios from 'axios'
import { awsConfig } from '../configs/config'

export default axios.create({
  baseURL: awsConfig.apiGateway,
  headers: {  
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});
