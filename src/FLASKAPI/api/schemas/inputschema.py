from marshmallow import Schema, fields

class PotentialAnalysisSchema(Schema):
    major = fields.Str(required=True)
    gpa = fields.Int(required=True)
    year = fields.Int(required=True)
    strengths = fields.List(fields.Str(required=True),required=True)  
    language = fields.Dict(keys=fields.Str(),values=fields.Str())
    achievements = fields.List(fields.Str(required=True),required=True) 
    mentor = fields.Boolean(required=True)

class PersonalProfileSchema(Schema):
    hobbies = fields.Str(required=True)
    personality = fields.Str(required=True)
    unique_brand = fields.Str()
    study_style = fields.Str()
    exciting_topics = fields.List(fields.Str())
    goals = fields.Dict(keys=fields.Str(required=True),values = fields.List(fields.Str()))
 
