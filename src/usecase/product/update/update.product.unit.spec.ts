import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";
const inputInfo = {
  id: "1",  
  name: "Product 1",
  price: 10
};


const product1 = new Product(inputInfo.id, inputInfo.name, inputInfo.price);


const input = {
  id: product1.id,
  name: "Product 1 Updated",
  price: 15
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product1)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
