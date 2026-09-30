/*
 * Tiny renderer for the journal's article markup (the subset blogData uses):
 * ## / ### headings, ---, "> " quotes (a "— …" line becomes the attribution),
 * "1." and "-" lists, **bold**, *italic*, and "**Label:**" lines as run-in labels.
 * Returns React nodes plus the h2 outline for the table of contents.
 */

export const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[*_`]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function inline(text, keyBase) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={key}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function renderArticle(content) {
  const lines = content.trim().split('\n').map((l) => l.trim());
  const nodes = [];
  const outline = [];
  let para = [];
  let i = 0;

  const flush = () => {
    if (!para.length) return;
    const text = para.join(' ');
    const k = `p${nodes.length}`;
    nodes.push(
      /^\*\*[^*]+:\*\*$/.test(text) ? (
        <p key={k} className="ar-label">
          {text.slice(2, -2)}
        </p>
      ) : (
        <p key={k}>{inline(text, k)}</p>
      )
    );
    para = [];
  };

  while (i < lines.length) {
    const line = lines[i];
    const k = `b${nodes.length}`;

    if (!line) {
      flush();
      i++;
    } else if (line === '---') {
      flush();
      nodes.push(
        <div key={k} className="ar-rule" aria-hidden>
          <span />
          <span />
          <span />
        </div>
      );
      i++;
    } else if (line.startsWith('## ')) {
      flush();
      const text = line.slice(3).replace(/\*/g, '');
      const id = slugify(text);
      outline.push({ id, text });
      nodes.push(
        <h2 key={k} id={id}>
          <span className="ar-h2-num" aria-hidden>
            {String(outline.length).padStart(2, '0')}
          </span>
          {text}
        </h2>
      );
      i++;
    } else if (line.startsWith('### ')) {
      flush();
      nodes.push(<h3 key={k}>{inline(line.slice(4), k)}</h3>);
      i++;
    } else if (line.startsWith('>')) {
      flush();
      const body = [];
      let cite = null;
      while (i < lines.length && lines[i].startsWith('>')) {
        const t = lines[i].replace(/^>\s?/, '');
        if (/^[—–-]\s/.test(t)) cite = t.replace(/^[—–-]\s/, '');
        else if (t) body.push(t);
        i++;
      }
      const quote = body.join(' ').replace(/^["“]|["”]$/g, '');
      nodes.push(
        <figure key={k} className="ar-quote">
          <blockquote>{inline(quote, k)}</blockquote>
          {cite && <figcaption>{inline(cite, `${k}c`)}</figcaption>}
        </figure>
      );
    } else if (/^\d+\.\s/.test(line) || line.startsWith('- ')) {
      flush();
      const ordered = /^\d+\.\s/.test(line);
      const items = [];
      while (i < lines.length && (ordered ? /^\d+\.\s/.test(lines[i]) : lines[i].startsWith('- '))) {
        items.push(lines[i].replace(ordered ? /^\d+\.\s/ : /^-\s/, ''));
        i++;
      }
      const List = ordered ? 'ol' : 'ul';
      nodes.push(
        <List key={k}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `${k}-${j}`)}</li>
          ))}
        </List>
      );
    } else {
      para.push(line);
      i++;
    }
  }
  flush();
  return { nodes, outline };
}
