# PocketBase Setup Guide

This guide explains how to set up PocketBase as the backend for the SSH Robotics website.

## Prerequisites

- Download PocketBase from https://pocketbase.io/docs/
- Extract the executable to your preferred location

## Quick Start

1. **Start PocketBase server:**
   ```bash
   ./pocketbase serve
   ```
   This will start PocketBase on `http://localhost:8090`

2. **Create admin account:**
   - Visit `http://localhost:8090/_/`
   - Create your admin account when prompted

3. **Set up collections:**
   Create two collections with the following schemas:

### contact_submissions Collection

| Field | Type | Required | Options |
|-------|------|----------|---------|
| first_name | text | Yes | |
| last_name | text | Yes | |
| email | email | Yes | |
| company | text | No | |
| project_type | text | Yes | |
| project_description | text | Yes | |

### service_inquiries Collection

| Field | Type | Required | Options |
|-------|------|----------|---------|
| service_type | select | Yes | Options: robotics, automation, electronics |
| email | email | Yes | |
| name | text | No | |
| message | text | No | |

## Environment Configuration

Create a `.env` file in the project root:

```env
# PocketBase Configuration
VITE_POCKETBASE_URL=http://localhost:8090
VITE_DATABASE_TYPE=pocketbase
```

## API Rules

For public access to submit forms, configure the collection rules:

1. **View rule:** Leave empty (no public access needed)
2. **Create rule:** `@request.data.email != ""` (allow creation with valid email)
3. **Update rule:** Leave empty (no public updates)
4. **Delete rule:** Leave empty (no public deletes)

## Production Deployment

For production, deploy PocketBase to your preferred hosting service:

1. **Railway/Heroku/DigitalOcean:**
   - Upload PocketBase executable
   - Set environment variables
   - Configure persistent storage for database

2. **Self-hosted:**
   - Run PocketBase on your server
   - Set up reverse proxy (nginx/apache)
   - Configure SSL certificates
   - Set up backups for database files

3. **Update environment variables:**
   ```env
   VITE_POCKETBASE_URL=https://your-pocketbase-domain.com
   VITE_DATABASE_TYPE=pocketbase
   ```

## Database Management

- **Admin Dashboard:** `http://localhost:8090/_/`
- **Backup:** PocketBase stores data in `pb_data/` directory
- **Migrations:** Collections can be exported/imported via admin interface

## Security Considerations

- Always use HTTPS in production
- Configure proper API rules for collections
- Regularly backup your database
- Keep PocketBase updated to latest version
- Use environment variables for sensitive configuration