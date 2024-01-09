import mongoose, { Schema } from 'mongoose';

const prodItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const cartSchema = new Schema(
  { products: { type: [prodItemSchema], default: [] } },
  { timestamps: true, versionKey: false }
);

cartSchema
  .pre('find', function () {
    this.populate('products.productId');
  })
  .pre('findById', function () {
    this.populate('products.productId');
  });

export default mongoose.model('Carts', cartSchema);

/* const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

cartSchema.pre('find', function(){
  this.populate('Product')
})

export default mongoose.model('Carts', cartSchema); */
