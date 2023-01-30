import React, { useState } from 'react'
import {
    S3Client,
    ListObjectsCommand,
    GetObjectCommand,
  } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import uuid from 'react-uuid';

function Table(props) {
  const [filesData, setFilesData] = useState({});
  const creds = {
    accessKeyId:  `${process.env.REACT_APP_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.REACT_APP_SECRET_ACCESS_KEY}`,
  };
  const bucketParams = { Bucket: `${process.env.REACT_APP_BUCKET_NAME}` };
  const bucketParamsForFileDownload = { Bucket: `${process.env.REACT_APP_BUCKET_NAME}`, Key: "" };
  const s3Client = new S3Client({
    region: "ap-northeast-1",
    credentials: creds,
  });
  const download = async (fileKey) => {
    try {
      bucketParamsForFileDownload["Key"] = fileKey;
      const data = await s3Client.send(
        new GetObjectCommand(bucketParamsForFileDownload)
      );
      console.log(data);
      return await data.Body.transformToString("base64");
    } catch (err) {
      console.log("Error", err);
    }
  };
  const handleDownload = (e) => {
    let promise = Promise.resolve(download(e.target.id));
    promise.then(function (val) {
      window.open(
        `data:application/octet-stream;charset=utf-16le;base64,${val}`,
        "_self"
      );
    });
  };
  const listAllFiles = async () => {
    try {
      const data = await s3Client.send(new ListObjectsCommand(bucketParams));
      console.log("Success", data);
      setFilesData(data);
      return data; // For unit tests.
    } catch (err) {
      console.log("Error", err);
    }
  };
  const upload = (file) => {
    let fileDetails = file.target.files[0];
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: "ap-northeast-1", credentials: creds }),
        params: {
          Bucket: "fileupload-react",
          Key: fileDetails.name,
          Body: fileDetails,
        },
        leavePartsOnError: false,
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
      parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
    <p>{props.signedData?.name}</p>
    {props.signedData?.name && (
        <>
          <input type="file" onChange={upload} />
          <button onClick={listAllFiles}>List Down</button>
          {Object.keys(filesData).length !== 0 && (
            <table style={{ width: "80%", fontSize: "16px" }}>
              <thead>
                <tr>
                  <th>File name</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {filesData.Contents.map((fileDetails) => {
                  return (
                    <tr key={uuid()}>
                      <td
                        id={fileDetails.Key}
                        onClick={(e) => handleDownload(e)}
                      >
                        {fileDetails.Key}
                      </td>
                      <td>{fileDetails.Size}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  )
}

export default Table