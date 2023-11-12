import { MusicInstrument } from "../models/musicInstrumentModel.js";
import path from 'path';
const __dirname = path.resolve();
// Create a new music instrument
export const createInstrument = async (request, response) => {
    try {

        console.log(request.body)
        const { image } = request.files;    
     
        let filepath = __dirname + '/public/item/' + image.name
        image.mv(filepath);

        let filepathtoUplaod = '/public/item/' + image.name      

        if (
            !request.body.name ||
            !request.body.price ||
            !request.body.category ||
            !request.body.condition ||
            !request.body.addDate||
            !request.body.user
        ) {
            return response.status(400).send({
                message: 'Please send all required fields'
            });
        }
        const newInstrument = {
            name: request.body.name,
            price: request.body.price,
            category: request.body.category,
            condition: request.body.condition,
            addDate: request.body.addDate,
            image:filepathtoUplaod,
            user:request.body.user
        };
        const instrument = await MusicInstrument.create(newInstrument);

        return response.status(201).send(instrument);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Get all music instruments
export const getAllInstruments = async (request, response) => {
    let userid = request.params.uid
    // console.log(userid)
    try {
        const instruments = await MusicInstrument.find({user:userid});
        return response.status(200).json({
            count: instruments.length,
            data: instruments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Get a music instrument by ID
export const getInstrumentById = async (request, response) => {
    try {
        const { id } = request.params;
        const instrument = await MusicInstrument.findById(id);
        return response.status(200).json(instrument);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Get music instruments by category
export const getInstrumentsByCategory = async (request, response) => {
    try {
        const { category } = request.params;
        const instruments = await MusicInstrument.find({ category:category });
        return response.status(200).json({
            count: instruments.length,
            data: instruments
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Update a music instrument by ID
export const updateInstrument = async (request, response) => {
    try {
        const { id } = request.params;
        const { image } = request.files;

        if (!image) {
            return response.status(400).json({ message: "No image provided" });
        }

        const instrument = await MusicInstrument.findById(id);

        if (!instrument) {
            return response.status(404).json({ message: "Instrument not found" });
        }

      

        const filepath = __dirname + '/public/item/' + image.name;
        image.mv(filepath);

    
        instrument.image = '/public/item/' + image.name;
        await instrument.save();

        if (
            !request.body.name ||
            !request.body.price ||
            !request.body.category ||
            !request.body.condition ||
            !request.body.addDate
        ) {
            return response.status(400).json({ message: 'Please send all required fields' });
        }

        const updatedInstrument = await MusicInstrument.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedInstrument) {
            return response.status(404).json({ message: "Instrument not found" });
        }

        return response.status(200).json({ message: "Instrument updated successfully", updatedInstrument });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a music instrument by ID
export const deleteInstrument = async (request, response) => {
    try {
        const { id } = request.params;
        const isInstrument = await MusicInstrument.findByIdAndDelete(id);

        if (!isInstrument) {
            return response.status(404).json({ message: "Not found" });
        }

        return response.status(200).json({ message: "Success" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}
export const getUserItems = async (req, res) => {
    try {
  
      const userItems = await MusicInstrument.find({ user: req.userId });
      res.status(200).json(userItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };