import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoo_url = process?.env.MONGOO_URL;

    if(!mongoo_url){
      throw new Error("MONGOO_URL is not defined")
    }

    await mongoose.connect(mongoo_url);

    console.log(`Connect successfully`);

  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}