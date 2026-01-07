# mashmallow
- ORM/ ODM/ framework-angositc library complex datatypes, such as objects -> **native python datatypes**

```python
from mashmallow import schema,fields
class ArtistSchema(Schema):
    name = fields.Str()


class AlbumSchema(Schema):
    title = fields.Str()
    release_date = fields.Date()
    artist = fields.Nested(ArtistSchema())

# that converts to python datatypes
``` 
