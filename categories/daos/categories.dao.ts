import { CreateCategoryDto } from '../dto/create.category.dto';
import { PutCategoryDto } from '../dto/put.category.dto';
import { PatchCategoryDto } from '../dto/patch.category.dto';
import shortid from 'shortid';
import debug from 'debug';
import mongooseService from '../../common/services/mongoose.service';

const log: debug.IDebugger = debug('app:category-dao');

class UsersDao {
  users: Array<CreateCategoryDto> = [];
  Schema = mongooseService.getMongoose().Schema;

  constructor() {
    log('Created new instance of CategoriesDao');
  }

  categorySchema = new this.Schema(
    {
      _id: String,
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
      },
      color: {
        type: String,
      },
    },
    { id: false }
  );

  Category = mongooseService
    .getMongoose()
    .model('Categories', this.categorySchema);

  async addCategory(categoryFields: CreateCategoryDto) {
    const categoryId = shortid.generate();
    const category = new this.Category({
      _id: categoryId,
      ...categoryFields,
    });
    await category.save();
    return categoryId;
  }

  async getCategories(limit = 25, page = 0) {
    return this.Category.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getAllCategories() {
    return this.Category.find();
  }

  async getCategoryById(categoryId: string) {
    return this.Category.findOne({ _id: categoryId }).exec();
  }

  async updateCategoryById(
    categoryId: string,
    categoryFields: PatchCategoryDto | PutCategoryDto
  ) {
    const existingCategory = await this.Category.findOneAndUpdate(
      { _id: categoryId },
      { $set: categoryFields },
      { new: true }
    ).exec();
    return existingCategory;
  }

  async removeCategoryById(categoryId: string) {
    return this.Category.deleteOne({ _id: categoryId }).exec();
  }

  async getCategoryByName(name: string) {
    return this.Category.findOne({ name: name }).exec();
  }
}

export default new UsersDao();
