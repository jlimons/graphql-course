import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser (parent, args, { db }, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email)

    if (emailTaken) {
      throw new Error('Email taken.')
    }

    const user = {
      id: uuidv4(),
      ...args.data
    }

    users.push(user)

    return user
  },
  deleteUser (parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id)

    if (userIndex < 0) {
      throw new Error ('User not found')
    }

    const deletedUsers = db.users.splice(userIndex, 1)

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id
      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id)
      }
      return !match
    })
    db.comments = db.comments.filter(comment => comment.author !== args.id)

    return deletedUsers[0]
  },
  updateUser (parent, { id, data }, { db }, info) {
    const user = db.users.find(user => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (data.age) {
      user.age = data.age
    }

    return user
  },
  createPost (parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author)

    if (!userExists) {
      throw new Error('User not found')
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }

    db.posts.push(post)

    return post 
  },
  deletePost (parent, args, { db }, info) {
    const postExists = db.posts.findIndex(post => post.id === args.id)

    if (postExists < 0) {
      throw new Error('Post not found')
    }
    
    const deletedPosts = db.posts.splice(postExists, 1)

    db.comments = db.comments.filter(comment => comment.post !== args.id)

    return deletedPosts[0]

  },
  updatePost (parent, { id, data }, { db }, info) {
    const post = db.posts.find(post => post.id = id)

    if (!post) {
      throw new Error('Post not found')
    }

    if (data.title) {
      post.title = data.title
    }

    if (data.body) {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published
    }

    return post
  },
  createComment (parent, args, { db, pubsub }, info) {
    const userExists = db.users.some(user => user.id = args.data.author)
    const postExists = db.posts.some(post => post.id === args.data.post && post.published)

    if (!userExists || !postExists) {
      throw new Error('Unnable to find user and post')
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment)
    pubsub.publish(`comment ${args.data.post}`, { comment })

    return comment
  },
  deleteComment (parent, args, { db }, info) {
    const commentExists = db.comments.findIndex(com => com.id === args.id)

    if (commentExists < 0) {
      throw new Error('Comment not found')
    }

    const deletedComments = db.comments.splice(commentExists, 1)

    return deletedComments[0]
  }
}

export { Mutation as default }