import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const mqttMessageSchema = z.object({
  sensorOne: z.object({
    temperature: z.number().min(0).max(100),
    humidity: z.number().min(0).max(100),
  }),
  sensorTwo: z.object({
    temperature: z.number().min(0).max(100),
    humidity: z.number().min(0).max(100),
  }),
});

const readingSchema = z.object({
  _id: z.string(),
  avianTemp: z.number().min(0).max(100),
  avianHum: z.number().min(0).max(100),
  reptTemp: z.number().min(0).max(100),
  reptHum: z.number().min(0).max(100),
});

const readingResponse = z.object({
  readings: z.array(readingSchema),
});

const authResponseSchema = z.object({
  token: z.string(),
  brokerUrl: z.string(),
  mqttUsername: z.string(),
  mqttPassword: z.string(),
});

const mqttData = z.object({
  avianTemp: z.array(z.number()),
  avianHum: z.array(z.number()),
  reptTemp: z.array(z.number()),
  reptHum: z.array(z.number()),
  labels: z.array(z.string()),
});

export type Login = z.infer<typeof loginSchema>;
export type MqttMessage = z.infer<typeof mqttMessageSchema>;
export type Reading = z.infer<typeof readingResponse>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type MqttData = z.infer<typeof mqttData>;

export { loginSchema, mqttMessageSchema, readingResponse as readingsSchema, authResponseSchema };
