import React, { useState, useEffect } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";
import axios from 'axios';

const ResultLink = ({ shortenedId }) => {
  const [copied, setCopied] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleCopy = () => {
    setCopied(true);
  };
  console.log('In reslut link')
  const fetchRedirectUrl = async () => {
    const shortId = localStorage.getItem('url')
    console.log(shortId);
    try {
      const response = await axios.get(`http://localhost:5000/${shortId}`);
      setRedirectUrl(response.data.redirectUrl);
    } catch (error) {
      console.error('Error fetching redirect URL:', error);
    }
  };

  useEffect(() => {
    fetchRedirectUrl();
  });

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <>
      <div className='result'>
        {redirectUrl ? (
          <>
            <p>Original URL: <a href={redirectUrl} target='_blank' rel='noopener noreferrer'>{redirectUrl}</a></p>
            <CopyToClipboard text={redirectUrl} onCopy={handleCopy}>
              <button className={copied ? "copied" : ""}>
                {copied ? "Copied!" : "Copy To Clipboard"}
              </button>
            </CopyToClipboard>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ResultLink;
