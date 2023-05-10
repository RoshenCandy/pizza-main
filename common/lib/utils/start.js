import dbConnect from './dbConnect';

const start = async () => {
  await dbConnect();
};

export default start;
