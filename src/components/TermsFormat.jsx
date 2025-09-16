function processInline(txt) {
  let html = txt;

  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    (_, label, url) =>
      `<a href="${url}"
          onclick="window.open(
            '${url}',
            'popup',
            'toolbar=no,scrollbars=yes,resizable=yes,width=600,height=600'
          );return false;"
          >${label}</a>`
  );

  html = html.replace(
    /\*\*(.+?)\*\*/g,
    (_, boldText) => `<strong>${boldText}</strong>`
  );

  return html;
}

function TermsRenderer({ termsText }) {
  
  const clean = termsText.replace(/\r\n/g, '\n').trim();
  const inlined = processInline(clean);
  const paras = inlined.split(/\n{2,}/);

  return (
    <div>
      {paras.map((html, i) => (
        <p
          key={i}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </div>
  );
}

export default TermsRenderer