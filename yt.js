async function getVideo() {
  const url = document.getElementById('ytUrl').value.trim();
  const resolution = document.getElementById('resolution').value;
  const output = document.getElementById('output');

  if (!url) {
    output.innerHTML = '<p style="color:red">Masukkan URL YouTube yang valid!</p>';
    return;
  }

  output.innerHTML = '<p style="color:green">Processing download... ⏳</p>';

  try {
    // Gunakan API Vercel
    const apiKey = 'your-api-key-here'; // Ganti dengan API key yang valid dari settings.json
    const apiUrl = `/api/download/ytmp4?apikey=${apiKey}&url=${encodeURIComponent(url)}&quality=${resolution}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.status) {
      output.innerHTML = `<p style="color:red">${data.error}</p>`;
      return;
    }

    const infoHtml = `
      <div class="info">
        <p><b>Judul:</b> ${data.result.title}</p>
        <p><b>Uploader:</b> ${data.result.uploader}</p>
        <p><b>Durasi:</b> ${data.result.duration}</p>
        <p><b>Kualitas:</b> ${data.result.quality}</p>
        <img src="${data.result.thumbnail}" width="100%">
      </div>
      <a href="${data.result.download}" target="_blank">
        <button>Download Video</button>
      </a>
      <video src="${data.result.download}" controls></video>
    `;
    output.innerHTML = infoHtml;

  } catch (err) {
    output.innerHTML = `<p style="color:red">Terjadi error: ${err}</p>`;
  }
}
