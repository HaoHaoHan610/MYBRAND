from marshmallow  import fields, Schema


class improvingSchema(Schema):
    advice = fields.Str(required=True)
    article = fields.Str(required=True)
    books = fields.Str(required=True)
    newspaper = fields.Str(required=True)
    certificatin_course = fields.Str(required=True)


class RubricScoreSchema(Schema):
    professional_knowledge = fields.Int(required=True)  # 20 - Kiến thức chuyên môn
    practical_skills = fields.Int(required=True)  # 20 - Kỹ năng thực hành
    experience_achievements = fields.Int(required=True)  # 20 - Kinh nghiệm & thành tựu
    personal_branding = fields.Int(required=True)  # 15 - Định vị cá nhân
    goals_vision = fields.Int(required=True)  # 15 - Mục tiêu & tầm nhìn
    growth_potential = fields.Int(required=True)  # 10 - Tiềm năng phát triển


class ConclusionSchema(Schema):
    personalityResult = fields.Str(required=True)
    potentialResult = fields.Str(required=True)
    source_advice = fields.Nested(improvingSchema, required=True)
    rubricResult = fields.Nested(RubricScoreSchema, required=True)
    # dict {title: url}
    web = fields.Dict(keys=fields.Str(), values=fields.Str())
