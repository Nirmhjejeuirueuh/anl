# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## � Backup & Restore

### Creating a Backup

To create a complete backup of your Strapi project including data, configurations, and uploaded files:

```bash
# Using Strapi CLI (recommended - when Strapi is not running)
npx strapi export --file backups/strapi-backup-$(date +%Y%m%d-%H%M%S).tar.gz.enc

ENCRYPTION_KEY=TTuClHRZpbxJcOCEzX1kpw==

# Alternative: Manual backup (when CLI fails)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="backups/manual-backup-${TIMESTAMP}"
mkdir -p "$BACKUP_DIR"
cp -r .strapi "$BACKUP_DIR/"
cp -r config "$BACKUP_DIR/"
cp -r database "$BACKUP_DIR/"
cp -r public/uploads "$BACKUP_DIR/" 2>/dev/null || echo "No uploads"
cp .tmp/data.db "$BACKUP_DIR/" 2>/dev/null || echo "No data.db"
tar -czf "backups/manual-backup-${TIMESTAMP}.tar.gz" -C backups "manual-backup-${TIMESTAMP}"
rm -rf "$BACKUP_DIR"
```

### Restoring from Backup

To restore from a Strapi export:

```bash
# Using Strapi CLI
npx strapi import --file backups/your-backup-file.tar.gz.enc

# For manual backups, extract and replace the relevant directories
tar -xzf backups/manual-backup-YYYYMMDD-HHMMSS.tar.gz
cp -r manual-backup-YYYYMMDD-HHMMSS/.strapi ./
cp -r manual-backup-YYYYMMDD-HHMMSS/config ./
cp -r manual-backup-YYYYMMDD-HHMMSS/database ./
cp -r manual-backup-YYYYMMDD-HHMMSS/uploads public/ 2>/dev/null || echo "No uploads"
cp manual-backup-YYYYMMDD-HHMMSS/data.db .tmp/ 2>/dev/null || echo "No data.db"
```

**Note:** Always backup before major changes or deployments. The `backups/` directory contains all your backup files.

## �📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

## 🔄 Data Migration to Strapi Cloud

To migrate data from local development to Strapi Cloud:

1. **Export local data** (with Strapi running):
   ```bash
   node export-data.js
   ```

2. **Get API token** from Strapi Cloud admin (Settings > API Tokens)

3. **Update import script** with your cloud URL and API token in `import-data.js`

4. **Import data** to cloud:
   ```bash
   node import-data.js
   ```

**Note:** If using the CLI transfer command, ensure schemas match:
```bash
yarn strapi transfer --to https://your-cloud-project.strapiapp.com/admin --to-token YOUR_TRANSFER_TOKEN --force
```

**Important:** Create admin user first and ensure cloud database schema matches local (richtext fields should be TEXT, not VARCHAR).

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
