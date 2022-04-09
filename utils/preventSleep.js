// make api calls to self to prevent server from sleeping
const axios = require("axios");
const sendMail = require("../utils/sendMail");

const preventSLeep = async () => {
  const sleepTime = process.env.SLEEP_TIME;
  if (sleepTime && sleepTime >= 60000) {
   const refreshInterval =  setInterval(async () => {
      try {
        const resp = await axios.get(process.env.API_URL);
        if (resp.status === 200) {
          console.log("API is working");
        }
      } catch (err) {
        await sendMail(process.env.ADMIN_EMAIL, "API is not working", err.message);
        return clearInterval(refreshInterval);
      }
    }, sleepTime);
  }
};

module.exports = preventSLeep;