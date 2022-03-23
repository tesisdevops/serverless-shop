const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const app = express();
const PORT = 2000;
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//conexion con base de datos mngo
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tesis12:tesis12@cluster0.nojmz.mongodb.net/tesis?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

app.use(express.json());

var db = mongoose.connection;

//Define a schema
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    name:String,
    caption:String,
    description: String,
    skus: String,
    images: Array,
});

// Model
const Product = mongoose.model('Product', ProductoSchema);


//Routes
app.get('/',(request,response) => {
    response.send('<h1>Servidor corriendo<//h1>');
});


app.get('/all', (req, res) => {

    Product.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.send(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

app.post('/save', (req, res) => {
    const data = req.body;

    const newProduct = new Product(data);

    newProduct.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});
