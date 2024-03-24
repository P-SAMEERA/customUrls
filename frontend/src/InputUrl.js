import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResultLink = ({ shortenedId }) => {
  const [copied, setCopied] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleCopy = () => {
    setCopied(true);
  };

  const fetchRedirectUrl = async () => {
    try {
      // console.log('Fetching redirect URL for:', shortenedId);
      // const response = await axios.get(`http://localhost:5000/api/url/${shortenedId}`);
      // console.log('Response for', shortenedId, ':', response.data);
      setRedirectUrl(`http://dr-ait/${shortenedId}`);
    } catch (error) {
      console.error('Error fetching redirect URL:', error);
    }
  };

  useEffect(() => {
    fetchRedirectUrl();
  }, [shortenedId]);

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

  // console.log('Rendering ResultLink with shortenedId:', shortenedId);

  return (
    <>
      <div className='result'>
        {redirectUrl ? (
          <>
            <p>Shortened Url: <a href={`http://localhost:5000/api/url/${shortenedId}`} target='_blank' rel='noopener noreferrer'>{redirectUrl}</a></p>
            <button onClick={() => window.open(`http://localhost:5000/api/url/${shortenedId}`, '_blank')} className={copied ? "copied" : ""}>
              {copied ? "Copied!" : "Visit Link"}
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

const InputUrl = () => {
  const [url, setUrl] = useState('');
  const [shortenedId, setShortenedId] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log('Submitting URL:', url);
      const response = await axios.post('http://localhost:5000/api/url/shorten', {
        redirectUrl: url
      });
      // console.log('Shortened URL response:', response.data);
      setShortenedId(response.data.id);
    } catch (error) {
      console.error('Error shortening URL:', error.message);
    }
  };

  return (
    <div className='inputContainer'>
      <h1>URL<span>&nbsp;SHORTENER</span></h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Please provide your URL here'
          value={url}
          onChange={handleInputChange}
        />
        <button type='submit'>SHORTEN</button>
      </form>
      {shortenedId && <ResultLink shortenedId={shortenedId} />}
    </div>
  );
};

export default InputUrl;
