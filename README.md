# No PDF Fragments

A Reveal.js plugin that prevents fragment elements from appearing in PDF exports of presentations.

Works with both **Quarto/Reveal.js** and **pure Reveal.js** projects.

## Installation

### Option 1: Quarto Extension (Recommended for Quarto users)

```bash
quarto add MMachmerth/no-pdf-fragments
```

Then configure in your YAML:
```yaml
format:
  revealjs:
    pdf-separate-fragments: true
```

### Option 2: Pure Reveal.js (Standalone)

For plain HTML Reveal.js projects (without Quarto):

1. Download `no-pdf-fragment.js` from this repository
2. Include it in your HTML file:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/theme/black.min.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      <!-- Your slides here -->
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.5.0/reveal.min.js"></script>
  <script src="no-pdf-fragment.js"></script>
  
  <script>
    Reveal.initialize({
      hash: true,
      plugins: [RevealNoPdfFragment],
      // IMPORTANT: Enable PDF fragment separation
      pdfSeparateFragments: true
    });
  </script>
</body>
</html>
```

## Configuration

**IMPORTANT:** You must enable fragment separation for this plugin to work:

### For Quarto:
```yaml
format:
  revealjs:
    pdf-separate-fragments: true
```

### For Pure Reveal.js:
```javascript
Reveal.initialize({
  pdfSeparateFragments: true,
  plugins: [RevealNoPdfFragment]
});
```

### Why This Setting is Required

The `pdfSeparateFragments` / `pdf-separate-fragments` option tells Reveal.js to:

1. **Create separate PDF pages for each fragment step** - Without this, all fragments are collapsed into a single page in PDF
2. **Enable the plugin hook** - The no-pdf-fragments plugin runs during the print/PDF rendering process and needs this setting to be active
3. **Preserve fragment state** - This allows the plugin to detect and manipulate individual fragments during PDF generation

Without this setting, the plugin cannot access and filter out the `no-pdf-fragment` elements, and all fragments will be included in the PDF regardless of the class.

## Usage

Add the `no-pdf-fragment` class to any fragment that should be excluded from PDF output:

### Markdown Example (Quarto)

```markdown
---
format:
  revealjs:
    pdf-separate-fragments: true
---

## Slide with Fragments

- First bullet {.fragment}
- Second bullet {.fragment .no-pdf-fragment}
- Third bullet {.fragment}
```

### HTML Example (Pure Reveal.js)

```html
<section>
  <h2>Slide with Fragments</h2>
  <ul>
    <li class="fragment">First bullet</li>
    <li class="fragment no-pdf-fragment">Hidden in PDF only</li>
    <li class="fragment">Third bullet</li>
  </ul>
</section>
```

In both examples:
- **First bullet**: appears during presentation AND in PDF
- **Second/Hidden bullet**: appears during presentation but HIDDEN in PDF
- **Third bullet**: appears during presentation AND in PDF

## Features

- Excludes elements with the `.no-pdf-fragment` class from PDF exports
- Only affects PDF printing, not HTML presentations
- Works seamlessly with standard Reveal.js fragment animations
- Compatible with both Quarto and pure Reveal.js
- Requires fragment separation to be enabled

## How it Works

1. During HTML presentation: All fragments animate and display normally
2. During PDF export (with `pdfSeparateFragments: true`):
   - Reveal.js enters "print" view mode
   - The plugin detects all elements with both `.fragment` and `.no-pdf-fragment` classes
   - It removes the `fragment` class from those elements, making them invisible in the PDF
   - Remaining fragments (without `.no-pdf-fragment`) are included in separate PDF pages

## Troubleshooting

### Plugin not working? Check:

1. ✅ `pdf-separate-fragments: true` (Quarto) or `pdfSeparateFragments: true` (Reveal.js) is enabled
2. ✅ Elements have both `.fragment` AND `.no-pdf-fragment` classes
3. ✅ You're exporting to PDF (not just viewing HTML)
4. ✅ For Quarto: Extension is installed with `quarto add MMachmerth/no-pdf-fragments`
5. ✅ For Pure Reveal.js: `no-pdf-fragment.js` is loaded and `RevealNoPdfFragment` is in the plugins array

### Example: Complete Working Configuration

**Quarto:**
```yaml
---
title: My Presentation
format:
  revealjs:
    pdf-separate-fragments: true
---

## Slide

- Normal fragment {.fragment}
- Hidden in PDF {.fragment .no-pdf-fragment}
```

**Pure Reveal.js:**
```html
<script>
  Reveal.initialize({
    hash: true,
    pdfSeparateFragments: true,
    plugins: [RevealNoPdfFragment]
  });
</script>
```

## Compatibility

- **Reveal.js**: 4.0 and above
- **Quarto**: 1.3 and above
- **Browsers**: All modern browsers (Chrome, Firefox, Safari, Edge)

## License

MIT

## Author

Claude Haiku
