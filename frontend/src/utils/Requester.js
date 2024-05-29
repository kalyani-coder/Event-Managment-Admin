import axios from "axios";

const Requester = async ({
  method = "GET",
  urlpre = "https://node-backend.macj-abuyerschoice.com/api",
  urlArgs = [],
}) => {
  const url = urlpre + urlArgs.join("/");
  try {
    const response = await axios({
      method: method,
      url: url,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default Requester;
