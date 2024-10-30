const { model } = require("mongoose");
const models = require("../Models/Models");

// Add a new product to the cart
module.exports.addProductToCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;

        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId });
        const quantity = 1;
        if (cart) {
            // Check if product already exists in the cart
            const existingProduct = cart.products.find(item => item.productId === productId);

            if (existingProduct) {
                return res.status(400).json({ message: "Product already exists in the cart. Use update quantity instead." });
            } else {

                cart.products.push({ productId, quantity });
                cart.totalAmount += (await models.Product.find({ productId: productId }))[0].price * quantity;
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            }
        } else {
            // Create a new cart for the user if no active cart exists
            const product = await models.Product.find({ productId: productId });
            const cartlist = await models.Cart.find({});

            const newCart = new models.Cart({
                cartId: "cart_" + cartlist.length,
                userId: userId,
                products: [{ productId, quantity }],
                totalAmount: product[0].price * quantity,
                isActive: 1
            });
            const savedCart = await newCart.save();
            return res.json(savedCart);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error adding product to cart" });
    }
};

// Add quantity to an existing product in the cart
module.exports.addQuantityToProduct = async (req, res, next) => {
    try {
        const { userId, productId, additionalQuantity } = req.body;


        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId });

        if (cart) {
            // Find product in the cart
            const productInCart = cart.products.find(item => item.productId === productId);

            if (productInCart) {
                // Update product quantity

                productInCart.quantity += additionalQuantity;
                const PrdIndx = cart.products.findIndex(item => item.productId === productId);
                if (productInCart.quantity <= 0)
                    cart.products.splice(PrdIndx, 1);
                cart.totalAmount += (await models.Product.find({ productId: productId }))[0].price * additionalQuantity;
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            } else {
                return res.status(404).json({ message: "Product not found in cart." });
            }
        } else {
            return res.status(404).json({ message: "No active cart found for the user." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating product quantity in cart" });
    }
};

// Update product quantity in the cart
module.exports.updateProductQuantity = async (req, res, next) => {
    try {
        const { userId, productId, newQuantity } = req.body;

        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId });

        if (cart) {
            // Find product in the cart
            const productInCart = cart.products.find(item => item.productId === productId);

            if (productInCart) {
                // Calculate the price difference
                const productPrice = (await models.Product.findById(productId)).price;
                cart.totalAmount += (newQuantity - productInCart.quantity) * productPrice;

                // Update product quantity
                productInCart.quantity = newQuantity;
                cart.updatedAt = Date.now();

                const updatedCart = await cart.save();
                return res.json(updatedCart);
            } else {
                return res.status(404).json({ message: "Product not found in cart." });
            }
        } else {
            return res.status(404).json({ message: "No active cart found for the user." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating product quantity in cart" });
    }
};

// Delete a product from the cart
module.exports.deleteProductFromCart = async (req, res, next) => {
    try {
        const { userId, productId } = req.body;

        // Find active cart for the user
        let cart = await models.Cart.findOne({ isActive: 1, userId: userId });
        var product;
        if (cart) {
            // Find the product in the cart
            const productIndex = cart.products.findIndex(item => item.productId === productId);

            if (productIndex !== -1) {
                // Reduce the total amount accordingly
                product = (await models.Product.find({ productId: productId }))[0];
                const productPrice = product.price;
                cart.totalAmount -= cart.products[productIndex].quantity * productPrice;

                // Remove the product from the cart
                cart.products.splice(productIndex, 1);
                cart.updatedAt = Date.now();

                if (cart.products.length == 0)
                    cart.isActive = 0;

                const updatedCart = await cart.save();


                return res.json({ "updatedCart": updatedCart, "deleted": product });
            } else {
                return res.status(404).json({ message: "Product not found in cart." });
            }
        } else {
            return res.status(404).json({ message: "No active cart found for the user." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting product from cart" });
    }
};


// show existing cart
module.exports.showCart = async (req, res, next) => {
    try {
        var cart = {};
        cart = await models.Cart.find({ userId: req.body.userId, isActive: 1 });
        const user = await models.User.find({userId:req.body.userId});

        cart = JSON.stringify(cart);
        cart = JSON.parse(cart);
        var prdids = [];
        if (cart.length == 0)
            return res.json([]);

        cart[0].products.map((prd) => {
            prdids.push(prd.productId);
        });

        let products = await models.Product.find({ productId: prdids });
        for (let i = 0; i < cart[0].products.length; i++) {
            var prdct = products.filter(ele => ele.productId == cart[0].products[i].productId);
            cart[0].products[i].product = prdct[0];
            cart[0].products[i].price = prdct[0].price;
        };
        cart[0].userAddress=user[0].address;
        return res.json(cart);
    } catch (error) {
        return res.status(500).json({ message: "Error showing product from cart" });
    }
}

module.exports.CreateOrder = async (req, res, next) => {
    try {
        const element = req.body;
        const userId = req.body.userId;
        const userAddress = req.body.userAddress;
        var prdSeller = [];
        for (var i = 0; i < req.body.products.length; i++) {
            var obj = {};
            console.log(element.products[i]);
            obj = { uploadedBy: element.products[i].product.uploadedBy, ProductDetails: { productId: element.products[i].productId, ProduQuantity: element.products[i].quantity } };
            prdSeller.push(obj);
        }
        const ordersExisting = await models.Order.find({});
        const orderslength=ordersExisting.length;
        const order = await models.Order({
            orderId: 'O'+orderslength,
            userId: userId,
            products: req.body.products,
            totalAmount: req.body.totalAmount,
            status: 'Pending',
            orderDate: new Date(),
            deliveryDate: new Date(),
            paymentMethod: 'Offline',
            shippingAddress: userAddress
        });
        order.save();
        //send data to uploadedBy
        return res.json({ data: "function under construction" })
    } catch (error) {
        console.log(error);
    }
}