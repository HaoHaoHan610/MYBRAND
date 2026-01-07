from flask import Blueprint, request, jsonify
from schemas.inputschema import PotentialAnalysisSchema,PersonalProfileSchema  

from ....agent.models import PotentialAnalysis,PersonalProfile

PotentialAnalysisRequest = PotentialAnalysisSchema()
PersonalProfileRequest = PersonalProfileSchema()

bp = Blueprint("UserInput",__name__,url_prefix="/input")

@bp.route("/potential",method = ["POST"]):
def PotentialAnalysisInput():
    data = PotentialAnalysisRequest.get_json()
    errors = PotentialAnalysisRequest.validate(data)
    if errors:
        return jsonify(errors),400
    try:
       potential = PotentialAnalysis(
      major = data.get("major"),
      gpa= data.get("gpa"),
      year = data.get("year"),
      strengths=data.get("strengths"),
      language = data.get("langugage"),
      achievements=data.get("achievements"),
      mentor=data.get("mentor")
       )
       return jsonify(PotentialAnalysisRequest.dump(potential)),201
    except Exception as e:
        return jsonify({"error":str(e)}),400

@bp.route("/personality",method = ["POST"]):
def PersonalProfileInput():
    data = PersonalProfileRequest.get_json()
    errors = PersonalProfileRequest.validate(data)
    if errors:
        return jsonify(errors),400
