import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({ id: authorId })

  if (!userExists) {
    throw new Error('User not found')
  }

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id author { id name email posts { id title published } } }')

  return post.author
}

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({ id: postId })

  if (!postExists) {
    throw new Error('Post not found')
  }

  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ author { id name email posts { id title published } } }')

  return post.author
}

updatePostForUser('ck0u6q6cu01890852chdsay6', { published: false })
.then(user => {
  console.log(JSON.stringify(user, undefined, 2))
}).catch(error => {
  console.log(error.message)
})

// createPostForUser('ck0u11qoo00300852aqata565', {
//   title: 'Greate books to read',
//   body: 'The war of art'
// }).then(user => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch(error => {
//   console.log(error.message)
// })

// prisma.query.users(null, '{ id name posts { id title } }').then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{ id text author { id name } }').then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })
