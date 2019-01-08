This is a university project for serverless course

# BabyCare
In Italy, since 1 july 2019, parents with children with age under 4, must use car with electronic devices that could instantly detect the presence of children in it. 
We are going to develop an application to detect the presence of children in the car when the parents lock the door.
The application send a notification on parents’ smartphone. 
When the car is lockdown and the child is in, sensors detect him and a message is sent to nuclio which send a warning message and a request of the gps coordinate to the smartphone. If the door is not unlocked, after some time a message is sent through IFTTT webhooks to a telegram channel (where some other favourites contacts could join) with the position of the car. It’s possible to show on devices some informations about the health conditions of the children, taken through a smartwatch or other devices. 
In this project we simulate with nodejs script, the car status (lock and unlock), the sensors to detect the child (if the children is in the car or not) and  the devices to collect health information. We are developing a client application for android phones and we are using nuclio and rabbitmq to send and receive messages.

### Library used
https://www.eclipse.org/paho/

https://github.com/eclipse/paho.mqtt.android

https://nuclio.io/

https://www.rabbitmq.com/

https://ifttt.com/
