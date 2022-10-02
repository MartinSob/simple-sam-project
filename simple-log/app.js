const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

exports.handler = async (event, context) => {
    const client = new S3Client({
        // The region of the bucket
        region: 'us-east-1',
    });
    const command = new PutObjectCommand({
        // The name of the bucket
        Bucket: process.env.BUCKET_NAME,
        // The name with which the file will be uploaded
        Key: 'file.txt'
    });

    const url = await getSignedUrl(client, command, { 
        // Time in seconds before the presigned URL expires
        expiresIn: 3600
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            response: 'Success',
            url: url
        })
    }
}
