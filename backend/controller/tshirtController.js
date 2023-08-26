import tShirtModel from "../models/tshirtModel.js";

const prodPerPage = 8;
class tshirtController {

    static getAll = async (req, res) => {
        let page = req.query.page || 1;
        const productsCount = await tShirtModel.countDocuments() || -1;
        tShirtModel.find({}).limit(prodPerPage).skip((page - 1) * prodPerPage)
            .then((products) => {
                const stats = { productsCount, prodPerPage }
                res.status(200)
                res.send({ products, stats });
            })
            .catch((err) => {
                console.log(err)
                res.status(400);
                res.send(err);
            })
    }
    static searchProd = (req, res) => {

        let page = Number(req.query.page) || 1;
        let lt = Number(req.query.lt) || 1000000;
        let gt = Number(req.query.gt) || 0;
        let ratings_gte = Number(req.query.ratings_gte) || -1;
        let filters = {
            Name: {
                $regex: `${req.query.q}`,
                $options: 'i'
            },
            price: {
                $lt: lt,
                $gt: gt
            },
            ratings: {
                $gte: ratings_gte
            }
        }
        tShirtModel.find(filters).limit(prodPerPage).skip((page - 1) * prodPerPage)
            .then(async (products) => {
                const productsCount = await tShirtModel.countDocuments(filters) || -1;
                const stats = { productsCount, prodPerPage }
                res.send({ products, stats });
            }).catch((err) => {
                res.send(err);
            })
    }
    static getById = (req, res) => {
        const prodId = req.params.id;
        if (!prodId) {
            res.status(400).send({ success: false, message: "unable to fetch id" });
            return;
        }
        tShirtModel.findById(prodId)
            .then((data) => {
                // throw new Error('testing bby mohsin')
                // return;
                res.send(data);
            })
            .catch((err) => {
                res.status(400);
                res.json({
                    success: false,
                    message: 'Error while sending the product details',
                    ...err
                });
            })
    }
    static addNew = async (req, res) => {
        const newTshirt = new tShirtModel({
            ...req.body,
            createdBy: req.user.id || "unknown"
        })
        newTshirt.save()
            .then((data) => {
                res.json({
                    success: true,
                    ...data.toObject()
                });
            })
            .catch((err) => {
                res.json({
                    success: false,
                    ...err
                });
            })
    }
    static updateById = (req, res) => {
        tShirtModel.findByIdAndUpdate(req.params.id, req.body)
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
    static deleteById = (req, res) => {
        tShirtModel.findOneAndDelete({ _id: req.params.id })
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
    static addReview = (req, res) => {
        const { rating, comment, productId } = req.body;
        if (!rating || !comment || !productId) return res.statuc(400).send("you miss spelled something/ all the fields are neccessary")
        if (rating < 1 || rating > 5) return res.statuc(400).send("review shall be 0-5")
        const review = {
            userId: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }
        tShirtModel.findById(productId)
            .then(async product => {
                if (!product) return res.status(404).send({ success: false, message: "Prouct not found with that id" });
                let isAlreadyReviewed = false;
                product.reviews.forEach(review => {
                    if (review.userId.toString() === req.user.id) {
                        review.rating = rating; review.comment = comment; review.name = req.user.name;
                        isAlreadyReviewed = true;
                        return;
                    }
                });
                if (!isAlreadyReviewed) {
                    product.reviews.push(review);
                }
                let totalPoints = 0;
                product.reviews.forEach(review => {
                    totalPoints += review.rating;
                })
                product.ratings = totalPoints / product.reviews.length;
                await product.save();
                res.send({
                    success: true,
                    message: "Review added successfully",
                    ...product.toObject()
                })
            })
            .catch(error => {
                res.send({
                    success: false,
                    message: "internal error while adding review",
                    error
                })
            })
    }
    static delReview = (req, res) => {
        const { productId, reviewId } = req.body;
        tShirtModel.findById(productId)
            .then(async product => {
                if (!product) return res.send({ success: false, message: "Unable to find product" });
                if (product.reviews.length == 1) {
                    product.reviews = undefined; product.ratings = undefined;
                    await product.save();
                    res.send({
                        success: true,
                        message: "review deleted successfully."
                    })
                    return;
                }
                let idx = product.reviews.findIndex(review => review._id.toString() == reviewId)
                if (idx < 0 || idx >= product.ratings.length) return res.status(404).send({ success: false, message: "Review not found with that id" });
                product.ratings = (product.ratings * product.ratings.length) - product.reviews[idx].rating;
                product.ratings /= product.reviews.length - 1;
                product.reviews.splice(idx, 1);//reviews.starting from idx remove only one
                await product.save();
                res.send({
                    success: true,
                    message: "review deleted successfully"
                })
            })
            .catch(error => {
                res.send({
                    success: false,
                    message: "Error while deleting the Review",
                    ...error
                })
            })
    }
}

export default tshirtController;