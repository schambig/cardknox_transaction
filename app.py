from flask import abort, Flask, jsonify, request
from cardknox import CardknoxRequest

app = Flask(__name__)

service = CardknoxRequest()

payload = {
  "xVersion": "4.5.9",
  "xSoftwareName": "YourSoftwareName",
  "xSoftwareVersion": "1.0.0",
  "xCustom01": "Register01",
  "xStreet": "123 Main Street",
  "xZip": "12345",
}

@app.route("/authonly")
def authonly():
  if request.method == "POST":
    payload.update({
      "xName": request.form["xName"],
      "xCardNum": request.form["xCardNum"],
      "xCVV": request.form["xCVV"],
      "xExp": request.form["xExp"],
      "xAmount": request.form["xAmount"],
    })
    return jsonify(service.authonly(payload))
  return abort(400, "Use the POST method >:(")

@app.route("/adjust")
def adjust():
  if request.method == "POST":
    payload.update({
      "xCardNum": request.form["xCardNum"],
      "xCVV": request.form["xCVV"],
      "xExp": request.form["xExp"],
      "xAmount": request.form["xNewAmount"],
      "xRefNum": request.form["xRefNum"],
    })
    return jsonify(service.adjust(payload))
  return abort(400, "Use the POST method >:(")
  
@app.route("/capture")
def capture():
  if request.method == "POST":
    payload.update({
      "xCardNum": request.form["xCardNum"],
      "xCVV": request.form["xCVV"],
      "xExp": request.form["xExp"],
      "xAmount": request.form["xNewAmount"],
      "xRefNum": request.form["xRefNum"],
    })
    return jsonify(service.adjust(payload))
  return abort(400, "Use the POST method >:(")


@app.route("/refund")
def refund():
  if request.method == "POST":
    payload.update({
      "xName": request.form["xName"],
      "xCardNum": request.form["xCardNum"],
      "xCVV": request.form["xCVV"],
      "xExp": request.form["xExp"],
      "xAmount": request.form["xAmount"],
    })
    return jsonify(service.refund(payload))
  return abort(400, "Use the POST method >:(")

if __name__ == "__main__":
  app.run()