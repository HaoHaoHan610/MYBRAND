from flask import Blueprint, jsonify, request

from api.schemas.outputSchema import improvingSchema, RubricScoreSchema,ConclusionSchema
from api.schemas.inputschema import PotentialAnalysisSchema, PersonalProfileSchema
from agent.models import PotentialAnalysis, PersonalProfile
from agent.models import Conclusion
from services.AnalyzingData import _return_result


bp = Blueprint('ouput',__name__,url_prefix="/AnalyzedData")

resultResopnse = ConclusionSchema()

@bp.route("/Advices",methods =["GET"])
def get_advices():
    try:
        conclusion = _return_result()
        return jsonify(resultResopnse.dump(conclusion))
    except Exception as e:
        return {"error":str(e)}
