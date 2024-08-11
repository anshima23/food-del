import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://anshima541:anshya@cluster0.bjebu.mongodb.net/food-del', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to DB:", error);
    }
};
