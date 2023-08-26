import orderModel from "../models/orderModel.js";
import tShirtModel from "../models/tshirtModel.js";

class orderController {
    static newOrder = (req, res) => {
        const {
            firstName,
            lastName,
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        orderModel.create({
            firstName,
            lastName,
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        }).then(order => {
            res.status(201).send({
                success: true,
                message: "order Created successfully",
                // ...order.toObject()
            })
        }).catch(error => {
            res.status(400).send({
                success: false,
                message: "Error while creating new order",
                ...error
            })
        })
    }
    static getOrderById = (req, res) => {
        const orderId = req.params.id;

        if (!orderId) return res.status(404).send({ success: false, message: "Please provide order id" });
        orderModel.findById(orderId).populate({ path: 'orderItems.product' })
            .then(order => {
                if (!order) return res.send({ success: false, message: "No order found with that id" })
                res.send({
                    success: true,
                    ...order.toObject()
                })
            })
            .catch(error => {
                res.status(400).send({
                    success: false,
                    message: "Error while fetching order details, Please try latter",
                    ...error
                })
            })
    }
    static myOrders = (req, res) => {
        const user = req.user._id;
        orderModel.find({ user })
            .then(orders => {
                res.send(orders)
            })
            .catch(error => {
                console.log(error)
                res.status(400).send({
                    success: false,
                    message: "Error while fetching your orders",
                    ...error
                })
            })
    }
    static getAllOrders = (req, res) => {
        orderModel.find()
            .then(orders => {
                let totalAmount = 0;
                orders.forEach(order => {
                    totalAmount += order.totalPrice;
                });
                orders.totalAmount = totalAmount;
                res.send({
                    success: true,
                    orders
                })
            })
            .catch(error => {
                res.status(400).send({
                    success: false,
                    message: "error occured while fetching all orders"
                })
            })
    }
    static updateOrderStatus = (req, res) => {
        async function updateStock(id, quant) {
            tShirtModel.findById(id)
                .then(async tshirt => {
                    if (!tshirt) return res.status(404).send({ success: false, message: "No tshirt found with that id" });
                    tshirt.stock -= quant;
                    await tshirt.save();

                })
        }
        const { orderId, orderStatus } = req.body;
        if (!orderId) return res.status(400).send({ success: false, message: "please provide orderId" });
        orderModel.findById(orderId)
            .then(order => {
                if (!order) return res.status(404).send({ success: false, message: "No order found with that id" });
                if (order.orderStatus == "Delivered") {
                    return res.send({ success: false, message: "order is already marked delivered " });
                }
                order.orderStatus = orderStatus;
                if (orderStatus == 'Shipped') {
                    order.orderItems.forEach(async product => {
                        await updateStock(product.productId, product.quantity);
                    });
                }
                if (orderStatus == "Delivered") order.deliveredAt = Date.now();
                order.save()
                    .then(result => {
                        res.send({
                            success: true,
                            message: "Status updated successfully"
                        })
                    })
                    .catch(error => {
                        res.send(400).send({
                            success: false,
                            message: "error occured while saving order changes"
                        })
                    })
            })
            .catch(error => {
                res.status(400).send({
                    success: false,
                    message: "error occured while looking for orders"
                })
            })
    }
    static delOrder = (req, res) => {
        orderModel.findOneAndDelete({ _id: req.params.id })
            .then((data) => {
                res.send({
                    success: true,
                    ...data.toObject()
                });
            })
            .catch((err) => {
                res.status(400);
                res.send({
                    success: false,
                    ...err
                });
            })
    }
}

export default orderController;