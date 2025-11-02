import mongoose from "mongoose"

const transcationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Type is required'],
        enum: {
            values: ['income', 'expense'],
            message: 'Type must be either income or expense'
        }
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [1, 'Amount must be greater than 0']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [200, 'Description cannot exceed 200 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transcationSchema);