'use client';
import { useState } from 'react';

interface WingEnv {
  api_url: string;
  TEXT: string;
  API_URL: string;
}
declare global {
  interface Window {
    wingEnv: WingEnv;
  }
}

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);

  //👇🏻 sends data to the api url
  const [response, setResponse] = useState<string | null>(null);
  const handleUserQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisable(true);
    try {
      const request = await fetch(`${window.wingEnv.api_url}/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      const response = await request.text();
      setResponse(response);
      setDisable(false);
    } catch (err) {
      console.error(err);
      setDisable(false);
    }
  };

  return (
    <main className='w-full md:px-8 px-3 py-8'>
      <h2 className='font-bold text-2xl mb-8 text-center text-blue-600'>
        Documentation Bot with Wing & LangChain
      </h2>

      <form onSubmit={handleUserQuery} className='mb-8'>
        <label className='block mb-2 text-sm text-gray-500'>
          Ask any questions
        </label>
        <textarea
          rows={5}
          className='w-full mb-4 p-4 text-sm rounded-md border border-gray-300'
          placeholder='Ask me any general question'
          required
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          type='submit'
          disabled={disable}
          className='bg-blue-500 text-white px-8 py-3 rounded'
        >
          {disable ? 'Loading...' : 'Ask Question'}
        </button>
      </form>

      {response && (
        <div className='bg-gray-100 w-full p-8 rounded-sm shadow-md'>
          <p className='text-gray-600'>{response}</p>
        </div>
      )}
    </main>
  );
}
