import { getClient } from "../database/mongo.db.js";

export class ProductInfoRepository {
  async getProductsInfo() {
    const mongoConnect = getClient();

    try {
      await mongoConnect.connect();

      const productInfo = await mongoConnect
        .db("store")
        .collection("productInfo")
        .find({})
        .toArray();

      return productInfo;
    } catch (error) {
      throw error;
    } finally {
      mongoConnect.close();
    }
  }

  async getProductInfo(productId) {
    const mongoConnect = getClient();

    try {
      await mongoConnect.connect();

      const productInfo = await mongoConnect
        .db("store")
        .collection("productInfo")
        .findOne({ productId });

      return productInfo;
    } catch (error) {
      throw error;
    } finally {
      mongoConnect.close();
    }
  }

  async createProductInfo(productInfoData) {
    const mongoConnect = getClient();

    try {
      await mongoConnect.connect();

      const productInfo = await mongoConnect
        .db("store")
        .collection("productInfo")
        .insertOne(productInfoData);

      return { insertedId: productInfo.insertedId };
    } catch (error) {
      throw error;
    } finally {
      mongoConnect.close();
    }
  }

  async updateProductInfo(productId, productInfoData) {
    const mongoConnect = getClient();

    try {
      await mongoConnect.connect();

      const productInfoUpdated = await mongoConnect
        .db("store")
        .collection("productInfo")
        .updateOne({ productId: productId }, { $set: { ...productInfoData } });

      return productInfoUpdated;
    } catch (error) {
      throw error;
    } finally {
      mongoConnect.close();
    }
  }

  async deleteProductInfo(productId) {
    const mongoConnect = getClient();

    try {
      await mongoConnect.connect();

      await mongoConnect
        .db("store")
        .collection("productInfo")
        .deleteOne({ productId });
    } catch (error) {
      throw error;
    } finally {
      mongoConnect.close();
    }
  }

  async createReviewProductInfo(productId, review) {
    try {
      const productInfo = await this.getProductInfo(productId);

      productInfo.reviews.push(review);

      await this.updateProductInfo(productId, productInfo);

      return productInfo;
    } catch (error) {
      throw error;
    }
  }

  async deleteReviewProductInfo(productId, indexReview) {
    try {
      const productInfo = await this.getProductInfo(productId);

      productInfo.reviews.splice(indexReview, 1);

      await this.updateProductInfo(productId, productInfo);
    } catch (error) {
      throw error;
    }
  }
}
