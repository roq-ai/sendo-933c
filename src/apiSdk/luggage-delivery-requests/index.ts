import axios from 'axios';
import queryString from 'query-string';
import {
  LuggageDeliveryRequestInterface,
  LuggageDeliveryRequestGetQueryInterface,
} from 'interfaces/luggage-delivery-request';
import { GetQueryInterface } from '../../interfaces';

export const getLuggageDeliveryRequests = async (query?: LuggageDeliveryRequestGetQueryInterface) => {
  const response = await axios.get(`/api/luggage-delivery-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLuggageDeliveryRequest = async (luggageDeliveryRequest: LuggageDeliveryRequestInterface) => {
  const response = await axios.post('/api/luggage-delivery-requests', luggageDeliveryRequest);
  return response.data;
};

export const updateLuggageDeliveryRequestById = async (
  id: string,
  luggageDeliveryRequest: LuggageDeliveryRequestInterface,
) => {
  const response = await axios.put(`/api/luggage-delivery-requests/${id}`, luggageDeliveryRequest);
  return response.data;
};

export const getLuggageDeliveryRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/luggage-delivery-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteLuggageDeliveryRequestById = async (id: string) => {
  const response = await axios.delete(`/api/luggage-delivery-requests/${id}`);
  return response.data;
};
