import mongooes from "mongoose";

export const connectDB = async () => {
  try {
    await mongooes.connect(process.env.MONGOO.URL);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}