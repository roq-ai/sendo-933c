import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLuggageDeliveryRequest } from 'apiSdk/luggage-delivery-requests';
import { Error } from 'components/error';
import { luggageDeliveryRequestValidationSchema } from 'validationSchema/luggage-delivery-requests';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { PorterInterface } from 'interfaces/porter';
import { AirlineInterface } from 'interfaces/airline';
import { getUsers } from 'apiSdk/users';
import { getPorters } from 'apiSdk/porters';
import { getAirlines } from 'apiSdk/airlines';
import { LuggageDeliveryRequestInterface } from 'interfaces/luggage-delivery-request';

function LuggageDeliveryRequestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LuggageDeliveryRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLuggageDeliveryRequest(values);
      resetForm();
      router.push('/luggage-delivery-requests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LuggageDeliveryRequestInterface>({
    initialValues: {
      status: '',
      end_customer_id: (router.query.end_customer_id as string) ?? null,
      porter_id: (router.query.porter_id as string) ?? null,
      airline_id: (router.query.airline_id as string) ?? null,
    },
    validationSchema: luggageDeliveryRequestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Luggage Delivery Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'end_customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<PorterInterface>
            formik={formik}
            name={'porter_id'}
            label={'Select Porter'}
            placeholder={'Select Porter'}
            fetcher={getPorters}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<AirlineInterface>
            formik={formik}
            name={'airline_id'}
            label={'Select Airline'}
            placeholder={'Select Airline'}
            fetcher={getAirlines}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'luggage_delivery_request',
    operation: AccessOperationEnum.CREATE,
  }),
)(LuggageDeliveryRequestCreatePage);
