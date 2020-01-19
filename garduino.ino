void setup() {
  Serial.begin(9600);
}

void loop() {
  int lectura = analogRead(A0);
  Serial.println(lectura);
  //12 hrs
  delay(43200);
}
