import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const mqttMessageSchema = z.object({
  reading: z.object({
    sensorOne: z.object({
      temperature: z.number().min(0).max(100),
      humidity: z.number().min(0).max(100),
    }),
    sensorTwo: z.object({
      temperature: z.number().min(0).max(100),
      humidity: z.number().min(0).max(100),
    }),
  }),
});

const dataSchema = z.object({
  _id: z.string(),
  sensorOne: z.number().min(0).max(100),
  sensorTwo: z.number().min(0).max(100),
});

const allReadingsSchema = z.object({
  temperatureReadings: z.array(dataSchema),
  humidityReadings: z.array(dataSchema),
});

export type Login = z.infer<typeof loginSchema>;
export type MqttMessage = z.infer<typeof mqttMessageSchema>;
export type Data = z.infer<typeof dataSchema>;
export type Reading = z.infer<typeof allReadingsSchema>;

export { loginSchema, mqttMessageSchema, allReadingsSchema as readingsSchema };
