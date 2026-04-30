import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll() {
    return this.repo.find();
  }
  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }
  findByCategory(categoryId: number) {
    return this.repo.find({ where: { categoryId } });
  }
  create(data: { name: string; price: number; categoryId: number }) {
    return this.repo.save(this.repo.create(data));
  }
}
