import {
    S3Client,
    CreateMultipartUploadCommand,
    CompleteMultipartUploadCommand,
    UploadPartCommand,
    HeadObjectCommand,
    AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";

import { bufferToStream } from "../../../utils/bufferToStream";

let bucketName: string | undefined =
    process.env.AWS_S3_BUCKET_NAME || undefined;

let accessKeyId: string | undefined =
    process.env.AWS_ACCESS_KEY_ID || undefined;
let secretAccessKey: string | undefined =
    process.env.AWS_SECRET_ACCESS_KEY || undefined;

if (!accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("Chave de acesso, secret ou buckket é undefined");
}

const s3Client = new S3Client({
    region: "us-east-1",
    apiVersion: "2012-10-17",
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

async function uploadLargeFileInChunks(
    buffer: Buffer,
    bucket: string | undefined,
    key: string
) {
    const partSize = 5 * 1024 * 1024; // 5 MB
    const totalSize = buffer.length;

    const createRes = await s3Client.send(
        new CreateMultipartUploadCommand({ Bucket: bucket, Key: key })
    );

    const uploadId = createRes.UploadId;
    const parts: { ETag?: string; PartNumber: number }[] = [];
    let partNumber = 1;

    try {
        for (let start = 0; start < totalSize; start += partSize) {
            const end = Math.min(start + partSize, totalSize);
            const chunk = buffer.slice(start, end);

            const uploadPartRes = await s3Client.send(
                new UploadPartCommand({
                    Bucket: bucket,
                    Key: key,
                    UploadId: uploadId,
                    PartNumber: partNumber,
                    Body: bufferToStream(chunk),
                })
            );
            parts.push({
                ETag: uploadPartRes.ETag,
                PartNumber: partNumber,
            });
            partNumber++;
        }

        await s3Client.send(
            new CompleteMultipartUploadCommand({
                Bucket: bucket,
                Key: key,
                UploadId: uploadId,
                MultipartUpload: {
                    Parts: parts,
                },
            })
        );

        const headResult = await s3Client.send(
            new HeadObjectCommand({ Bucket: bucket, Key: key })
        );

        console.log("Upload verificado com sucesso:", {
            ContentLength: headResult.ContentLength,
            ContentType: headResult.ContentType,
            LastModified: headResult.LastModified,
        });
    } catch (err) {
        console.error("Erro no upload. Abortando multipart...", err);

        if (uploadId) {
            await s3Client.send(
                new AbortMultipartUploadCommand({
                    Bucket: bucket,
                    Key: key,
                    UploadId: uploadId,
                })
            );
        }

        throw new Error("Upload falhou e foi abortado.");
    }
}

export { bucketName, uploadLargeFileInChunks };
