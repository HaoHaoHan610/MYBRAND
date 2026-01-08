from flask import Blueprint, jsonify, request

from api.schemas.inputschema import PotentialAnalysisSchema, PersonalProfileSchema
from agent.models import PotentialAnalysis, PersonalProfile

from pathlib import Path
import json

PotentialAnalysisRequest = PotentialAnalysisSchema()
PersonalProfileRequest = PersonalProfileSchema()

bp = Blueprint("UserInput",__name__,url_prefix="/input")


@bp.route("/potential",methods = ["POST"])
def PotentialAnalysisInput():
    data = request.get_json()
    errors = PotentialAnalysisRequest.validate(data)
    if errors:
        return jsonify(errors),400
    try:
        potential = PotentialAnalysis(
      major = data.get("major"),
      gpa= data.get("gpa"),
      year = data.get("year"),
      strengths=data.get("strengths"),
      language = data.get("language"),
      achievements=data.get("achievements"),
      mentor=data.get("mentor")
       )

        save_potential(potential=potential)

        return jsonify(PotentialAnalysisRequest.dump(potential)),201
    except Exception as e:
        return jsonify({"error":str(e)}),400

@bp.route("/personality",methods = ["POST"])
def PersonalProfileInput():
    data = request.get_json()
    errors = PersonalProfileRequest.validate(data)
    if errors:
        return jsonify(errors),400
    try:
       personality = PersonalProfile(
    hobbies= data.get("hobbies"),
    personality = data.get("personality"),
    unique_brand = data.get("unique_brand"),
    study_style = data.get("study_style"),
    exciting_topics = data.get("exciting_topics"),
    goals = data.get("goals")
       )
       save_personality(personality=personality)
       return jsonify(PersonalProfileRequest.dump(personality)),201
    except Exception as e:
        return jsonify({"error":str(e)}),400

