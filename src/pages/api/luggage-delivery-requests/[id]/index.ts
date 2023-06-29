import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { luggageDeliveryRequestValidationSchema } from 'validationSchema/luggage-delivery-requests';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.luggage_delivery_request
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLuggageDeliveryRequestById();
    case 'PUT':
      return updateLuggageDeliveryRequestById();
    case 'DELETE':
      return deleteLuggageDeliveryRequestById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLuggageDeliveryRequestById() {
    const data = await prisma.luggage_delivery_request.findFirst(
      convertQueryToPrismaUtil(req.query, 'luggage_delivery_request'),
    );
    return res.status(200).json(data);
  }

  async function updateLuggageDeliveryRequestById() {
    await luggageDeliveryRequestValidationSchema.validate(req.body);
    const data = await prisma.luggage_delivery_request.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLuggageDeliveryRequestById() {
    const data = await prisma.luggage_delivery_request.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
