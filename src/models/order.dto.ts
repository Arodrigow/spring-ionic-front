import { OrderItemDTO } from './order-item.dto';
import { PaymentDTO } from './payment.dto';
import { RefDTO } from './ref.dto';
export interface OrderDTO {
  client: RefDTO;
  addressDelivery: RefDTO;
  payment: PaymentDTO;
  items: OrderItemDTO[];
}
