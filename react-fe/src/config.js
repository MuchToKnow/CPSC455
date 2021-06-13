const dev = {
  api: {
    url: "localhost:8000"
  }
};

const prod = {
  api: {
    url: "localhost:8000" // Change once we host prod server somewhere
  }
};

const config = process.env.ENV === 'dev' ? dev : prod;
export default {
  ...config
};
