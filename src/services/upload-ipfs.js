const { create } = require("ipfs-http-client");

// connect to a different API
const client = create("https://ipfs.infura.io:5001/api/v0");

export const uploadIPFS = async (payload, isMedia = false) => {
  let _payload = payload;
  if (!isMedia) {
    _payload = JSON.stringify(payload);
  }
  const { path } = await client.add(_payload);
  const fullPath = `https://ipfs.infura.io/ipfs/${path}`;
  console.log(fullPath);
  return fullPath;
};
