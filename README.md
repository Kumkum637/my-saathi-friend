# Saathi AI Companion

Build a modern, mobile-first web application called SaathiAI.

Tagline: “Listen. Understand. Support. Connect.”

SaathiAI is an AI-powered emotional support companion for people who feel lonely, isolated, or have nobody they feel comfortable talking to.

IMPORTANT PRODUCT POSITIONING:

SaathiAI is NOT a psychologist and must NOT diagnose depression or other mental illnesses.

It provides emotional support, identifies signs of loneliness and emotional distress, offers general well-being suggestions, and encourages professional support when appropriate.

The AI should never encourage emotional dependency or tell users that it is a replacement for humans or psychologists.

Include a clear disclaimer that the system is not a medical diagnosis or emergency service.

Build these screens:

Landing Page

SaathiAI logo/name

Tagline: “Listen. Understand. Support. Connect.”

Short explanation of the product

“Start Talking” button

“How it works” section

Privacy and safety explanation

Onboarding
Ask the user:

What would you like to be called?

Preferred language: English / Hindi / Hinglish

How are you feeling today?

Consent to use conversation data for the application's well-being tracking

Clear option to continue without saving optional memories

AI Chat Screen
Create a clean, friendly chat interface.

User and AI messages

Text input

Send button

Optional voice button placeholder

AI should respond empathetically and naturally

AI should ask relevant follow-up questions instead of immediately giving generic advice

Maintain conversation context

Well-being Dashboard
Display:

Loneliness indicator

Emotional distress indicator

Social connection indicator

Overall well-being status

7-day trend chart

Recent check-ins

Do NOT call these medical diagnoses.
Use labels such as:

Low concern

Moderate concern

High concern

Needs immediate human support

Personalized Support
Based on the conversation, show appropriate general suggestions such as:

talking to someone trusted

taking a walk

journaling

relaxation/breathing exercises

joining a social activity

contacting a counselor or psychologist

Professional Support Screen
Create a screen where the user can choose:
“Talk to a professional”

Show mock professional profiles for the prototype with:

Name

Specialty

Availability

Connect button

When the user chooses to connect, show a consent screen before sharing any conversation summary.

Safety Flow
Create a dedicated safety-oriented flow.
If the conversation contains concerning signals, the application should:

respond calmly and empathetically

encourage the user to seek human support

offer the professional-support option

if there are indications of immediate danger, clearly encourage immediate real-world emergency/crisis support rather than attempting to handle the crisis itself

Do NOT allow the AI to provide instructions for self-harm or other dangerous activities.

Profile / Privacy
Include:

Manage memories

Delete conversation

Delete account/data

Privacy settings

Consent settings

DESIGN

Make the UI feel:

calm

warm

trustworthy

modern

minimal

professional

Use a soft, accessible visual design without making it look like a medical/hospital application.

Make it fully responsive and optimized for mobile because the buildathon demo may be shown on a phone.

TECHNICAL REQUIREMENTS

Create the application with a clean component-based architecture.

Use:

React

TypeScript

Tailwind CSS

Supabase or another suitable backend if needed

Create realistic sample data so the dashboard and professional-support flow can be demonstrated even before the real AI/API integration is connected.

Separate the AI conversation logic, well-being analysis, safety logic, and UI components so they can be improved independently later.

For now, prioritize a polished working prototype and clear user flow over unnecessary features.

At the end, make sure the project can be run locally and that the code is organized for GitHub.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://my-saathi-friend.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8ce2f841-ee40-4ac1-9141-bafb8c5f1bbb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
