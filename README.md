# Esports Weekly Socials Data

An automated data workflow connecting Instagram media data with Google Sheets to support social media reporting for a university esports program.

## Overview

Managing social media performance data involves collecting information from platform APIs, aggregating results, and organizing them into a format that can be reviewed and used by a team.

Previously, account managers were expected to manually input data. I created this Node.js project to streamline this process by connecting Instagram data aggregation with Google Sheets. The application coordinates these operations through a central entry point, separating data collection and aggregation from spreadsheet updates.

Developed in the context of my work with the University of Idaho Esports program, this project explores how lightweight automation can reduce repetitive reporting tasks and make social media data easier to organize.

## How It Works

The application coordinates the workflow through three main components:

1. **Instagram data aggregation** — Calls `runDailyAggregation()` from `instagram.js` to retrieve and aggregate the relevant Instagram data.
2. **Google Sheets integration** — Authenticates with the Google Sheets API using service-account credentials.
3. **Spreadsheet updates** — Passes the aggregated totals to `updateTotalsSheet()` in `sheets.js`, along with a spreadsheet ID and reporting start date.

The entry point, `src/index.js`, orchestrates the process and handles errors by logging them and exiting with a failure status.

## Technology Stack

- **JavaScript (ES Modules)** — Application logic and modular code organization.
- **Node.js** — Runtime for executing the workflow.
- **Google APIs (`googleapis`)** — Authentication and integration with Google Sheets.
- **Instagram API integration** — Supports the Instagram data aggregation workflow.
- **Environment variables** — Keeps service-account credentials and spreadsheet configuration outside the source code.

## Architecture

The project separates orchestration, data aggregation, and spreadsheet operations into dedicated modules.

```text
src/
├── index.js       # Coordinates the workflow
├── instagram.js   # Instagram data aggregation
└── sheets.js      # Google Sheets updates
```

`index.js` initializes Google API authentication, runs the Instagram aggregation process, and forwards the resulting totals to the spreadsheet module. This structure keeps the main workflow straightforward while allowing the individual integrations to be maintained independently.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- An Instagram API setup with the necessary access and permissions
- A Google Cloud project with the Google Sheets API enabled
- A Google service account with access to the destination spreadsheet

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/endeav007/Esports-Weekly-Socials-Data.git
cd Esports-Weekly-Socials-Data
npm install
```

### Configuration

Configure the environment variables required by the application:

| Variable | Purpose |
|---|---|
| `GOOGLE_CLIENT_EMAIL` | Google service-account email |
| `GOOGLE_PRIVATE_KEY` | Google service-account private key |
| `SPREADSHEET_ID` | ID of the destination Google spreadsheet |

Instagram-specific configuration may also be required by `instagram.js`.

Ensure the Google service account has permission to access the target spreadsheet. Keep API credentials and private keys out of version control.

### Running the Application

After configuring the required environment variables and API access, run:

```bash
npm start
```

The application executes the configured workflow, aggregating Instagram data and passing the results to the Google Sheets integration. The current entry point specifies `2026-01-01` as the reporting start date.

## Engineering Highlights

- **API integration:** Connects an external social media data workflow with Google Sheets.
- **Automation:** Coordinates data aggregation and spreadsheet updates in a single execution.
- **Modular architecture:** Separates orchestration, Instagram processing, and spreadsheet operations.
- **Credential management:** Uses environment variables for Google service-account configuration.
- **Error handling:** Captures failures during execution, logs the error, and exits with a nonzero status.

## Project Context

This project reflects my interest in applying software development to real operational needs within esports and interactive media.

Through my work with the University of Idaho Esports program, I have explored how automation can support media and broadcast teams, reduce repetitive tasks, and make recurring workflows more efficient.

## Future Development

Potential areas for further development include:

- Configurable reporting periods instead of a hardcoded start date.
- Scheduled execution for recurring data updates.
- Improved logging and reporting of API failures.
- Additional metrics and reporting integrations as team needs evolve.
