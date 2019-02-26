from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
import re
import numpy as np
import pickle
import sklearn


app = Flask(__name__)
CORS(app)

ELEM_SEQ = ["Li", "Be", "B", "O", "Na", "Mg",
            "Al", "Si", "P", "K", "Ca", "Sc",
            "Ti", "V", "Cr", "Mn", "Fe", "Co",
            "Ni", "Cu", "Zn", "Ga", "Ge", "As",
            "Se", "Rb", "Sr", "Y", "Zr", "Nb",
            "Mo", "Ru", "Rh", "Pd", "Ag", "Cd",
            "In", "Sn", "Sb", "Te", "Cs", "Ba",
            "La", "Ce", "Pr", "Nd", "Sm", "Eu",
            "Gd", "Tb", "Dy", "Ho", "Er", "Tm",
            "Yb", "Lu", "Hf", "Ta", "W", "Hg",
            "Tl", "Pb", "Bi", "Th", "U"]

ELEM_POS = {ELEM_SEQ[i]: i for i in range(0, len(ELEM_SEQ))}

MODELS = {
    "TG": {
        "DT": pickle.load(open("models/dt_tg.model", "rb")),
        "kNN": pickle.load(open("models/knn_tg.model", "rb")),
        "MLP": pickle.load(open("models/mlp_tg.model", "rb")),
        "RF": pickle.load(open("models/mlp_tg.model", "rb")),
        "SVR": pickle.load(open("models/svr_tg.model", "rb"))
    },
    "TL": {
        "DT": pickle.load(open("models/dt_tl.model", "rb")),
        "kNN": pickle.load(open("models/knn_tl.model", "rb")),
        "MLP": pickle.load(open("models/mlp_tl.model", "rb")),
        "RF": pickle.load(open("models/mlp_tl.model", "rb")),
        "SVR": pickle.load(open("models/svr_tl.model", "rb"))
    },
    "ND300": {
        "DT": pickle.load(open("models/dt_n300.model", "rb")),
        "kNN": pickle.load(open("models/knn_nd300.model", "rb")),
        "MLP": pickle.load(open("models/mlp_nd300.model", "rb")),
        "RF": pickle.load(open("models/mlp_nd300.model", "rb")),
        "SVR": pickle.load(open("models/svr_nd300.model", "rb"))
    }
}
GLASS_PROPERTY = ["ND300", "TG", "TL"]
ML_ALGORITHM = ["DT", "kNN", "MLP", "RF", "SVR"]

@app.route('/')
def hello_world():
    return 'Hello, World!'


def valid_predict(formula, glass_property, ml_algorithm):
    """TODO"""
    return True


def predictors_info(error):
    return jsonify(glass_property=GLASS_PROPERTY,
                   ml_algorithm=ML_ALGORITHM, error=error)


def predict(formula, glass_property, ml_algorithm):
    instance = to_numpy(compounddic2atomsfraction(
        formula2composition(formula)))
    value = MODELS[glass_property][ml_algorithm].predict(instance)
    return jsonify({'formula': formula,
                    'glass_property': glass_property,
                    'ml_algorithm': ml_algorithm,
                    'value': "{0:.4f}".format(value[0])})

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
            aux = predict(formula, glass_property, ml_algorithm)
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


def formula2composition(formula):
    """
    Transform formula to composition, should be simple formulas with integer numbers and no parentheses
    Ex: Li2O --> {'Li': 2, 'O':1}
    :param formula:
    :return: dictionary
    """
    composition = {}
    for e in re.findall(r'([A-Z][a-z]*)(\d*)', formula):
        val = e[1]
        if val == '':
            val = 1
        composition[e[0]] = int(val)
    return composition


def compounddic2atomsfraction(compounds):

    def createNewDic(dic, multiplyby):
        values = list(dic.values())
        keys = dic.keys()
        newValues = np.array(values)*multiplyby
        newDic = dict(zip(keys, newValues))
        return newDic

    def composition2atoms(cstr):
        lst = re.findall(r'([A-Z][a-z]?)(\d*\.?\d*)', cstr)
        dic = {}
        for i in lst:
            if len(i[1]) > 0:
                try:
                    dic[i[0]] = int(i[1])
                except ValueError:
                    dic[i[0]] = float(i[1])
            else:
                dic[i[0]] = 1
                return dic

    dic = {}

    for key in compounds.keys():
        baseValue = compounds[key]
        atoms = composition2atoms(key)
        for a in atoms.keys():
            dic[a] = dic.get(a, 0) + atoms[a]*baseValue

    multiplyby = 1.0/np.sum(list(dic.values()))
    atomsF = createNewDic(dic, multiplyby)

    return atomsF

def to_numpy(composition):
    vector = np.zeros((1, len(ELEM_SEQ)))
    for comp in composition:
        vector[0, ELEM_POS[comp]] = composition[comp]

    return vector
