from marshmallow  import fields, Schema


class improvingSchema(Schema):
    advice = fields.Str(required=True)
    article = fields.Str(required=True)
    books = fields.Str(required=True)
    newspaper = fields.Str(required=True)
    certificatin_course = fields.Str(required=True)


class RubricScoreSchema(Schema):
    academic = fields.Int(required=True)  # 10
    skills = fields.Int(required=True)  # 20
    proof = fields.Int(required=True)  # 25
    positioning = fields.Int(required=True)  # 20
    goals = fields.Int(required=True)  # 15
    coherence = fields.Int(required=True)  # 5
    execution = fields.Int(required=True)  # 5


class ConclusionSchema(Schema):
    personalityResult = fields.Str(required=True)
    potentialResult = fields.Str(required=True)
    source_advice = fields.Nested(improvingSchema, required=True)
    rubricResult = fields.Nested(RubricScoreSchema, required=True)
    # dict {title: url}
    web = fields.Dict(keys=fields.Str(), values=fields.Str())
