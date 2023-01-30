In this Project I designed a google sign based file uploader using ReactJS as part of Krayo assignment. Once user is signed in successfully then user can choose to upload a file,list down the already stored files and click on the title of the file to download it locally. All the files are stored in AWS S3 buckets.

## Libraries Used:

react-oauth

jwt-decode

aws-sdk/lib-storage

aws-sdk/client-s3

react-uuid


## Implementation:

-Google sign in with react-oauth library.

-Credentials are decoded by using jwt-decode library.

-For files storing in aws used lib-storage and client-s3 libraries and displayed them in a table.

## Main Components

<pre><font color="#12488B"><b>.</b></font>
├── App.css
├── App.js
├── <font color="#12488B"><b>components</b></font>
│   └── Table.component.jsx </pre>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

