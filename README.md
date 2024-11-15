# Release Notes Generator 📝

Simple web app for generating formatted release notes with support for multiple platforms. Designed to be used with projects from jparkerweb 😆.

## Features 🚀

- **Multiple Output Formats**
  - Discord-formatted release notes
  - GitHub release notes
  - Ko-Fi updates

- **Project Management**
  - Predefined project list
  - Support for multiple project types:
    - NPM packages
    - Obsidian plugins
    - Demo links
    - GitHub repositories

- **Smart Validation**
  - Semantic version validation
  - HTTPS URL validation
  - Required field checks

- **Modern UI**
  - Dark mode with neon accents
  - Animated background
  - Responsive design
  - Copy to clipboard functionality
  - Form reset option

## Usage 💡

1. Select your project from the dropdown
2. Enter the version number (e.g., 1.0.0)
3. Write your release notes
4. (Optional) Add an image URL
5. Choose your output format:
   - Generate for Discord
   - Generate for GitHub
   - Generate for Ko-Fi
6. Copy the generated notes to your clipboard
7. Reset the form when done

## Project Configuration 🔧

Projects can be configured with the following properties:

```javascript
{
    displayName: '🚀 Project Name',
    shortName: 'project-name',
    npmPackageName: 'package-name',     // Optional
    obsidianPluginName: 'Plugin Name',  // Optional
    demo: 'https://demo.url'           // Optional
}
```

## Development 👨‍💻

This is a vanilla JavaScript application with no external dependencies. To run locally:

1. Clone the repository
2. Open `index.html` in your browser
3. Start generating release notes!

## License 📜

MIT License

Copyright (c) 2024 Justin Parker
