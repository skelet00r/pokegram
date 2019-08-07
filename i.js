const Insta = require('./src/modules/instagram/insta')

const insta = new Insta({
  username: process.env.INSTA_USER,
  password: process.env.INSTA_PASS
})

const run = async () => {
  try {
    const res = await insta.getGrams(['bulbasaur', 'mimikyu'])
    console.log(res)
  } catch(e) {
    console.log(e)
  }
}

run()