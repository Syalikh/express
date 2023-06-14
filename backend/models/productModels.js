import mongoose from "mongoose";

const Products = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Products", Products);