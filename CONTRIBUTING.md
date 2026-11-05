# Contributing

## Development

To develop this extension locally:

1. Clone or download this repository
2. Test the extension in your Quarto projects by installing from the local path:
   ```bash
   quarto add path/to/no-pdf-fragments
   ```

3. Modify the plugin files as needed:
   - `_extension.yml`: Extension metadata and configuration
   - `no-pdf-fragment.js`: The Reveal.js plugin code

4. Test changes by rendering your Quarto presentation:
   ```bash
   quarto preview example.qmd
   quarto render example.qmd --to revealjs
   ```

## Testing PDF Export

To test the PDF export functionality:

```bash
quarto render example.qmd --to revealjs
```

Then in the web presentation, use the browser's print function or Reveal.js print view (press `P` in Reveal.js, then print to PDF).

## Bug Reports and Feature Requests

Please open an issue on GitHub with:
- A clear description of the problem or feature
- Steps to reproduce (if applicable)
- Your Quarto version and browser/environment details

## License

This project is licensed under the MIT License - see LICENSE file for details.
