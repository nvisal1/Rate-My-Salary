from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import joblib

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict')
@cross_origin()
def predictSalary():
    experience = request.args.get('experience')
    if experience is None:
        return jsonify({"Error": "Bad Request"}), 400
    else:
        loaded_model = joblib.load('../Simple_Linear_Regression/model.sav')
        result = loaded_model.predict([[float(experience)]])
        return jsonify({"predicted_salary": result[0]}), 200

if __name__ == '__main__':
  app.run(debug=True)