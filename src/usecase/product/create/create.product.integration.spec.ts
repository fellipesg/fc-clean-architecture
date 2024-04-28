import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "../find/find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
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

  it("should create a product", async () => {
    const inputInfo = {
      id: "1",  
      name: "Product 1",
      price: 10
    };

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const product = new Product(inputInfo.id, inputInfo.name, inputInfo.price);

    const output = await usecase.execute(product);

    expect(output).toEqual({
      id: expect.any(String),
      name: inputInfo.name,
      price: inputInfo.price
    });
  });
});
