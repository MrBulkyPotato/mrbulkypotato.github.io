const {MongoClient} = require('mongodb');

async function main() {

    const uri = process.env.MongoURI;

    const client = new MongoClient(uri);

    try {
        await client.connect();

        /*await listDatabases(client);

         await createListing(client, {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        })
        
        
        await createListings(client, [
            {
                name: "house1"
            },
            {
                name: "house2"
            },
            {
                name: "house3"
            }
        ]);

        await findOneListingByName(client, "house1");
        
        await createUserAndPass(client, "Hari", "Patel");

        await fixUrFuckingDocumentUNonce(client, "Om", {pass: "Patel"});

        await deleteDocument(client, "delete", "me");
        */
        /* BROKEN
        await createDBRole(client, {
            role: "anon",
            privileges: [
               {},
            ],
            roles: [
                ,
            ],
            authenticationRestrictions: [
              {},
            ]
          });
          */

        await checkIfValidUserAndPass(client, "Om", "Patel");
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createDBRole(client, doc) {

    const result = await client.db.createRole(doc);

    // cont result2 = rolesInfo()

    if(result) {
        console.log(`Created role with name "${doc}`);
    } else {
        console.log(`Failed to create role with name ${doc}`);
    }
}

async function deleteDocument(client, user, pass) {

    const result = await client.db("login").collection("usernamesAndPasswords").deleteOne({user: user, pass: pass});

    if(result) {
        console.log(`Deleted account with user ${user} and pass ${pass}`);
    } else {
        console.log(`Account with user ${user} failed to delete or does not exist`);
    }
}

async function fixUrFuckingDocumentUNonce(client, user, updated) {

    //For upsert, if there is nothing with the properties, it creates a new document with given properties
    const result = await client.db("login").collection("usernamesAndPasswords").updateOne({user: user}, {$set: updated}, {upsert: false});

    if(result.upsertedCount > 0) {
        console.log(`No documents found with user ${user}, so new user was upserted with user ${user} and properties ${updated}.`)   
    } else if(result) {
        console.log(`${result.matchedCount} document(s) matched the user ${user}`);
        console.log(`User ${user} updated to have property ${updated}`);
    } else {
        console.log(`Update to user ${user} failed.`)
    }
}

async function createUserAndPass(client, user, pass) {
    const result = await client.db("login").collection("usernamesAndPasswords").insertOne({user: user, pass: pass});

    if(result) {
        console.log(`New login created with user ${user} and pass ${pass}`);
    } else {
        console.log(`Process to create login with user ${user} and pass ${pass} failed.`);
    }
}

async function checkIfValidUserAndPass(client, user, pass) {
    const result = await client.db("login").collection("usernamesAndPasswords").findOne({user: user, pass: pass});

    if(result) {
        console.log(`Found user ${user} with pass ${pass}`);
    } else {
        console.log(`No users found with user ${user} and pass ${pass}`);
    }

}

async function findOneListingByName(client, listingName) {

    const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: listingName});

    if (result) {
        console.log(`Found a listing with the name ${listingName}`);
    } else {
        console.log(`No listings found with the name ${listingName}`);
    }
}

async function createListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);

    console.log(`${result.insertedCount} new listings created with the following IDs:`);
    console.log(result.insertedIds)
}

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

    console.log(`New listing created with ID: ${result.insertedId}`)
}

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}