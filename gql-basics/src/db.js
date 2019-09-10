const users = [{
  id: '1',
  name: 'Jaime',
  email: 'j@j.com',
  age: 27
},{
  id: '2',
  name: 'Alex',
  email: 'a@a.com',
  age: 26
},{
  id: '3',
  name: 'Mike',
  email: 'm@m.com',
  age: 96
}]

const posts = [{
  id: '11',
  title: 'Post 1',
  body: '2@1.com',
  published: false,
  author: '1'
},{
  id: '12',
  title: 'Post 2',
  body: '1@2.com',
  published: true,
  author: '1'
},{
  id: '13',
  title: 'Post 3',
  body: '3@1.com',
  published: false,
  author: '2'
}]

const comments = [{
  id: '101',
  text: 'Hello from id 1',
  author: '1',
  post: '11'
}, {
  id: '102',
  text: 'Second from id 2',
  author: '2',
  post: '11'
}, {
  id: '103',
  text: 'Third from id 3',
  author: '2',
  post: '12'
}, {
  id: '104',
  text: 'Fourth from id 4',
  author: '2',
  post: '13'
}, {
  id: '105',
  text: 'Cinco',
  author: '3',
  post: '13'
}]

const db = {
  users,
  posts,
  comments
}

export { db as default }