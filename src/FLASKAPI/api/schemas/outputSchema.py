from marshmallow import fields, Schema

class improving(Schema):
    advice = fields.Str(required=True)
    aricle = fields.Str(required=  True)
    books = fields.Str(required = True)
    newspaper = fields.Str(required = True)
    certificatin_course = fields.Str(required=True)

class RubricScore(Schema):
    academic =  fields.Int(required=True) # 10
    skills = fields.Int(required=True) # 20
    proof = fields.Int(required = True) # 25
    positioning = fields.Int(required=True) # 20
    goals = fields.Int(required=True) # 15
    coherence = fields.Int(required=True) # 5
    execution = fields.Int(required= True) # 5




 

 
