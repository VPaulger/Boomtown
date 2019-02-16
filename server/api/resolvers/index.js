/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control the error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express')

// @TODO: Uncomment these lines later when we add auth
const jwt = require("jsonwebtoken")
const authMutations = require("./auth")
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types')

const authenticate = require('../authenticate')

module.exports = app => {
  return {
    // Upload: UploadScalar,
    // Date: DateScalar,

    Query: {
      // LATER - PART 2
      async viewer(parent, args, { req, pgResource }) {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */

        const userID = authenticate(app, req)

        const user = await pgResource.getUserById(userID)

        return user
      },
      // NOW - PART 1
      async user(parent, { id }, { pgResource, req }, info) {
        authenticate(app, req)
        try {
          const user = await pgResource.getUserById(id)
          return user
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      // NOW - PART 1
      async items(parent, { idToOmit }, { pgResource, req }, info) {
        authenticate(app, req)
        try {
          const items = await pgResource.getItems(idToOmit)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      // NOW - PART 1
      async tags(parent, { }, { pgResource, req }, info) {
        authenticate(app, req)
        try {
          const tags = await pgResource.getTags()
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    User: {
      // NOW - PART 1
      async items(parent, { }, { pgResource }, info) {
        try {
          const items = await pgResource.getItemsForUser(parent.id)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      // NOW - PART 1
      async borrowed(parent, { }, { pgResource }, info) {
        try {
          const borrowed = await pgResource.getBorrowedItemsForUser(parent.id)
          return borrowed
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    Item: {
      // NOW - PART 1
      async owner(parent, { }, { pgResource }, info) {
        try {
          const owner = await pgResource.getUserById(parent.ownerid)
          return owner
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      // NOW - PART 1
      async tags(parent, { }, { pgResource }, info) {
        try {
          const tags = await pgResource.getTagsForItem(parent.id)
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      // NOW - PART 1
      async borrower(parent, { }, { pgResource }, info) {
        try {
          const tags = await pgResource.getUserById(parent.borrowerid)
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      ...authMutations(app),
      // -------------------------------

      async addItem(parent, args, { pgResource, req }, info) {
        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */
        args.input.ownerid = authenticate(app, req)
        
        try {
          // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
          const newItem = await pgResource.saveNewItem(args.input)
          return newItem
        } catch (e) {
          throw new ApolloError(e)
        }
      },

      async addBorrower(parent, args, { pgResource, req }, info) {

        args.input.borrowerid = authenticate(app, req)
        
        try {
          const newBorrower = await pgResource.borrowItem(args.input)
          return newBorrower
        } catch (e) {
          throw new ApolloError(e)
        }
      },
    }
  }
}
