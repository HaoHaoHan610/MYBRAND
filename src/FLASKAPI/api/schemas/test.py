# Source - https://stackoverflow.com/a
# Posted by Jax
# Retrieved 2026-01-07, License - CC BY-SA 4.0

from marshmallow import fields, Schema


class PQMetaSchema(Schema):

    Properties = fields.Method("get_properties", deserialize="load_properties", data_key="Param")

    def get_properties(self, obj):
        return obj["Properties"]

    def load_properties(self, value):
        return dict(value)

dic = {
    "Param": {
        "SRT": [1589196207.91999],
        "BFW": [False],
        "INS": ["Matrix-M"],
        "LWN": [15798],
        "AN2": [0],
        "CRR": [0],
        "DUR": [4.97799682617188],
        "SRN": ["336"],
        "PKA": [-20704],
        "SSP": [True],
        "ABP": [32993],
        "AN1": [0.221665252948623],
        "PRL": [7278],
        "VSN": ["2.240 Nov 16 2011"]}
}

meta_schema_dict = PQMetaSchema().load(dic)
print(meta_schema_dict)
print(PQMetaSchema().dump(meta_schema_dict))

