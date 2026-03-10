<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router application. Here is a summary of all changes made:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the Next.js 15.3+ recommended approach. Configured with a reverse proxy (`/ingest`), exception capture for error tracking, and debug mode in development.
- **`next.config.ts`** (updated): Added PostHog reverse proxy rewrites (`/ingest/static/*` and `/ingest/*`) and `skipTrailingSlashRedirect: true` to support PostHog's trailing slash API requests.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture('explore_events_clicked')` in the button's click handler to track when users engage with the top-of-funnel CTA.
- **`components/EventCard.tsx`** (updated): Added `"use client"` directive and `posthog.capture('event_card_clicked')` with rich properties (event title, slug, location, date) when users click on a featured event card.
- **`.env.local`** (created): Added `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables. Keys are never hardcoded in source files.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the Explore Events button to scroll down to the featured events list | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on a featured event card to view event details (includes title, slug, location, date properties) | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/337830/dashboard/1347847)
- **Insight**: [Event Engagement Trend](https://us.posthog.com/project/337830/insights/6R3WfzOa) — Daily total counts of both events
- **Insight**: [Event Discovery Funnel](https://us.posthog.com/project/337830/insights/WxuTi2EE) — Conversion funnel from Explore Events → Event Card Click
- **Insight**: [Unique Users Exploring Events](https://us.posthog.com/project/337830/insights/PYnaQQAw) — Daily active users for each event
- **Insight**: [Top Clicked Events](https://us.posthog.com/project/337830/insights/3b6HLc8U) — Bar chart breakdown of which events get the most clicks
- **Insight**: [Weekly Event Engagement](https://us.posthog.com/project/337830/insights/3XdBbLZZ) — Weekly bar chart of engagement over 90 days

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
