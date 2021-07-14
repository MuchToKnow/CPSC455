const dev = {
  api: {
    url: "localhost:8000"
  }
};

const prod = {
  api: {
    url: "https://us-central1-cpsc455.cloudfunctions.net/api"
  }
};

const config = process.env.ENV === 'dev' ? dev : prod;
export default {
  ...config
};
