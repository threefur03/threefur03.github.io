# PairField anonymous project website

Static GitHub Pages project site for `https://threefur03.github.io/pairfield/`.
The account root remains a separate project index. Project HTML and assets live
under `pairfield/`; the root `.nojekyll` keeps both pages buildless.

Publish the repository named `threefur03.github.io` under that account. In
Settings > Pages select the `main` branch and `/ (root)`. No custom build or
workflow is needed. Source and CARLA reproduction preview live separately in
`https://github.com/threefur03/PairField-Nav`.

The site uses the Academic Project Page Template, with its attribution retained
in the footer and `WEBSITE_LICENSE.md`. It has no analytics, institution,
author-profile links or manuscript PDF with identifying metadata. Research
media are distinguished by controller generation and experimental scope.

Preview locally with `python -m http.server 8765 --bind 127.0.0.1`, then open
`http://127.0.0.1:8765/pairfield/`. All required resources are local files.

Videos are the primary player. CARLA GIF links contain the same ordered frames at
20 fps, resized for GitHub's per-file size limit. No interpolation or synthetic
physics frames are added. The APF video ends after the recorded contact event;
its last camera frame is one simulation tick before the native callback.

The current gallery has nine source-body system/scene recordings. Every current BEV uses
the same fixed64×36m crop,16:9 panel ratio and no adaptive zoom. Display-cropped
actors remain in the recorded controller inputs. Two separate historical
V5.1 comparisons retain native20Hz video; their GIF downloads are explicitly
12-second excerpts. A collapsed ORCA contact comparison is a complete-run
2Hz sampled derivative of older5Hz camera capture, not20Hz video.

Three primary tables report actor-time-normalized interaction exposure,
class-wise spacing and fixed-window absent-ego NPC stopping contrasts. They
keep the current pilots and historical72-episode density cohort separate.
Two supporting tables retain the original safety, raw/smoothed motion and
runtime values. CSV downloads retain all arms and outcomes; no human-comfort,
significance or universal class-conditioning claim is made.

The presentation follows an academic-paper structure with Abstract, Framework,
CARLA comparisons, interaction results, planar simulation and ROS2/LIMO scope.
The Figure1 preview is PNG-only. Editable SVG/PDF originals stay local. The
LIMO platform image does not establish deployment of the current learned graph;
its earlier exported-field bridge is described separately.

The public repository's pre-existing history and license notices need a separate
anonymity check. This website does not rewrite them or remove required legal
attribution. The portable example is a release preview, not a verified exact
reproducer of frozen manuscript tables.
