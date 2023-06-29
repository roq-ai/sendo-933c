const mapping: Record<string, string> = {
  airlines: 'airline',
  'luggage-delivery-requests': 'luggage_delivery_request',
  porters: 'porter',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
