import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";


const blogShema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});


export const blogModel = model<IBlog>('Blog', blogShema);

