from flask import Flask, request
app = Flask(__name__)


# root
@app.route("/")
def index():
    """
    this is a root dir of my server
    :return: str
    """
    return "DATS MY SEAT!!"

# POST
@app.route('/spots/<spot>', methods = ['POST'])
def spot_taken(spot):

    to_string = request.data.decode("utf-8")
    print(to_string)
    
    return to_string

#if __name__ == "__main__":
#    app.run()
#testing purposes

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

## server on http://0.0.0.0:5000/
## visible across the network
## BaseUrl for Android http://<your ip address>:5000/spots/<spots>

