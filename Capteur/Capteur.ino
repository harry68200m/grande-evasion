#include <rgb_lcd.h>
#include <SD.h>
#include <DS1307.h>

rgb_lcd lcd;
int sensorIn = A8;
DS1307 clock;

float TxCO2;

String MonServer = "www.mmi.iutmulhouse.uha.fr";
String Msg;
String Identifiant = "400";

void setup() {
  Serial.begin(115200); //Moniteur série
  Serial1.begin(115200);//Pour l'ESP (wifi)

  /*Horlage*/
  clock.begin();

  /*LCD*/
  lcd.begin(16,2);
  lcd.setRGB(200,200,200);
  lcd.setCursor(0,0);
  lcd.print(" Capteur de CO2 ");
  

  /*WIFI*/
   Serial1.print("AT+RST\r\n");
   delay(1000);
   Serial1.println("AT+CWMODE=1");
   delay(1000);
   Serial1.println("AT+CWJAP=\"SSID\",\"MdP\"");
   delay(2000); 

    for (int i = 60; i >= 0; i--) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.setRGB(119, 181, 254);
    lcd.print(" initialisation ");
    lcd.setCursor(2, 1);
    lcd.print(i);
    lcd.print("s");
    delay(1000);
    }
   
}

void loop() {

  clock.getTime();

  String LeJour=MonJour(clock.dayOfMonth, clock.month, clock.year+2000);
  String LHeure=MonHeure(clock.hour,clock.minute,clock.second);

  float Concentration = LectureCO2();
    
    Serial.print(LeJour+" --> ");
    Serial.println(LHeure);
    delay(1000);

    //Print CO2 concentration
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(" CO2: ");
    lcd.print(Concentration);
    lcd.print("ppm");
    
      if((Concentration>0)&&(Concentration<=1000)) {
        lcd.setRGB(0, 255, 0);
        lcd.setCursor(0, 1);
        lcd.print("  Taux CO2 bon  ");
        }
       else if((Concentration>1000)&&(Concentration<=1500)) {
        lcd.setRGB(255, 100, 0);
        lcd.setCursor(0, 1);
        lcd.print("Aerer la piece !");
        }
        else if((Concentration>1500)&&(Concentration<=5000)) {
        lcd.setRGB(255, 0, 0);
        lcd.setCursor(0, 1);
        lcd.print("    Danger !    ");
        }else {
        lcd.setRGB(255, 255, 255);
        lcd.setCursor(0, 1);
        lcd.print(" Erreur capteur ");
        }
  
  //delay(2000);

  
if (clock.minute%10==00)
  {/*Envoi du taux sur la BBD*/
  EnvoiCO2(Concentration, LeJour, LHeure);

  /*Ecriture sur la carte SD*/
  EcritureSD(Concentration, LeJour, LHeure);

  delay(50000); //On attend que la minute se termine
  }

}


float LectureCO2()
{
  int sensorValue = analogRead(sensorIn);
  float voltage = sensorValue*(5000/1024.0);
  int voltage_diference=voltage-400;
  float concentration=voltage_diference*50.0/16.0;
//float concentration=12;
  Serial.println("CO2 --> " + String(concentration));
  return concentration;
}

void EcritureSD(float concentration, String LeJour, String LHeure)
{

 if (!SD.begin(4)){
  Serial.println("Pas de carte");
      //lcd.setCursor(0,0);
      //lcd.print("Pas de carte SD        ");
    //sd=false;
  }
  else {
    Serial.println("Carte OK");
    //lcd.setCursor(0,0);
    //lcd.print("Carte SD Ok            ");
    //sd=true;
  }
  if(SD.exists("co2.txt")){
   Serial.println("Fichier existe");
  }
  else{
    Serial.println("Fichier n'existe pas");
}

  
   Serial.println("Ecriture carte");
   File co2=SD.open("co2.txt", FILE_WRITE);
   delay(1000);
    co2.println(LeJour + " " + LHeure + " " + concentration);
    delay(1000);
    co2.close();
    delay(1000);  
}

void EnvoiCO2(float concentration, String LeJour, String LHeure)
{
  Serial1.println("AT+CIPSTART=\"TCP\",\""+MonServer+"\",80"); 
  Serial.println("AT+CIPSTART=\"TCP\",\""+MonServer+"\",80");
  delay(1000);
  Msg = "GET /einsert.php?";
  Msg += "id="+Identifiant;
  Msg += "&nc=1";
  Msg += "&st=1";
  Msg += "&dt="+LeJour+"%20"+LHeure;
  Msg += "&var1="+(String)concentration;
  Msg += " HTTP/1.1\r\n";
  Msg += "Host: "+MonServer+"\r\n";
  Msg += "Connection: close\r\n";
  Msg += "\r\n";
  
  Serial.println(Msg.length());
  
 
  Serial1.print("AT+CIPSEND=");
  Serial1.println(Msg.length());
  Serial.print("AT+CIPSEND=");
  Serial.println(Msg.length());
  delay(1000);
  Serial1.print(Msg);
   Serial.print(Msg);
  
  delay(10000);
}
String MonHeure(int HH, int MM, int SS)
{    String time;

  
     if(HH < 10){
      time += '0'+String(HH)+':';    
     }
     else{
      time += String(HH)+':'; 
     }
     if(MM < 10){
      time += '0'+String(MM)+':';
     }
     else{
      time += String(MM)+':';
     }
     if(SS <10){
      time += '0'+String(SS);
     }
     else{
      time += String(SS);
     }
     
    
    return time;
}

String MonJour(int DD, int MM, int AA)
{    String LeJour;

    LeJour = String(AA)+'-'+String(MM)+'-'+String(DD);
     
    
    return LeJour;
}
