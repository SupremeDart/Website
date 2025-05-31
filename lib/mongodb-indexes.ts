import clientPromise from './mongodb'

async function createIndexes() {
  const client = await clientPromise
  const db = client.db()
  
  // indexes for the collections used by NextAuth
  await db.collection('users').createIndex({ email: 1 }, { unique: true })
  await db.collection('accounts').createIndex(
    { provider: 1, providerAccountId: 1 },
    { unique: true }
  )
  await db.collection('sessions').createIndex(
    { sessionToken: 1 },
    { unique: true }
  )
  
  console.log('MongoDB indexes created successfully')
}

// to call this function during initialization or via a setup script
createIndexes().catch(console.error)