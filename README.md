# Angket

**Theme:** Digital, Media and Information Literacy (DMIL)

Angket helps people identify scams, phishing, and fraudulent messages before they act on them. It combines a Telegram bot for instant risk analysis with a website where users can report scam experiences to warn others. The website includes a direct link to the Telegram bot, so users can move seamlessly between reporting scams and getting instant risk analysis.

## Problem

People frequently receive suspicious messages, links, URLs, and files — fake job offers, prize notifications, phishing requests, investment scams — without knowing whether they're legitimate. Many are also unaware that the same scam has already targeted others, increasing the risk of unsafe decisions, financial loss, or exposed personal information.

## Features

**Telegram Bot**
- **On-demand analysis** — send a message, file, link, or URL and get a risk score (% likelihood of being a scam), an explanation of why it was flagged, and recommended next steps.
- **Live scan mode** — toggle automatic scanning of incoming messages on/off. When enabled, the bot flags suspicious messages without needing to be manually forwarded, alerting on the sender, a content summary, and the same risk analysis as on-demand mode.

**Website**
- **Community reporting** — users report their own scam experiences (with supporting images and details) to build a shared record that helps warn others about known threats.
- **Bot access** — a button on the site links directly to the Telegram bot, so users can start on-demand analysis without leaving the site.

## Value Proposition
- **Speed** — instant risk analysis, no technical knowledge required
- **Convenience** — live scan mode removes manual forwarding
- **Transparency** — clear reasoning behind each risk score, not just safe/unsafe
- **Collective Protection** — community reports help others recognize threats early
- **Accessibility** — delivered via Telegram, a platform already widely adopted
- **Actionability** — concrete next steps, not just a warning

## Project Structure
```
angket-website/
├── frontend/          # React + Vite app (source of the UI)
│   ├── src/
│   └── ...
├── backend/
│   └── api/           # Express server (handles API requests, e.g. account creation)
├── package.json       # Root package.json — build scripts run from here
└── vite.config.js     # Vite config (root: 'frontend')
```
