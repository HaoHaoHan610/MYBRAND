from flask import Blueprint, jsonify

from api.schemas.outputSchema import ConclusionSchema
from services.AnalyzingData import _return_result


bp = Blueprint("ouput", __name__, url_prefix="/AnalyzedData")

resultResopnse = ConclusionSchema()


@bp.route("/Advices", methods=["GET"])
def get_advices():
    try:
        data = _return_result()

        if not data or "result" not in data:
            return jsonify({"error": "No result generated"}), 500

        conclusion = data["result"]
        return jsonify(resultResopnse.dump(conclusion)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
