# strapi-static-strings

A Strapi plugin that enables centralized management of static JSON translations (e.g., for web, mobile, and admin applications).
The plugin adds Project, Namespace, and Translation entities to the Strapi admin panel, allowing easy editing and synchronization of local translation files.

This plugin is designed for multi-platform systems that rely on centralized localization files and supports seamless integration with external tools through a CLI.

## Features

- Centralized storage for static translations
- Structure: Project → Namespace → Translation keys
- Support for multiple languages (unlimited locales)
- Simple translation editing inside the Strapi admin panel
- Automatic JSON file generation
- Optional CLI integration (pull/push)
- Duplicate validation both within a namespace and globally

## Architecture

The plugin is built around three core models:

- 1. Project – Represents an application or module (e.g., web, mobile, admin).
- 2. Namespace – Represents a specific translation file (e.g., auth.json, checkout.json).
- 3. Translation – Represents a JSON-style key-value translation entry for any locale available in Strapi.

## Installation

```bash
yarn add strapi-static-strings
```

Or:

```bash
npm install strapi-static-strings
```

## Configuration

In `config/plugins.js`:

```javascript
module.exports = {
  'strapi-static-strings': {
    enabled: true,
  },
};
```

## Usage

1. Open Strapi admin panel → Left sidebar → Static Strings
2. Create Project - e.g., project-web, project-mobile, project-admin
3. Add Namespace - e.g., auth, checkout, profile, ticket
4. Add translations - Strapi provides a table view for entering multiple values per language.

## CLI Integration

Recommended to use with [strapi-static-strings-cli](https://github.com/nordit-doo/strapi-static-strings)

Which enables:

- pull — fetch translations from Strapi
- push — upload local translations to Strapi

## Authorization

For API access, use a Strapi API token which can be found in the plugin settings (Home page with projects)

## License

MIT © 2025 — Nordit d.o.o.
