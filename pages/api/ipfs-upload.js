import formidable from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
  api: {
    bodyParser: false,
  },
};

const IPFS_PROJECT_ID = '2eb64e7935ff4ce6b517228bbaf17fcc';
const IPFS_SECRET = 'ggOg5bqz0AF8HI6NeFJ0qWNjw7NNnTqTkOi2W1i+b2mmiIC0VxBNIg';
const IPFS_ENDPOINT = 'https://ipfs.infura.io:5001/api/v0/add';

async function uploadToIPFS(fileBuffer, fileName) {
  const formData = new FormData();
  formData.append('file', fileBuffer, fileName);
  
  const auth = Buffer.from(`${IPFS_PROJECT_ID}:${IPFS_SECRET}`).toString('base64');
  
  const response = await fetch(IPFS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(`IPFS upload failed: ${response.statusText}`);
  }
  
  return await response.json();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    
    // Handle JSON data upload
    if (fields.jsonData && fields.fileName) {
      const jsonData = JSON.parse(fields.jsonData[0]);
      const fileName = fields.fileName[0];
      const jsonBuffer = Buffer.from(JSON.stringify(jsonData, null, 2));
      
      const result = await uploadToIPFS(jsonBuffer, fileName);
      
      return res.status(200).json({
        success: true,
        hash: result.Hash,
        urls: {
          ipfs: `ipfs://${result.Hash}`,
          infura: `https://${IPFS_PROJECT_ID}.ipfs.dweb.link/ipfs/${result.Hash}`,
          public: `https://ipfs.io/ipfs/${result.Hash}`,
          cloudflare: `https://cloudflare-ipfs.com/ipfs/${result.Hash}`
        }
      });
    }
    
    // Handle file upload
    if (files.file) {
      const file = Array.isArray(files.file) ? files.file[0] : files.file;
      const fileBuffer = fs.readFileSync(file.filepath);
      
      const result = await uploadToIPFS(fileBuffer, file.originalFilename);
      
      return res.status(200).json({
        success: true,
        hash: result.Hash,
        urls: {
          ipfs: `ipfs://${result.Hash}`,
          infura: `https://${IPFS_PROJECT_ID}.ipfs.dweb.link/ipfs/${result.Hash}`,
          public: `https://ipfs.io/ipfs/${result.Hash}`,
          cloudflare: `https://cloudflare-ipfs.com/ipfs/${result.Hash}`
        }
      });
    }
    
    return res.status(400).json({ error: 'No file or JSON data provided' });
    
  } catch (error) {
    console.error('IPFS upload error:', error);
    return res.status(500).json({ error: 'Upload failed', details: error.message });
  }
}