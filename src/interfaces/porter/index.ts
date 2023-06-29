import { LuggageDeliveryRequestInterface } from 'interfaces/luggage-delivery-request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PorterInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  luggage_delivery_request?: LuggageDeliveryRequestInterface[];
  user?: UserInterface;
  _count?: {
    luggage_delivery_request?: number;
  };
}

export interface PorterGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
