'use strict';
const videos = Array.from(document.querySelectorAll('#matched-videos video'));
let playbackRequest = 0;
document.getElementById('play-pair').addEventListener('click', async () => {
  const request = ++playbackRequest;
  for (const video of videos) { video.pause(); video.currentTime = 0; }
  const status = document.getElementById('pair-status');
  status.textContent = 'Loading both recordings…';
  try {
    await Promise.all(videos.map(video => video.readyState >= 3 ? Promise.resolve() : new Promise((resolve, reject) => {
      const ready = () => { cleanup(); resolve(); };
      const failed = () => { cleanup(); reject(new Error('Recording could not load')); };
      const cleanup = () => { video.removeEventListener('canplay', ready); video.removeEventListener('error', failed); };
      video.addEventListener('canplay', ready, { once: true });
      video.addEventListener('error', failed, { once: true });
      video.load();
    })));
  } catch (_) {
    status.textContent = 'A recording could not load. Please try its download link.';
    return;
  }
  if (request !== playbackRequest) return;
  videos.forEach(video => { video.currentTime = 0; });
  const attempts = await Promise.allSettled(videos.map(video => video.play()));
  status.textContent = attempts.every(item => item.status === 'fulfilled')
    ? 'Both runs started at t = 0; each recording retains its own end.'
    : 'Use the video controls if your browser blocks paired playback.';
});
document.getElementById('pause-pair').addEventListener('click', () => {
  playbackRequest++;
  videos.forEach(video => video.pause());
  document.getElementById('pair-status').textContent = 'Both runs paused.';
});
