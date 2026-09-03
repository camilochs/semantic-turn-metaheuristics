# The Semantic Turn in Metaheuristics — project page

Landing page for the tutorial **“From Hand-Crafted to LLM-Based Variation Operators in
Metaheuristics: A Tutorial.”**

**Live:** https://camilochs.github.io/semantic-turn-metaheuristics/

Camilo Chacón Sartori¹·² · Guillem Rodríguez-Corominas²·³ · Christian Blum²

¹ Apeiron Intelligence, Barcelona ² Artificial Intelligence Research Institute (IIIA-CSIC),
Bellaterra ³ Universitat Politècnica de Catalunya (UPC), Barcelona

## What is on the page

- The organizing lens: conditioning channels (`Numeric`, `Symbolic`, `Linguistic`) and artifact
  persistence (`Transient`, `Amortized`, `Transfer`), with the worked TSP prompt for each channel.
- The conditioning × persistence map of representative methods, including the empty cells.
- The evidence summary table, with peer-reviewed / preprint and matched / source-local tags.
- The appendix results: the drop-channel classification audit (12 methods), the validation of the
  placement rule (3 LLM coders, 9/12 unanimous, Gwet's AC1 = 0.73) and the extended coverage map
  (30 entries, filterable by channel).
- Companion code and BibTeX.

## Structure

```
index.html          the page
assets/style.css    design system (light + dark)
assets/data.js      the three tables, transcribed from the manuscript
assets/app.js       rendering, filters, theme toggle
```

No build step and no dependencies. Open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080
```

## Data provenance

Every table on this page is transcribed from the manuscript: the evidence summary from Table 5,
the drop-channel audit from Appendix B, and the extended coverage map from Appendix C. Numbers are
not recomputed here — when the manuscript changes, `assets/data.js` is the single file to update.
