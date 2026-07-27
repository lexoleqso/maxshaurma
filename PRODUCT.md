# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Hungry locals in Gori, Georgia — walk-in customers, phone-order regulars, and Wolt delivery users. Mostly mobile visitors; Georgian-speaking. Situation: deciding quickly where to eat or order from right now.

## Product Purpose

One-page marketing site for MaxShaurma, a fast-food spot at ტყვიავის ქ. 59ა, Gori. Success = a visitor either calls to order or opens the Wolt page (both conversions confirmed equally important), or comes in person.

## Positioning

"ყველაზე გემრიელი შაურმა გორში" — speed (ready in 15–30 min), everything prepared fresh each morning, and per-order spice level customization (0–5 flames). Backed by a real 4.3★ Google rating with 300+ reviews.

## Operating Context

Ordering happens by phone (+995 598 07 47 47), via Wolt, or in person. Hours: Mon–Fri 10:00–02:00, Sat–Sun 10:00–22:00. Site is served from WAMP (`C:\wamp64\www\maxshaurma`), plain static HTML/CSS/JS, no build step. GSAP 3.12.5 + ScrollTrigger from CDN.

## Capabilities and Constraints

- Static one-pager: hero, marquee, why-us, menu with real prices (₾), interactive spice picker, hours/contact, big phone CTA, footer.
- Georgian language throughout; English used only as brand accent ("MAX FLAVOR · MAX SPEED").
- No backend, no ordering system on-site — conversions route to tel: and Wolt.
- Fonts: BPG Mrgvlovani + BPG Mrgvlovani Caps (local TTFs).

## Brand Commitments

**Binding (user-confirmed 2026-07-27):** the dark-green + flame-yellow palette and the existing logo are locked. Name: MaxShaurma / მაქსშაურმა. Voice: energetic, direct, playful ("სწრაფი როგორც მაქსი"), speaks to the customer as შენ.

## Evidence on Hand

- Real menu and prices (in index.html).
- 4.3★ Google rating, 300+ reviews (shown in stats).
- Imagery: `img/hero-shaurma.png`, `img/hero-burger.png`, `img/bg-menu.webp`, `img/bg-visit.webp`, logo PNGs. **No other real photography exists and none is planned (user-confirmed) — do not design around future photos and do not fabricate imagery of "their" food.**
- Links: Wolt restaurant page, Facebook page, TikTok @maxshaurma_.

## Product Principles

1. Mobile-first: the phone call and Wolt buttons must always be one thumb-tap away.
2. Real facts only — actual prices, actual rating, actual hours; never invent testimonials or claims.
3. Fast and light: no build step, minimal dependencies, quick load on cheap phones.
4. Playful heat: the spice-level ritual is the brand's signature interaction — keep it central.
5. Georgian first: all UI text in Georgian; English only as stylistic brand accent.
