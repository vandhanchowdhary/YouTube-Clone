import mongoose from "mongoose";
import { setServers } from "node:dns";

const connectDB = async () => {
  try {
    const configuredDnsServers = process.env.MONGO_DNS_SERVERS;
    if (configuredDnsServers !== undefined) {
      const dnsServers = configuredDnsServers.split(",").map((server) => server.trim());
      if (dnsServers.some((server) => !server)) {
        throw new Error("MONGO_DNS_SERVERS must be a comma-separated list of DNS server IP addresses.");
      }
      setServers(dnsServers);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("📚 Database connected with 🍃 MongoDB Atlas\n");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;