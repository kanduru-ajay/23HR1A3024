const axios = require("axios");

const { getToken } = require("./token");

const BASE_URL =
    "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, packageName, message) {

    try {

        const response = await axios.post(

            BASE_URL,

            {
                stack,
                level,
                package: packageName,
                message
            },

            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }

        );

        return response.data;

    }

    catch(err){

        console.log(err.response?.data);

    }

}

module.exports={Log};