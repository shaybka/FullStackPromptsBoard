import os from "os";

/**
 * Get the local IP address of the machine dynamically based on the current network.
 * It will prioritize the Wi-Fi network if available.
 * 
 * @returns {string} The local IP address or "localhost" if no external IPv4 address is found.
 */
function getLocalIP() {
  try {
    const interfaces = os.networkInterfaces();
    let localIP = "localhost";
    // Look for Wi-Fi or Ethernet first, depending on availability
    const preferredInterfaces = ["Wi-Fi", "Ethernet"];  // Adjust based on your network adapter names
    for (const name of preferredInterfaces) {
      if (interfaces[name]) {
        for (const iface of interfaces[name]) {
          if (iface.family === "IPv4" && !iface.internal) {
            localIP = iface.address;
            break;
          }
        }
      }
      if (localIP !== "localhost") break; // Exit early if found
    }
    return localIP;
  } catch (error) {
    console.error("Error retrieving network interfaces:", error);
    return "localhost";
  }
}

export default getLocalIP;
