import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import { v4 as uuid } from "uuid";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = new Product(input.id, input.name, input.price);
    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}
