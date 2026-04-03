import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {NotificationsService} from 'src/notifications/notifications.service';

@Injectable()
export class OrdersService implements OnModuleInit {
  constructor(
    @Inject('ORDERS_SERVICE')
    private readonly client: ClientProxy,
    private readonly notifications: NotificationsService,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  createOrder(payload: any) {
    console.log('[RabbitMQ] Emitting order_created event:', payload);
    this.client.emit('order_created', {
      order: payload,
      createdAt: new Date().toISOString(),
    });

    this.notifications.notify('order created', {
      order: payload,
    })
    return {
      message: 'Order created and event emitted',
      payload,
    };
  }
}