import cartModel from "../models/cartModel.js";

class cartController {
    static deleteAll(req, res) {
        cartModel.deleteMany({})
            .then(data => {
                res.send(data)
            })
            .catch(error => {
                res.send("failed to deelte")
            })
    }

    static async addItem(req, res) {
        try {
            const { product, quantity, size } = req.body;
            const { cart } = req.user;
            if (!cart)
                return res.status(400).send({ success: false, message: "no pointer to cart" })
            if (!product || !quantity || !size)
                return res.status(400).send({ success: false, message: "please provide all the fields" })
            const userCart = await cartModel.findById(cart);
            if (!userCart) {
                let message = "Please contact admin to convey cart loss message"
                return res.status(404).send({ success: false, message })
            }
            const existingCartItem = userCart.items.find(item => item.product.equals(product));
            if (existingCartItem) {
                existingCartItem.quantity = quantity;
                existingCartItem.size = size;
            } else {
                const cartItem = {
                    product,
                    quantity,
                    size
                }
                userCart.items.push(cartItem);
            }
            await userCart.save();
            return res.status(201).json({ ...userCart.toObject(), message: 'Item added to cart successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async removeItem(req, res) {
        try {
            const product = req.params.product;
            const { cart } = req.user;
            if (!product || !cart)
                return res.status(400).send({ success: false, message: "please provide product id" })
            const userCart = await cartModel.findById(cart);

            if (!userCart) {
                return res.status(404).json({ message: 'User cart not found' });
            }
            const itemIndex = userCart.items.findIndex(item => item.product.equals(product));
            if (itemIndex === -1) {
                return res.status(404).json({ message: 'Item not found in the cart' });
            }
            // if (userCart.items?.[itemIndex].quantity > 1)
            //     userCart.items[itemIndex].quantity -= 1;
            // else
            userCart.items.splice(itemIndex, 1);
            await userCart.save();
            return res.status(200).json({ ...userCart.toObject(), message: 'Item removed from cart successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    static async getCartItems(req, res) {
        try {
            const { cart } = req.user;
            if (!cart)
                return res.status(400).send({ success: false, message: "unexpected cart id not found" })
            const userCart = await cartModel.findById(cart).populate({ path: 'items.product' });
            if (!userCart) {
                return res.status(404).json({ message: 'User cart not found' });
            }
            let total = 0;
            userCart.items.map(item => total += item.product.price * item.quantity);
            userCart.total = total;
            // userCart.tax = total*0.18;
            // userCart.shipping = 40;
            await userCart.save()
            return res.status(200).json(userCart);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default cartController;