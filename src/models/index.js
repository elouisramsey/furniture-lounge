// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, file } = initSchema(schema);

export {
  Product,
  file
};