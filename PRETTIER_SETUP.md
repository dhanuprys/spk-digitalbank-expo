# Prettier Setup Guide

This project uses Prettier for consistent code formatting across all files.

## 🚀 Quick Start

### Install Prettier Extension

1. Install the Prettier extension in VS Code: `esbenp.prettier-vscode`
2. Restart VS Code

### Available Commands

```bash
# Format all files in the project
npm run format

# Check if files are properly formatted (CI/CD)
npm run format:check

# Format and fix unknown file types
npm run format:fix
```

## ⚙️ Configuration

### Prettier Settings (`.prettierrc`)

- **Semicolons**: Always added
- **Quotes**: Single quotes preferred
- **Line Length**: 80 characters max
- **Indentation**: 2 spaces
- **Trailing Commas**: ES5 compatible
- **JSX Quotes**: Single quotes

### VS Code Integration (`.vscode/settings.json`)

- **Auto-format on save**: Enabled
- **Default formatter**: Prettier
- **Auto-fix on save**: Enabled
- **Import organization**: Auto-organized

### EditorConfig (`.editorconfig`)

- **Universal settings** for all editors
- **Consistent indentation** across IDEs
- **UTF-8 encoding** enforced

## 📁 Ignored Files

The following files/directories are ignored by Prettier:

- `node_modules/`
- Build outputs (`.expo/`, `dist/`, `build/`)
- Environment files (`.env*`)
- Package lock files
- Generated files

## 🔧 Usage Examples

### Before Formatting

```typescript
const Component=({name,age}:Props)=>{
return(<div className="container">
<h1>Hello {name}</h1>
<p>Age: {age}</p>
</div>)
}
```

### After Formatting

```typescript
const Component = ({ name, age }: Props) => {
  return (
    <div className='container'>
      <h1>Hello {name}</h1>
      <p>Age: {age}</p>
    </div>
  );
};
```

## 🎯 Best Practices

1. **Always run format before committing**: `npm run format`
2. **Use VS Code integration** for real-time formatting
3. **Check CI/CD pipeline** with `npm run format:check`
4. **Customize settings** in `.prettierrc` if needed

## 🚨 Troubleshooting

### Prettier not working?

1. Check if extension is installed
2. Verify `.prettierrc` exists
3. Restart VS Code
4. Check file associations

### Conflicts with other formatters?

1. Set Prettier as default in VS Code
2. Disable conflicting extensions
3. Check workspace settings

## 📚 Additional Resources

- [Prettier Documentation](https://prettier.io/docs/en/)
- [VS Code Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig](https://editorconfig.org/)
