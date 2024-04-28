import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

describe("Test list product use case", () => {
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

  it("should list a product", async () => {
    const inputInfo = {
      id: "1",  
      name: "Product 1",
      price: 10
    };

    const inputInfo2 = {
      id: "2",  
      name: "Product 2",
      price: 20
    };

    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const product1 = new Product(inputInfo.id, inputInfo.name, inputInfo.price);
    const product2 = new Product(inputInfo2.id, inputInfo2.name, inputInfo2.price);
    await usecase.execute(product1);
    await usecase.execute(product2);
    const usecaseList = new ListProductUseCase(productRepository);
    
    const output = await usecaseList.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
  });
});
