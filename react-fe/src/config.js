const dev = {
  api: {
    url: "http://localhost:5000/cpsc455/us-central1/api"
  }
};

const prod = {
  api: {
    url: "https://us-central1-cpsc455.cloudfunctions.net/api"
  }
};

const config = process.env.ENV === 'dev' ? dev : prod;
const exp = { ...config };
export default exp;
