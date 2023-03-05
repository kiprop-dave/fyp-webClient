import * as mqtt from "mqtt/dist/mqtt.min";
import { useEffect, useState } from "react";
import { MqttMessage } from "../types/types";
import useAuth from "../context/authContext";

function useMqtt() {
  const auth = useAuth();
  const { credentials } = auth;
  if (!credentials) return null;

  const wsUrl = credentials.brokerUrl;
  const connectionOptions: mqtt.IClientOptions = {
    clientId: "web-client",
    clean: false,
    connectTimeout: 4000,
    keepalive: 60,
    username: credentials.mqttUsername,
    password: credentials.mqttPassword,
  };
  const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
  const [avianTemp, setAvianTemp] = useState<number[]>([]);
  const [avianHum, setAvianHum] = useState<number[]>([]);
  const [reptTemp, setReptTemp] = useState<number[]>([]);
  const [reptHum, setReptHum] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const client = mqtt.connect(wsUrl, connectionOptions);
    setMqttClient(client);
    return () => {
      client.end();
    };
  }, []);

  const topics: mqtt.ISubscriptionMap = {
    readings: { qos: 1 },
  };

  useEffect(() => {
    if (mqttClient) {
      mqttClient.subscribe(topics);
      mqttClient.on("message", (topic, message) => {
        const received: MqttMessage = JSON.parse(message.toString());
        setAvianTemp((prev) => [...prev, received.sensorOne.temperature]);
        setAvianHum((prev) => [...prev, received.sensorOne.humidity]);
        setReptTemp((prev) => [...prev, received.sensorTwo.temperature]);
        setReptHum((prev) => [...prev, received.sensorTwo.humidity]);
        setLabels((prev) => [...prev, new Date().toLocaleTimeString()]);
      });
    }
  }, [mqttClient]);

  return { avianTemp, avianHum, reptTemp, reptHum, labels };
}

export default useMqtt;
