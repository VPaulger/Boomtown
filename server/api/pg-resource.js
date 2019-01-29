const strs = require('stringstream')

function tagsQueryString (tags, itemid, result) {
  /**
   * Challenge:
   * This function is recursive, and a little complicated.
   * Can you refactor it to be simpler / more readable?
   */
  const length = tags.length
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        )
}

module.exports = postgres => {
  // FOR LATER - PART 2
  return {
    async createUser ({ fullname, email, password }) {
      const newUserInsert = {
        text: '', // @TODO: Authentication - Server
        values: [fullname, email, password]
      }
      try {
        const user = await postgres.query(newUserInsert)
        return user.rows[0]
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.'
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.'
          default:
            throw 'There was a problem creating your account.'
        }
      }
    },
    // FOR LATER - PART 2
    async getUserAndPasswordForVerification (email) {
      const findUserQuery = {
        text: '', // @TODO: Authentication - Server
        values: [email]
      }
      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found.'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
    },
    // NOW - PART 1
    async getUserById (id) {
      /**
       *  @TODO: Handling Server Errors
       *
       *  Inside of our resource methods we get to determine when and how errors are returned
       *  to our resolvers using try / catch / throw semantics.
       *
       *  Ideally, the errors that we'll throw from our resource should be able to be used by the client
       *  to display user feedback. This means we'll be catching errors and throwing new ones.
       *
       *  Errors thrown from our resource will be captured and returned from our resolvers.
       *
       *  This will be the basic logic for this resource method:
       *  1) Query for the user using the given id. If no user is found throw an error.
       *  2) If there is an error with the query (500) throw an error.
       *  3) If the user is found and there are no errors, return only the id, email, fullname, bio fields.
       *     -- this is important, don't return the password!
       *
       *  You'll need to complete the query first before attempting this exercise.
       */

      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1', // @TODO: Basic queries
        values: [id]
      }

      /**
       *  Refactor the following code using the error handling logic described above.
       *  When you're done here, ensure all of the resource methods in this file
       *  include a try catch, and throw appropriate errors.
       *
       *  Here is an example throw statement: throw 'User was not found.'
       *  Customize your throw statements so the message can be used by the client.
       */
      try {
        const user = await postgres.query(findUserQuery)
        // return user;
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
      // -------------------------------
    },
    // NOW - PART 1
    async getItems (idToOmit) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE id != $1`,
        values: idToOmit ? [idToOmit] : []
      })
      return items.rows
    },
    // NOW - PART 1
    async getItemsForUser (id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE ownerid = $1`,
        values: [id]
      })
      return items.rows
    },
    // NOW - PART 1
    async getBorrowedItemsForUser (id) {
      const items = await postgres.query({
        text: `SELECT * FROM items WHERE borrowerid = $1`,
        values: [id]
      })
      return items.rows
    },
    // NOW - PART 1
    async getTags () {
      const tags = await postgres.query({
        text: `SELECT * FROM tags`
      })
      return tags.rows
    },
    // NOW - PART 1
    async getTagsForItem (id) {
      const tagsQuery = {
        text: `SELECT * FROM tags LEFT JOIN items_tags ON tags.id = items_tags.tag_id WHERE item_id = $1`,
        values: [id]
      }

      const tags = await postgres.query(tagsQuery)
      return tags.rows
    },
    // NOW - PART 1
    async saveNewItem ({ title, description, ownerID, borrowerID, tagIDs }) {
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item to Posgtres is the most advanced query.
       *  It requires 3 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */

      /**
       * Begin transaction by opening a long-lived connection
       * to a client from the client pool.
       * - Read about transactions here: https://node-postgres.com/features/transactions
       */
      const client = await postgres.connect()
      try {
        // Begin postgres transaction
        await client.query('BEGIN')

        const itemResult = await client.query({
          text: `INSERT INTO items (title, description, ownerID, borrowerID) VALUES ($1, $2, $3, $4) RETURNING *`,
          values: [title, description, ownerID, borrowerID]
        })

        console.log(itemResult)
        const item_id = itemResult.row[0].id
        const tagPromise = tagIDs.map(async tag_id => {
          await client.query({
            text: `INSERT INTO items_tags (item_id, tag_id) VALUES ($1, $2)`,
            values: [item_id, tag_id]
          })
        })

        await Promise.all(tagPromise)

        // Commit the entire transaction!
        await client.query('COMMIT')

        return itemResult.row[0]
        // return tagsResult.row[0]
      } catch (e) {
        // Something went wrong
        client.query('ROLLBACK', err => {
          if (err) {
            throw err
          }
          // release the client back to the pool
        })
        throw e
      }
    }
  }
}
