const { OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey:process.env.openaiSecret
});
const safe =   require("../utils/safe")

exports.chat = safe(async(req,res) => {
  // console.log(process.env.openaiSecret)
  const completion = await openai.chat.completions.create({
    messages: [
      
      { role: "user", content: req.body.prompt },
    ],
    model: "gpt-3.5-turbo-1106",
    // max_tokens:250,
    
    // response_format: { type: "json_object" },
  });
  // console.log("here")
  res.send(completion.choices);
//   console.log(completion.choices[0].message.content);
})
