import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(express.json());

// Connect to MongDB

mongoose.connect('mongodb+srv://omarjibria:1234567rowda@crud.dxp15pg.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>console.log("Connect To MongoDB"))
    .catch(err =>console.log("Could Not connect to MongoDB....", err))


   
   // Customer schema and model
   const customerSchema = new mongoose.Schema({
    username:{
       type:String,
       required: true,
       unique: true

    },
    email:{
       type : String,
       required: true,
       unique: true

    },
    password:{
       type:String,
       required:true
       
    },

    address:{
       type: String,
       required: false

    }
 })

 const Customer = mongoose.model('Customer' , customerSchema)


//  http://localhost:8000/customers2222222222222222222222222222222222222222222222222


// Customer  A NEW CUSTOMER

app.post('/customers', async(req, res)=>{
   try{
       let customer  = new Customer({ ...req.body});
       customer = await customer.save()
       res.status(201).json({message: "Registered Successful", status: true})
   }catch(error){
       return res.status(400).json({message: "No Register customer" , status: false})
   }
})

// READ a single customer
app.get('/customers/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.send(customer);
});


app.put('/customers/:id', async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    if (!customer) return res.status(404).send('Customer not found');
    res.send(customer);
});

// DELETE a customer
app.delete('/   s/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).send('Customer not found');
    res.send(customer).json({massage: "Deleted Succesfully" , status: false})
});



app.listen(5000, ()=>console.log("Server is Running on port 5000"))