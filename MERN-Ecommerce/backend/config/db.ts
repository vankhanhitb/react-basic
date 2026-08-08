import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoo_url = process?.env.MONGODB_URI;

    if(!mongoo_url){
      throw new Error("MONGODB_URI is not defined")
    }

    await mongoose.connect(mongoo_url,{
      dbName: "MERN_ECOM1",
    });

    console.log(`Connect successfully`);

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown startup error";
    throw new Error(`Error: ${message}`);
    process.exit(1);
  }
}