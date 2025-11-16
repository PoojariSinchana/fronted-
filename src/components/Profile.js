import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [data, setData] = useState(null);

  useEffect(() => { load(); }, []);
  async function load() {
    try {
      // We didn't create a /users/me route in backend for brevity,
      // so this can be implemented later. For now we just show a placeholder.
      setData({ name: 'You', email: 'you@example.com' });
    } catch (err) {
      console.error(err);
    }
  }

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <h3>Your snippets (call API to  real ones)</h3>
      <p>Coming soon</p>
    </div>
  );
}
