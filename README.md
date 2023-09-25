## DocuHub
A collaborative rich text editor with real-time collaboration features.

## Description
DocuHub is an innovative real-time collaborative rich text editor designed for seamless teamwork and efficient document editing. Built with modern technologies and a focus on user experience, it enables users to share their documents with each other to collaborate in real-time, making it ideal for collaborative writing, brainstorming, and project management.
Users can register themselves and log in using the credentials which are securely encrypted. DocuHub achieves real-time updates through Socket.IO web sockets, allowing multiple users to interact with documents simultaneously. Say goodbye to delays in collaborative editing. It also leverages Yjs, a Conflict-free Replicated Data Type (CRDT) algorithm, to provide conflict-free collaborative editing. This revolutionary approach eliminates traditional conflicts, offering a smoother and more efficient collaborative experience.

## Getting Started
You may also need to run the backend service [docu-hub-api](https://github.com/Msq-9/docu-hub-api) for local development.

First, run the development server:
```bash
npm install
# or
pnpm install
```
Now, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) with your browser to see the result.

