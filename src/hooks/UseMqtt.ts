import * as mqtt from "mqtt/dist/mqtt.min";
import { useEffect, useState } from "react";
import { MqttData, mqttMessageSchema } from "../types/types";
import useAuth from "../context/authContext";

/*
 *This hook is used to connect to the mqtt broker and subscribe to the readings topic.
 *It then parses the incoming messages and stores them in state.
 *It also returns the data in a format that can be used by the chart component.
 */
function useMqtt() {
  const auth = useAuth();
  const { credentials } = auth;
  if (!credentials) return null;

  // const wsUrl = credentials.brokerUrl;
  const wsUrl = "ws://localhost:8083/mqtt";
  const connectionOptions: mqtt.IClientOptions = {
    clientId: "web-client" + Math.random().toString(16).substring(2, 8),
    clean: false,
    connectTimeout: 4000,
    keepalive: 60,
    username: credentials.mqttUsername,
    password: credentials.mqttPassword,
  };

  /*
   *useState is a function provided by react that allows us to store data that can change over time.
   *The 1st argument is the current value of the state and the 2nd argument is a function that
   *allows us to change the value of the state.
   */
  const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
  const [mqttData, setMqttData] = useState<MqttData>({
    avianTemp: [],
    avianHum: [],
    reptTemp: [],
    reptHum: [],
    labels: [],
  });
  const [messageAllert, setMessageAllert] = useState<string>("");

  const topics: mqtt.ISubscriptionMap = {
    readings: { qos: 1 },
    "message/alert": { qos: 1 },
  };

  /*
   *useEffect is a function that allows us to run code when the component is mounted and when the
   *items in the depenedency array change.
   *It returns a function that is run when the component is unmounted.
   *This will run once when the component is mounted since the dependency array is empty.
   */
  useEffect(() => {
    const client = mqtt.connect(wsUrl, connectionOptions);
    client.on("connect", () => client.subscribe(topics));
    setMqttClient(client);
    return () => {
      client.end();
    };
  }, []);

  /*
   *This useEffect will run when the mqttClient changes.
   */
  useEffect(() => {
    if (mqttClient) {
      mqttClient.on("message", (topic, message) => {
        if (topic === "readings") {
          const received = mqttMessageSchema.parse(JSON.parse(message.toString()));
          setMqttData((prev) => ({
            avianTemp: [...prev.avianTemp, received.avian.temperature],
            avianHum: [...prev.avianHum, received.avian.humidity],
            reptTemp: [...prev.reptTemp, received.reptilian.temperature],
            reptHum: [...prev.reptHum, received.reptilian.humidity],
            labels: [...prev.labels, new Date().toLocaleTimeString()],
          }));
        } else if (topic === "message/alert") {
          console.log(message.toString());
          setMessageAllert(message.toString());
        }
      });
    }
  }, [mqttClient]);

  return { mqttData, messageAllert };
}

export default useMqtt;
