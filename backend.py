from flask import Flask, request
from array import array
from flask import g
import threading

app = Flask(__name__)
threadLock = threading.Lock()


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
sensorTwoState = 0
sensorThreeState = 0

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

def get_sensorOneCount():
    sensorOneCount = getattr(g, '_sensorOneCount', None)
    if sensorOneCount is None:
        g._sensorOneCount = 0

    return g._sensorOneCount

def set_sensorOneCount(newValue):
    sensorOneCount = get_sensorOneCount()
    sensorOneCount = newValue
    setattr(g, '_sensorOneCount', sensorOneCount)

def get_sensorOneState():
    sensorOneState = getattr(g, '_sensorOneState', None)
    if sensorOneState is None:
        g._sensorOneState = 0

    return g._sensorOneState

def set_sensorOneState(newValue):
    sensorOneState = get_sensorOneState()
    sensorOneState = newValue
    setattr(g, '_sensorOneState', sensorOneState)

    return g._sensorOneState


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
def spot_taken():
    threadLock.acquire()

    currentDistance = int(request.data.decode("utf-8"))
    #sensorOneCount = get_sensorOneCount()
    sensorOneState = get_sensorOneState()
    global sensorOneCount 

    #print("State: " + str(get_sensorOneState()))

    print(sensorOneCount)
    sensorOneCount = sensorOneCount + 1

    set_sensorOneState(sensorOneState + 1)

    threadLock.release()
    return str(get_sensorOneState())


"""
    # Person is currently not in the seat
    if int(sensorOneState) == 0:
        if currentDistance < 300:
            set_sensorOneState(1)
            sensorOne[sensorOneCount] = currentDistance
            set_sensorOneCount(sensorOneCount + 1)

    # Person might not be in the seat
    elif int(sensorOneState) == 1:

        # We recorded 20 calls, time to make a state transition decision
        if sensorOneCount == 20:
            sensorOne.sort()
            medianDistance = sensorOne[10]

            # Person probably walked pass the sensor
            if medianDistance > 300:
                set_sensorOneState(0)
                set_sensorOneCount(0)

            # There is a person in the seat now
            else:
                set_sensorOneState(2)
                set_sensorOneCount(0)

        else:
            sensorOne[sensorOneCount] = currentDistance
            set_sensorOneCount(sensorOneCount + 1)

    # Person is in the seat 
    elif sensorOneState == 2:
        if currentDistance > 300:
            set_sensorOneState(3)
            sensorOne[sensorOneCount] = currentDistance
            set_sensorOneCount(sensorOneCount + 1)

    # Person might be in the seat
    elif sensorOneState == 3:

        # We recorded 20 calls, time to make a state transition decision
        if sensorOneCount == 20:
            if medianDistance < 300:
                set_sensorOneState(2)
                set_sensorOneCount(0)

            else:
                set_sensorOneState(0)
                set_sensorOneCount(0)

    print("Count: " + str(get_sensorOneCount()))

    """
    #return str(get_sensorOneState())