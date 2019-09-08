import static spark.Spark.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import com.google.gson.Gson;
import Database.SensorData;

public class App {

    // static int sensorOneCounter = 0;
    // static int sensorTwoCounter = 0;
    // static int sensorThreeCounter = 0;

    static int[] sensorOne = new int[15];
    static int[] sensorTwo = new int[15];
    static int[] sensorThree = new int[15];

    // static int sensorOneState = 0;
    // static int sensorTwoState = 0;
    // static int sensorThreeState = 0;

    static boolean trigger = false;

    public static void main(String[] args) {
        port(getHerokuAssignedPort());
        final Gson gson = new Gson();

        // Establish a connection to our postgres database
        final Database dataBase = Database.getDatabase();

        get("/hello", (req, res) -> "Hello Heroku World");

        get("/sensor", (request, response) -> {
            return gson.toJson(dataBase.selectAllSensors());
        });

        get("/twilio", (request, response) -> {
            System.out.println("Triggeredddddd");
            trigger = true;
            return null;
        });

        post("/sensor", (request, response) -> {

            String[] body = request.body().split(" ");

            // Sensor number will be first followed by the sensor distance with a space
            int sensorNum = Integer.parseInt(body[0]);
            int currentDistance = Integer.parseInt(body[1]);

            int sensorState = dataBase.selectSensor(sensorNum).getState();
            int sensorCount = dataBase.selectSensor(sensorNum).getCount();

            // When you are not in the seat
            if (sensorState == 0) {
                if (currentDistance < 300) {
                    sensorState = 1;
                    sensorOne[sensorCount] = currentDistance;
                    sensorCount++;
                }

                System.out.println("Nobody is in the seat");
            }

            // Was it just a person passing by?
            else if (sensorState == 1) {
                int mediumDistance = 0;

                if (sensorCount == 8) {
                    Arrays.sort(sensorOne);
                    mediumDistance = sensorOne[4];

                    if (mediumDistance > 300) {
                        sensorState = 0;
                        sensorCount = 0;
                    }

                    else {
                        sensorState = 2;
                        sensorCount = 0;
                    }
                }

                else {
                    sensorOne[sensorCount] = currentDistance;
                    sensorCount++;
                }

                System.out.println("Did someone just pass by or they sitting down?");
            }

            // You are in the chair
            else if (sensorState == 2) {
                if (currentDistance > 300) {
                    sensorState = 3;
                    sensorOne[sensorCount] = currentDistance;
                    sensorCount++;
                }

                System.out.println("Someone is in the seat...");
            }

            // Bathroom break?
            else if (sensorState == 3) {
                int mediumDistance = 0;

                if (sensorCount == 8) {
                    Arrays.sort(sensorOne);
                    mediumDistance = sensorOne[4];

                    if (mediumDistance < 300) {
                        sensorState = 2;
                        sensorCount = 0;
                    }

                    else {
                        sensorState = 0;
                        sensorCount = 0;
                    }
                }

                else {
                    sensorOne[sensorCount] = currentDistance;
                    sensorCount++;
                }

                System.out.println("Did the person leave to go to bathroom?");
            }

            return null;
        });

        // route for posting tags to comments
        post("/sensor/1", (request, response) -> {

            int currentDistance = Integer.parseInt(request.body());
            int sensorOneState = dataBase.selectSensor(1).state;
            int sensorOneCounter = dataBase.selectSensor(1).count;

            // When you are not in the seat
            if (sensorOneState == 0) {
                if (currentDistance < 100) {
                    sensorOneState = 1;
                    sensorOne[sensorOneCounter] = currentDistance;
                    sensorOneCounter++;
                }

                System.out.println("Nobody is in the seat");
            }

            // Was it just a person passing by?
            else if (sensorOneState == 1) {
                int mediumDistance = 0;

                if (sensorOneCounter == 8) {
                    Arrays.sort(sensorOne);
                    mediumDistance = sensorOne[4];

                    if (mediumDistance > 100) {
                        sensorOneState = 0;
                        sensorOneCounter = 0;
                    }

                    else {
                        sensorOneState = 2;
                        sensorOneCounter = 0;
                    }
                }

                else {
                    sensorOne[sensorOneCounter] = currentDistance;
                    sensorOneCounter++;
                }

                System.out.println("Did someone just pass by or they sitting down?");
            }

            // You are in the chair
            else if (sensorOneState == 2) {
                if (currentDistance > 100) {
                    sensorOneState = 3;
                    sensorOne[sensorOneCounter] = currentDistance;
                    sensorOneCounter++;
                }

                System.out.println("Someone is in the seat...");
            }

            // Bathroom break?
            else if (sensorOneState == 3) {
                int mediumDistance = 0;

                if (sensorOneCounter == 8) {
                    Arrays.sort(sensorOne);
                    mediumDistance = sensorOne[4];

                    if (mediumDistance < 100) {
                        sensorOneState = 2;
                        sensorOneCounter = 0;
                    }

                    else {
                        sensorOneState = 0;
                        sensorOneCounter = 0;
                    }
                }

                else {
                    sensorOne[sensorOneCounter] = currentDistance;
                    sensorOneCounter++;
                }

                System.out.println("Did the person leave to go to bathroom?");
            }

            dataBase.updateCount(1, sensorOneCounter);
            dataBase.updateState(1, sensorOneState);

            if (trigger && isThereSpace(dataBase)) {
                System.out.println("Sending text....");
                contactTwilio();
                trigger = false;
            }
            return sensorOneState;
        });

        // route for posting tags to comments
        post("/sensor/2", (request, response) -> {

            int currentDistance = Integer.parseInt(request.body());
            int sensorTwoState = dataBase.selectSensor(2).state;
            int sensorTwoCounter = dataBase.selectSensor(2).count;

            // When you are not in the seat
            if (sensorTwoState == 0) {
                if (currentDistance < 100) {
                    sensorTwoState = 1;
                    sensorTwo[sensorTwoCounter] = currentDistance;
                    sensorTwoCounter++;
                }

                System.out.println("Nobody is in the seat");
            }

            // Was it just a person passing by?
            else if (sensorTwoState == 1) {
                int mediumDistance = 0;

                if (sensorTwoCounter == 8) {
                    Arrays.sort(sensorTwo);
                    mediumDistance = sensorTwo[4];

                    if (mediumDistance > 100) {
                        sensorTwoState = 0;
                        sensorTwoCounter = 0;
                    }

                    else {
                        sensorTwoState = 2;
                        sensorTwoCounter = 0;
                    }
                }

                else {
                    sensorTwo[sensorTwoCounter] = currentDistance;
                    sensorTwoCounter++;
                }

                System.out.println("Did someone just pass by or they sitting down?");
            }

            // You are in the chair
            else if (sensorTwoState == 2) {
                if (currentDistance > 100) {
                    sensorTwoState = 3;
                    sensorTwo[sensorTwoCounter] = currentDistance;
                    sensorTwoCounter++;
                }

                System.out.println("Someone is in the seat...");
            }

            // Bathroom break?
            else if (sensorTwoState == 3) {
                int mediumDistance = 0;

                if (sensorTwoCounter == 8) {
                    Arrays.sort(sensorTwo);
                    mediumDistance = sensorTwo[4];

                    if (mediumDistance < 100) {
                        sensorTwoState = 2;
                        sensorTwoCounter = 0;
                    }

                    else {
                        sensorTwoState = 0;
                        sensorTwoCounter = 0;
                    }
                }

                else {
                    sensorTwo[sensorTwoCounter] = currentDistance;
                    sensorTwoCounter++;
                }

                System.out.println("Did the person leave to go to bathroom?");
            }

            dataBase.updateCount(2, sensorTwoCounter);
            dataBase.updateState(2, sensorTwoState);
            return sensorTwoState;
        });

        // route for posting tags to comments
        post("/sensor/3", (request, response) -> {

            int currentDistance = Integer.parseInt(request.body());
            int sensorThreeState = dataBase.selectSensor(3).state;
            int sensorThreeCounter = dataBase.selectSensor(3).count;

            // When you are not in the seat
            if (sensorThreeState == 0) {
                if (currentDistance < 100) {
                    sensorThreeState = 1;
                    sensorThree[sensorThreeCounter] = currentDistance;
                    sensorThreeCounter++;
                }

                System.out.println("Nobody is in the seat");
            }

            // Was it just a person passing by?
            else if (sensorThreeState == 1) {
                int mediumDistance = 0;

                if (sensorThreeCounter == 8) {
                    Arrays.sort(sensorThree);
                    mediumDistance = sensorTwo[4];

                    if (mediumDistance > 100) {
                        sensorThreeState = 0;
                        sensorThreeCounter = 0;
                    }

                    else {
                        sensorThreeState = 2;
                        sensorThreeCounter = 0;
                    }
                }

                else {
                    sensorThree[sensorThreeCounter] = currentDistance;
                    sensorThreeCounter++;
                }

                System.out.println("Did someone just pass by or they sitting down?");
            }

            // You are in the chair
            else if (sensorThreeState == 2) {
                if (currentDistance > 100) {
                    sensorThreeState = 3;
                    sensorThree[sensorThreeCounter] = currentDistance;
                    sensorThreeCounter++;
                }

                System.out.println("Someone is in the seat...");
            }

            // Bathroom break?
            else if (sensorThreeState == 3) {
                int mediumDistance = 0;

                if (sensorThreeCounter == 8) {
                    Arrays.sort(sensorThree);
                    mediumDistance = sensorThree[4];

                    if (mediumDistance < 100) {
                        sensorThreeState = 2;
                        sensorThreeCounter = 0;
                    }

                    else {
                        sensorThreeState = 0;
                        sensorThreeCounter = 0;
                    }
                }

                else {
                    sensorThree[sensorThreeCounter] = currentDistance;
                    sensorThreeCounter++;
                }

                dataBase.updateCount(3, sensorThreeCounter);
                dataBase.updateState(3, sensorThreeState);
                System.out.println("Did the person leave to go to bathroom?");
            }

            return sensorThreeState;
        });
    }

    public static boolean isThereSpace(Database dataBase) {
        int count = 0;

        for (Database.SensorData data : dataBase.selectAllSensors()) {
            if (data.getState() <= 1)
                count++;
        }

        if (count >= 2)
            return true;

        else
            return false;
    }

    public static void contactTwilio() throws IOException {
        URL url;
        url = new URL("https://unitingdust.api.stdlib.com/treehacks2019@dev/?tel=7183167019&option=OPEN");
       
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.getResponseCode();
        con.disconnect();
    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567; //return default port if heroku-port isn't set (i.e. on localhost)
    }
}