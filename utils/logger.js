import fs from "fs";
import path from "path";

const logDir = path.resolve("logs");
const logFilePath = path.join(logDir, "log.txt");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const logErrorToFile = (error) => {
  const logMessage = `[${new Date().toISOString()}] ${
    error.stack || error.message
  }\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });
};
