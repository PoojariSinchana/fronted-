import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

export default function SnippetForm({ edit }) {
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', description: '', language: 'javascript', code: '', tags: '', public: true });
  const nav = useNavigate();

  const load = useCallback(async () => {
    try {
      const res = await API.get(`/snippets/${id}`);
      const s = res.data;
      setForm({ title: s.title, description: s.description, language: s.language, code: s.code, tags: (s.tags || []).join(','), public: s.public });
    } catch (err) { console.error(err); toast.error('Could not load'); }
  }, [id]);

  useEffect(() => { if (edit && id) load(); }, [edit, id, load]);

  async function submit(e) {
    e.preventDefault();
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (edit) {
        await API.put(`/snippets/${id}`, payload);
        toast.success('Snippet updated');
        nav(`/snippets/${id}`);
      } else {
        const res = await API.post('/snippets', payload);
        toast.success('Snippet created');
        nav(`/snippets/${res.data.id}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving snippet');
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>{edit ? 'Edit' : 'Create'} Snippet</h2>

      <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
      <input value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} placeholder="Language" required />
      <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description"></textarea>

      <label>Code</label>
      <AceEditor mode={form.language.toLowerCase() === 'javascript' ? 'javascript' : 'text'} theme="github" value={form.code} onChange={val => setForm({ ...form, code: val })} name="code-editor" width="100%" setOptions={{ useWorker: false }} />

      <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="tags comma separated" />
      <label><input type="checkbox" checked={form.public} onChange={e => setForm({ ...form, public: e.target.checked })} /> Public</label>

      <button type="submit" className="btn">Save</button>
    </form>
  );
}
