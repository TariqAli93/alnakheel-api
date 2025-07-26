import { z } from "zod";

export const propertySchema = z.object({
  name: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  kind: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  district: z.string().optional().nullable(),
  street: z.string().optional().nullable(),
  block: z.string().optional().nullable(),
  alley: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  salePrice: z.string().optional().nullable(),
  owner: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  width: z.string().optional().nullable(),
  depth: z.string().optional().nullable(),
  landNumber: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  floors: z.string().optional().nullable(),
  rooms: z.string().optional().nullable(),
  bathrooms: z.string().optional().nullable(),
  shops: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  elevator: z.string().optional().nullable(),
  status: z.string().optional().nullable()
});
