import { awsConfig } from '../configs/config'

const restApi = {

    endpoints: [
      {
        name: "channelActions",
        endpoint: awsConfig.apiGateway
      }
    ]
};

export default restApi
