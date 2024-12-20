// Check for NFC support
if (!('NDEFReader' in window)) {
    log("Web NFC is not supported on this device.");
  }
  
  // Utility function to log messages
  function log(message) {
    const logContainer = document.getElementById("log");
    const logEntry = document.createElement("p");
    logEntry.textContent = message;
    logContainer.appendChild(logEntry);
  }
  
  // NFC Read Functionality
  document.getElementById("readNfc").addEventListener("click", async () => {
    try {
      const nfcReader = new NDEFReader();
      await nfcReader.scan();
      log("NFC Scan started. Hold a tag near the device.");
  
      nfcReader.onreading = (event) => {
        const message = event.message;
        log("NFC Tag Read:");
        for (const record of message.records) {
          const textDecoder = new TextDecoder(record.encoding || "utf-8");
          log(`Record type: ${record.recordType}`);
          log(`Data: ${textDecoder.decode(record.data)}`);
        }
      };
  
      nfcReader.onerror = (error) => {
        log(`Error during NFC reading: ${error.message}`);
      };
    } catch (error) {
      log(`Error initializing NFC reader: ${error.message}`);
    }
  });
  
  // NFC Write Functionality - Text
  document.getElementById("writeNfc").addEventListener("click", async () => {
    const data = document.getElementById("writeData").value;
    if (!data) {
      log("Please enter data to write to the NFC tag.");
      return;
    }
  
    try {
      const nfcWriter = new NDEFReader();
      await nfcWriter.write(data);
      log(`Text data written to NFC tag: "${data}"`);
    } catch (error) {
      log(`Error writing to NFC tag: ${error.message}`);
    }
  });
  
  // NFC Write Functionality - Links
  document.getElementById("writeLinkNfc").addEventListener("click", async () => {
    const link = document.getElementById("writeLink").value;
    if (!link || !link.startsWith("http")) {
      log("Please enter a valid URL (must start with http or https).");
      return;
    }
  
    try {
      const nfcWriter = new NDEFReader();
      const record = {
        recordType: "url",
        data: link,
      };
      await nfcWriter.write({ records: [record] });
      log(`Link written to NFC tag: "${link}"`);
    } catch (error) {
      log(`Error writing link to NFC tag: ${error.message}`);
    }
  });
  