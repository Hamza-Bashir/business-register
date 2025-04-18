const COS = require('cos-nodejs-sdk-v5');

const cos = new COS({
    SecretId: process.env.TENCENT_CLOUD_SECRET_ID,
    SecretKey: process.env.TENCENT_CLOUD_SECRET_KEY
});


module.exports.uploadFile = async(file)=>{

    try {
        const data = await new Promise((resolve, reject) => {
            cos.putObject({
                Bucket: process.env.TENCENT_CLOUD_COS_BUCKET,
                Region: process.env.TENCENT_CLOUD_COS_REGION,
                Key: `chat-media/${file.filename}`,
                Body: file.buffer
            }, (err, data) => {
                
                if (err) {
                    console.error('Error:', err);
                    reject(err);  // Reject the promise if there's an error
                } else {
                    console.log('Success:', data);
                    resolve(data);  // Resolve the promise with the data
                }
            });
        });  

        // console.log('data', data)
        
        return data;  // Return the resolved data
    } catch (error) {
        throw error;  // Throw error for handling in async/await calls
    }
    
}


module.exports.getFile = async(fileName,content)=>{

    cos.getObject({
        Bucket: process.env.TENCENT_CLOUD_COS_BUCKET,
        Region: process.env.TENCENT_CLOUD_COS_REGION,
        Key: ''
    }, function(err, data) {
        if (err) {
            console.error('Error:', err);
        } else {
            console.log('File Content:', data.Body.toString()); // Use data.Body as needed
        }
    });
    
    

}