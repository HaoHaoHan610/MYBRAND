from marshmallow import fields,Schema

class SimpleListInput(Schema):
    items = fields.List(fields.String(), required=True)

payload = ['foo', 'bar']
data, errors = SimpleListInput().load({'items': payload})
