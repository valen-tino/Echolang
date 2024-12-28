import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Verified']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);