from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'


def valid_predict(formula, glass_property, ml_algorithm):
    return True


def predictors_info(error):
    return jsonify(glass_property=["TG", "TL", "ND300"],
                   ml_algorithm=["RF", "DT", "kNN"], error=error)


def predict(formula, glass_property, ml_algorithm):
    return jsonify(teste="teste")

# def predict_(formula, glass_property, ml_algorithm):
#     result = {"Li": 0.0, "Be": 0.0, "B": 0.0, "O": 0.0, "Na": 0.0, "": 0.0,
#               "Al": 0.0, "Si": 0.0, "P": 0.0, "K": 0.0, "Ca": 0.0, "Sc": 0.0,
#               "Ti": 0.0, "V": 0.0, "Cr": 0.0, "Mn": 0.0, "Fe": 0.0, "Co": 0.0,
#               "Ni": 0.0, "Cu": 0.0, "Zn": 0.0, "Ga": 0.0, "Ge": 0.0, "As": 0.0,
#               "Se": 0.0, "Rb": 0.0, "Sr": 0.0, "Y": 0.0, "Zr": 0.0, "Nb": 0.0,
#               "Mo": 0.0, "Ru": 0.0, "Rh": 0.0, "Pd": 0.0, "Ag": 0.0, "Cd": 0.0,
#               "In": 0.0, "Sn": 0.0, "Sb": 0.0, "Te": 0.0, "Cs": 0.0, "Ba": 0.0,
#               "La": 0.0, "Ce": 0.0, "Pr": 0.0, "Nd": 0.0, "Sm": 0.0, "Eu": 0.0,
#               "Gd": 0.0, "Tb": 0.0, "Dy": 0.0, "Ho": 0.0, "Er": 0.0, "Tm": 0.0,
#               "Yb": 0.0, "Lu": 0.0, "Hf": 0.0, "Ta": 0.0, "W": 0.0, "Hg": 0.0,
#               "Tl": 0.0, "Pb": 0.0, "Bi": 0.0, "Th": 0.0, "U": 0.0, "Tg": 0.0}
#     return jsonify(result)

def predict_(formula, glass_property, ml_algorithm):
    return jsonify({'formula': formula, 'glass_property': glass_property,
                    'ml_algorithm': ml_algorithm, 'value': 0.22})

@app.route('/predict', methods=['POST', 'GET'])
def predict_http():
    error = None
    if request.method == 'POST':
        req = request.get_json()
        print(req)
        formula = req['formula']
        glass_property = req['glass_property']
        ml_algorithm = req['ml_algorithm']
        if valid_predict(formula,
                         glass_property,
                         ml_algorithm):
            aux = predict_(formula, glass_property, ml_algorithm)
            print(aux)
            return aux
        else:
            error = 'Invalid predict arguments'
    # the code below is executed if the request method
    # was GET or the credentials were invalid
    return predictors_info(error=error)


@app.route('/predict_info')
def summary():
    return predictors_info()
