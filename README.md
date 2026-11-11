# Apex Motorworks — premium automotive website

A responsive four-page static website built with HTML, CSS and vanilla JavaScript.

## Files
- index.html — Home
- products.html — vehicle catalogue with category filters
- about.html — brand story, mission, vision, team and sample testimonials
- contact.html — contact and newsletter demo forms
- style.css — responsive design, transitions and animations
- script.js — mobile menu, scroll reveal, filtering and GA4 event examples
- images/ — optional folder for local image assets

## Run locally
Open `index.html` in a browser, or use VS Code Live Server.

## Before publishing
1. Replace `G-XXXXXXXXXX` in the Google tag in all four HTML files with your actual GA4 Measurement ID.
2. Replace fictional sample business details and prices if needed.
3. The forms are demo-only and do not transmit or store submissions.
4. Vehicle imagery is loaded from Unsplash URLs and requires internet access.

## GA4 events
- `page_view`: automatic page-view measurement from the Google tag.
- `select_item`: fired when a vehicle enquiry button is clicked.
- `demo_form_submit`: fired after successful local validation of either demo form.

Only use `generate_lead` or `sign_up` after a real backend/form service confirms the enquiry or subscription.
