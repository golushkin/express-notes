
get /api/v1/notes/ => [{note},...]
status code - 200
get all notes and its childrens

get /api/v1/notes/:id => {note}
status code - 200
get note with particular id and its childrens

post /api/v1/notes/ => {note}
{
    head: true|false,
    parent: '_id',
    title: 'String',
    desc: 'String',
    links: [],
    children: []
}
status code - 201
create and return note 

put /api/v1/notes/:id => none
{
    title: 'String',
    desc: 'String',
    links: [],
}
status code - 204
update note

delete /api/v1/notes/:id => none
status code - 204
delete note


post /api/v1/users => token
{
    username: 'String',
    pass: 'String'
}
status code - 204
create user

