'use strict';

function bindMatchedPlayback({root, play, pause, status, encounter}) {
  const videos = Array.from(document.querySelectorAll(`#${root} video`));
  const feedback = document.getElementById(status);
  if (!videos.length || !feedback) return;
  let requestId = 0;
  let windowEnd = null;

  const pauseAll = () => videos.forEach(video => video.pause());
  async function start(startTime = 0, endTime = null) {
    const request = ++requestId;
    windowEnd = null;
    pauseAll();
    feedback.textContent = `Loading ${videos.length} recordings…`;
    try {
      await Promise.all(videos.map(video => video.readyState >= 3 ? Promise.resolve() : new Promise((resolve, reject) => {
        const ready = () => { cleanup(); resolve(); };
        const failed = () => { cleanup(); reject(new Error('Recording could not load')); };
        const cleanup = () => { video.removeEventListener('canplay', ready); video.removeEventListener('error', failed); };
        video.addEventListener('canplay', ready, {once:true});
        video.addEventListener('error', failed, {once:true});
        video.load();
      })));
    } catch (_) {
      feedback.textContent = 'A recording could not load. Please try its download link.';
      return;
    }
    if (request !== requestId) return;
    feedback.textContent = `Seeking all recordings to ${startTime} s…`;
    try {
      await Promise.all(videos.map(video => new Promise((resolve, reject) => {
        const ready = () => { cleanup(); resolve(); };
        const failed = () => { cleanup(); reject(new Error('Seek failed')); };
        const cleanup = () => { video.removeEventListener('seeked', ready); video.removeEventListener('error', failed); };
        video.addEventListener('seeked', ready, {once:true});
        video.addEventListener('error', failed, {once:true});
        video.currentTime = startTime;
        if (!video.seeking && Math.abs(video.currentTime - startTime) < 0.05) ready();
      })));
    } catch (_) {
      feedback.textContent = 'Use the native controls to choose this encounter window.';
      return;
    }
    if (request !== requestId) return;
    windowEnd = endTime;
    const attempts = await Promise.allSettled(videos.map(video => video.play()));
    feedback.textContent = attempts.every(item => item.status === 'fulfilled')
      ? (endTime === null
        ? `All runs started at t = ${startTime} s; each recording retains its own end.`
        : `Matched ${startTime}–${endTime} s encounter; native frames, no time warping.`)
      : 'Use the native video controls if your browser blocks grouped playback.';
  }

  document.getElementById(play)?.addEventListener('click', () => start());
  document.getElementById(pause)?.addEventListener('click', () => {
    requestId++;
    windowEnd = null;
    pauseAll();
    feedback.textContent = 'All runs paused.';
  });
  if (encounter) document.getElementById(encounter)?.addEventListener('click', () => start(9, 20));
  videos[0].addEventListener('timeupdate', () => {
    if (windowEnd !== null && videos[0].currentTime >= windowEnd) {
      const end = windowEnd;
      windowEnd = null;
      pauseAll();
      videos.forEach(video => { video.currentTime = end; });
      feedback.textContent = `Matched encounter paused at ${end} s. Native controls remain available.`;
    }
  });
}

bindMatchedPlayback({root:'matched-videos',play:'play-pair',pause:'pause-pair',status:'pair-status'});
bindMatchedPlayback({root:'social-trio',play:'play-social-trio',pause:'pause-social-trio',status:'social-trio-status',encounter:'encounter-social-trio'});
