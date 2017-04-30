
#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <ESP8266WifiClient.h>

#define USE_SERIAL Serial

char ssid[] = "YourNetworksSSID/NAME";     //  your network SSID (name)
char pass[] = "#########";
char ip[] = "000.000.00.00"; //Your ip address. can be got from running "ipconfig" in your command prompt
char port[] = '8080';

ESP8266WiFiMulti WiFiMulti;

void setup() {

    USE_SERIAL.begin(115200);
   // USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    USE_SERIAL.printf("[SETUP] Connecting to %s", ssid);
    WiFiMulti.addAP(ssid, pass);
  
}

void loop() {
      
    // wait for WiFi connection
    if((WiFiMulti.run() == WL_CONNECTED)) {
        
        HTTPClient http;

        USE_SERIAL.print("[HTTP] begin...\n");
        // configure traged server and url
        USE_SERIAL.print("[HTTP] Hitting endpoint: http://"+ ip + ":" + port + "/button-hit");
        http.begin("http://"+ ip + ":" + port + "/button-hit"); //HTTP

        USE_SERIAL.print("[HTTP] GET...\n");
        // start connection and send HTTP header
        int httpCode = http.GET();

        // httpCode will be negative on error
        if(httpCode > 0) {
            // HTTP header has been send and Server response header has been handled
            USE_SERIAL.printf("[HTTP] GET... code: %d\n", httpCode);

            // file found at server
            if(httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                USE_SERIAL.println(payload);
            }
        } else {
            USE_SERIAL.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
        }

        http.end();
    }

    delay(10000);
}
