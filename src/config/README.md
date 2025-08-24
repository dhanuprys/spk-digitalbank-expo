# Environment Configuration

This application uses environment variables for configuration. Create a `.env` file in your project root to customize these settings.

## Required Environment Variables

### API Configuration

```bash
# Base URL for API requests
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

## How to Set Up

1. **Create a `.env` file** in your project root:

```bash
touch .env
```

2. **Add your configuration**:

```bash
EXPO_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

3. **Restart your development server** after making changes

## Important Notes

- **Prefix with `EXPO_PUBLIC_`**: All environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in Expo/React Native
- **No quotes needed**: Don't wrap values in quotes unless they contain spaces
- **Restart required**: Environment variable changes require a server restart
- **Fallback values**: The app will use default values if environment variables are not set

## Example Configurations

### Development

```bash
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
```

### Staging

```bash
EXPO_PUBLIC_API_BASE_URL=https://staging-api.example.com
```

### Production

```bash
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

## Security

- **Never commit `.env` files** to version control
- **Use different values** for different environments
- **Keep sensitive data** in secure environment management systems
