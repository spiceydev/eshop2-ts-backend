import debug from 'debug';
import shortid from 'shortid';
import mongooseService from '../../common/services/mongoose.service';
import { CreateProductDto } from '../dto/create.product.dto';
import { PatchProductDto } from '../dto/patch.product.dto';
import { PutProductDto } from '../dto/put.product.dto';

const log: debug.IDebugger = debug('app:product-dao');

class ProductsDao {
  products: Array<CreateProductDto> = [];
  Schema = mongooseService.getMongoose().Schema;

  constructor() {
    log('Created new instance of ProductsDao');
  }

  productSchema = new this.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      richDescription: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: '',
      },
      images: [
        {
          type: String,
        },
      ],
      brand: {
        type: String,
        default: '',
      },
      price: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      category: {
        type: this.Schema.Types.ObjectId,
        ref: 'Categories',
        required: true,
      },
      countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
      rating: {
        type: Number,
        default: 0,
      },
      numReviews: {
        type: Number,
        default: 0,
      },
      isFeatured: {
        type: Boolean,
        default: false,
      },
      dateCreated: {
        type: Date,
        default: Date.now,
      },
    },
    { id: false }
  );

  Product = mongooseService.getMongoose().model('Products', this.productSchema);

  async addProduct(productFields: CreateProductDto) {
    const productId = shortid.generate();
    const user = new this.Product({
      _id: productId,
      ...productFields,
    });
    await user.save();
    return productId;
  }

  async getProducts(limit = 25, page = 0) {
    return this.Product.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getAllProducts() {
    return this.Product.find();
  }

  async getProductById(productsId: string) {
    return this.Product.findOne({ _id: productsId }).exec();
  }

  async updateProductById(
    productsId: string,
    productFields: PatchProductDto | PutProductDto
  ) {
    const existingProduct = await this.Product.findOneAndUpdate(
      { _id: productsId },
      { $set: productFields },
      { new: true }
    ).exec();
    return existingProduct;
  }

  async removeProductById(productsId: string) {
    return this.Product.deleteOne({ _id: productsId }).exec();
  }

  async getProductByName(name: string) {
    return this.Product.findOne({ name: name }).exec();
  }
}
export default new ProductsDao();
