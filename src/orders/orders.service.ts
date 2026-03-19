import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService implements OnModuleInit {
  constructor(
    @Inject('ORDERS_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  createOrder(payload: any) {
    console.log('[RabbitMQ] Emitting order_created event:', payload);
    this.client.emit('order_created', payload);
    return {
      message: 'Order created and event emitted',
      payload,
    };
  }
}