import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "tShirts",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            size: {
                type: String,
                required: true
            }
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    },
    paymentInfo: {
        id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: mongoose.Decimal128,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: mongoose.Decimal128,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const orderModel = new mongoose.model('order', orderSchema);

export default orderModel;