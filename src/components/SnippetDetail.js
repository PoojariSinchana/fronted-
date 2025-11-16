import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

export default function SnippetDetail() {
  const { id } = useParams();
  const [snip, setSnip] = useState(null);
  const { user } = useAuth();
  const nav = useNavigate();

  const fetchSnippet = useCallback(async () => {
    try {
      const res = await API.get(`/snippets/${id}`);
      setSnip(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Could not load snippet');
    }
  }, [id]);

  useEffect(() => { fetchSnippet(); }, [fetchSnippet]);

  async function handleFork() {
    try {
      const res = await API.post(`/snippets/${id}/fork`);
      toast.success('Fork created');
      nav(`/snippets/${res.data.id}`);
    } catch (err) {
      console.error(err);
      toast.error('Could not fork (log in first)');
    }
  }

  if (!snip) return <p>Loading...</p>;

  return (
    <div>
      <h2>{snip.title}</h2>
      <p>{snip.description}</p>
      <div className="meta">{snip.language} • by {snip.author?.name}</div>
      <div className="tags">{(snip.tags || []).map(t => <span key={t} className="tag">{t}</span>)}</div>

      <h3>Code</h3>
      <AceEditor
        mode={snip.language.toLowerCase() === 'javascript' ? 'javascript' : 'text'}
        theme="github"
        value={snip.code}
        readOnly
        name="code-view"
        width="100%"
        setOptions={{ useWorker: false }}
      />

      <div style={{ marginTop: 12 }}>
        {user && <Link to={`/edit/${snip.id}`} className="btn">Edit</Link>}
        <button onClick={handleFork} className="btn">Fork</button>
      </div>
    </div>
  );
}
