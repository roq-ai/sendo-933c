import * as yup from 'yup';

export const luggageDeliveryRequestValidationSchema = yup.object().shape({
  status: yup.string().required(),
  end_customer_id: yup.string().nullable(),
  porter_id: yup.string().nullable(),
  airline_id: yup.string().nullable(),
});
