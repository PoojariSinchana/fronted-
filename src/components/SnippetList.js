import React, { useEffect, useState, useCallback } from 'react';
import API from '../api';
import SnippetCard from './SnippetCard';

export default function SnippetList() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('');
  const [tag, setTag] = useState('');

  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const q = [];
      if (language) q.push(`language=${language}`);
      if (tag) q.push(`tag=${tag}`);
      const res = await API.get(`/snippets?${q.join('&')}`);
      setSnippets(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [language, tag]);

  useEffect(() => { fetchSnippets(); }, [fetchSnippets]);

  return (
    <div>
      <h2>Explore Snippets</h2>
      <div className="filters">
        <input placeholder="language" value={language} onChange={e => setLanguage(e.target.value)} />
        <input placeholder="tag" value={tag} onChange={e => setTag(e.target.value)} />
        <button onClick={fetchSnippets}>Filter</button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="grid">
          {snippets.map(s => <SnippetCard key={s.id} snippet={s} />)}
        </div>
      )}
    </div>
  );
}
