import mongoose from 'mongoose';

const tShirtSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Mens', 'Womens', 'All', 'Kids']
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    sizes: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId
    }
});

const tShirtModel = mongoose.model("tShirts", tShirtSchema);

export default tShirtModel;