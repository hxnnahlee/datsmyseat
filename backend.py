from flask import Flask, request
from array import array

app = Flask(__name__)

# define some arrays to store distances for each sensor
sensorOne  = array('q')
sensorTwo = array('q')
sensorThree = array('q')

for i in range(20):
    sensorOne.append(0)
    sensorTwo.append(0)
    sensorThree.append(0)


sensorOneCount = 0
sensorTwoCount = 0
senorThreeCount = 0

# Keep the known states for each sensor
#   0 for out
#   1 for semi-out
#   2 for in  
#   3 for semi-in
sensorOneState = 0
sensorTwoState = 0
sensorThreeState = 0

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# root
@app.route("/")
def index():
    """
    this is a root dir of my server
    :return: str
    """
    return "DATS MY SEAT!!"

# POST
#@app.route('/spots/<spot>', methods = ['POST'])
#def spot_taken(spot):

#    to_string = request.data.decode("utf-8")
#    print(to_string + "Hello")
    
#    return to_string

#if __name__ == "__main__":
#    app.run()
#testing purposes



## server on http://0.0.0.0:5000/
## visible across the network
## BaseUrl for Android http://<your ip address>:5000/spots/<spots>

# POST route for sensor #1
@app.route('/spots/1', methods = ['POST'])
def spot_taken(spot):
    currentDistance = request.data.decode("utf-8")

    # Person is currently not in the seat
    if sensorOneState == 0:
        if currentDistance < 300:
            sensorOneState = 1
            sensorOne[sensorOneCount] = currentDistance
            sensorOneCount += 1

    # Person might not be in the seat
    elif sensorOneState == 1:

        # We recorded 20 calls, time to make a state transition decision
        if sensorOneCount == 20:
            medianDistance = sensorOne[10]

            # Person probably walked pass the sensor
            if medianDistance > 300:
                sensorOneState = 0
                sensorOneCount = 0

            # There is a person in the seat now
            else:
                sensorOneState = 2
                sensorOneCount = 0

    # Person is in the seat 
    elif sensorOneState == 2:
        if currentDistance > 300:
            sensorOneState = 3
            sensorOne[sensorOneCount] = currentDistance
            sensorOneCount += 1

    # Person might be in the seat
    elif sensorOneState == 3:

        # We recorded 20 calls, time to make a state transition decision
        if sensorOneCount == 20:
            if medianDistance < 300:
                sensorOneState = 2
                sensorOneCount = 0

            else:
                sensorOneState = 0
                sensorOneCount = 0

    return sensorOneState