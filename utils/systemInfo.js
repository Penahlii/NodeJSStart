import os from "os";

export const getSystemInfo = () => {
  const totalRam = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  const freeRam = (os.freemem() / (1024 * 1024)).toFixed(2) + " MB";
  const runningTime = (os.uptime() / (60 * 60)).toFixed(2) + " hours";
  const osType = os.type();

  const ipv4 =
    Object.values(os.networkInterfaces())
      .flat()
      .find((i) => i.family === "IPv4" && !i.internal)?.address || "N/A";

  return {
    os: osType,
    totalRam,
    freeRam,
    runningTime,
    ipv4,
  };
};
