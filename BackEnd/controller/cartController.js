
import { cartModel } from "../models/cartModel.js";

export const createCart = async (request, response) => {
    console.log(request.body)
    try {   
        const cart = await cartModel.create({
            user : request.body.user,
            product : request.body.product  ,
            name : request.body.name,
            price : request.body.price,   
            image : request.body.image 
        });

        return response.status(201).send(cart);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};


export const getAll = async (request, response) => {
    let userid = request.params.uid
    console.log('here')
    try {
        const instruments = await cartModel.find({user:userid});
        return response.status(200).json({
            count: instruments.length,
            data: instruments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getAll2 = async (request, response) => {
    let userid = request.params.uid
    console.log('here')
    try {
        const instruments = await cartModel.deleteMany({user:userid});
        return response.status(200);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

export const getAll22 = async (request, response) => {
    let userid = request.params.uid;
    console.log('here');
    try {
        const deletedCart = await cartModel.findByIdAndDelete(userid);
        if (!deletedCart) {
            return response.status(404).send({ message: 'Cart not found' });
        }
        return response.status(200).send({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};


// export const deleteById = async (request, response) => {
//     let cartId = request.params.cartId; // Assuming you have a route parameter for the cart ID
//     try {
//         const deletedCart = await cartModel.findByIdAndDelete(cartId);
//         if (!deletedCart) {
//             return response.status(404).send({ message: 'Cart not found' });
//         }
//         return response.status(200).send({ message: 'Cart deleted successfully' });
//     } catch (error) {
//         console.log(error.message);
//         response.status(500).send({ message: error.message });
//     }
// };