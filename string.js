const client = require('./client')


async function init() {

    await client.set("msg:1", "hello guys")
    // set ttl  , time to live 

    await client.expire("msg:1", 10)
    const value = await client.get("msg:1");

    console.log("value -> ", value);
}


init()