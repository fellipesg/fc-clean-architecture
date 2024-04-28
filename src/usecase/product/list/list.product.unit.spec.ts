import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";
import ListCustomerUseCase from "./list.product.usecase";
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

const product1 = new Product(inputInfo.id, inputInfo.name, inputInfo.price);
const product2 = new Product(inputInfo2.id, inputInfo2.name, inputInfo2.price);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test for listing product use case", () => {
  it("should list a customer", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
