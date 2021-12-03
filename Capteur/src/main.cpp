#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ArduinoHttpClient.h>
#include <ESP8266HTTPClient.h>

// Configuration du WiFi
const char* WIFI_SSID = "NOM DU WIFI";
const char* WIFI_PASS = "MOTDEPASSE";

String GUID = "1222";

int switchPin = 0; // Pin de l'interrupteur
int temp = 0;   // dernier status releve

//Adresse du serveur
String serverName = "192.168.223.100:3000";

WiFiClient client;
HttpClient http = HttpClient(client, serverName);

void pushToApi(int value){
    HTTPClient http; 
 
    http.begin(client, "http://"+serverName+"/portillon/ajoutEvenement/" + GUID + "/" + String(value));      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
 
    int httpCode = http.POST("");
}

void setup()
{
  pinMode(switchPin, INPUT);


  //Connect to WIFI
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {   
    delay(5000);
  }
}

void loop()
{
  int value = digitalRead(switchPin);

  if (temp != value)
  {
    temp = value;
    pushToApi(!value);    
  }
  delay(500);

  if ((WiFi.status() != WL_CONNECTED)) {
    WiFi.disconnect();
    WiFi.reconnect();
  }
}
