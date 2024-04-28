import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const inputInfo = {
      id: "1",  
      name: "Product 1",
      price: 20
    };

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const product1 = new Product(inputInfo.id, inputInfo.name, inputInfo.price);
    await usecase.execute(product1);
    const usecaseUpdate = new UpdateProductUseCase(productRepository);
    
    const output = await usecaseUpdate.execute(product1);

    expect(output).toEqual(inputInfo);
  });
});
