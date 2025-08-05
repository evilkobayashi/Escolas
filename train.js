const express = require('express');
const tf = require('@tensorflow/tfjs-node');

const app = express();
app.use(express.json()); // Enable JSON body parsing

let model;

async function loadModel() {
    // Load your model here, e.g., from a local path
    model = await tf.loadLayersModel('file:///path/to/your/model.json'); 
    console.log('Model loaded successfully!');
}

app.post('/predict', async (req, res) => {
    try {
        const inputData = req.body.data; // Assuming input data is sent in the request body
        // Perform necessary preprocessing on inputData
        const inputTensor = tf.tensor(inputData); 

        const predictions = model.predict(inputTensor);
        const predictionArray = await predictions.array(); // Convert tensor to array

        res.json({ predictions: predictionArray });
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).send('Error during prediction');
    }
});

const PORT = process.env.PORT || 3000;
loadModel().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});