import { config } from "dotenv";
import path from "path";
import { object, string, number } from "zod";


const pathName = process.env.NODE_ENV === "development" ? path.resolve(process.cwd(), `.env.development`) : path.resolve(process.cwd(), `.env.production`)

// Load environment variables from the specified file
config({ path: pathName });

const ConfigSchema = object({
  NODE_ENV: string().nonempty(),
  TZ: string().nonempty(),
  PORT: number(),
  SERVER_DOMAIN: string().nonempty(),
  DATABASE_URL: string().url().nonempty(),
  JWT_SECRET: string().nonempty(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: string().nonempty(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: string().nonempty()
});

const envVariables = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  TZ: process.env.TZ ?? "Asia/Kolkata",
  PORT: process.env.PORT ? Number(process.env.PORT) : 3003,
  SERVER_DOMAIN: process.env.SERVER_DOMAIN ?? "",
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN ?? "",
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN ?? ""
};

let Config;

try {
  Config = ConfigSchema.parse(envVariables);

  console.log("Environment variables loaded successfully.");
} catch (error) {
  // Log and exit if validation fails
  if (error.errors) {
    console.error("Invalid environment variables:", error.errors);
  } else {
    console.error("Invalid environment variables:", error);
  }
  process.exit(1);
}

export { Config };
