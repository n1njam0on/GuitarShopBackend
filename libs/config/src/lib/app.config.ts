import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const DEFAULT_MONGO_PORT = 27017;


export interface ApplicationConfig {
  environment: string | undefined;
  serveRoot: string | undefined;
  port: number;
  uploadDirectory: string;
  mongoDb: {
    host: string | undefined;
    port: number;
    user: string | undefined;
    name: string | undefined;
    password: string | undefined;
    authBase: string | undefined;
  },
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    serveRoot: process.env.SERVE_ROOT,
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    mongoDb: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    },
  };

  const validationSchema = Joi.object<ApplicationConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    serveRoot: Joi.string().required(),
    port: Joi.number().port().default(DEFAULT_PORT),
    uploadDirectory: Joi.string(),
    mongoDb: Joi.object({
      host: Joi.string().valid().hostname(),
      port: Joi.number().port(),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      authBase: Joi.string().required(),
    }),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Application Config]: Environments validation failed. Please check .env file.
      Error message: Mongo.${error.message}`,
    );
  }

  return config;
});