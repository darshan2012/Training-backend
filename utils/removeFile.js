const fs = require('fs')
module.exports.removeFile  = async(path) => {
    // console.log("path L " + path);
    if(path)
    if (fs.existsSync(path))
      fs.unlinkSync(path);
}