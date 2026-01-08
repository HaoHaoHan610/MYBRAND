from flask import Blueprint, jsonify, request

from api.schemas.outputSchema import improvingSchema, RubricScoreSchema
from api.schemas.inputschema import PotentialAnalysisSchema, PersonalProfileSchema
from agent.models import PotentialAnalysis, PersonalProfile, PotentialPersonalityAdvices
from agent.models import Conclusion

bp = Blueprint('ouput',__name__,url_prefix="/AnalyzedData")

@bp.route("/Advices",methods =["GET"])
def get_advices():
    run = 
