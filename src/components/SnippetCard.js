import React from 'react';
import { Link } from 'react-router-dom';

export default function SnippetCard({ snippet }) {
  return (
    <div className="card">
      <h3><Link to={`/snippets/${snippet.id}`}>{snippet.title}</Link></h3>
      <p>{snippet.description}</p>
      <div className="meta">{snippet.language} • by {snippet.author?.name || 'Unknown'}</div>
      <div className="tags">{(snippet.tags || []).map(t => <span key={t} className="tag">{t}</span>)}</div>
    </div>
  );
}
