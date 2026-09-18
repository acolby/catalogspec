# Splash Catalog Requirements

## Purpose

The Splash catalog defines a small experimental vocabulary for hero and splash-style landing surfaces. It is intended to support early runtime experiments without becoming a general design system.

## Scope

The catalog should support:

- a prominent hero/splash section
- headline, supporting copy, and optional eyebrow copy
- one or more calls to action
- decorative or media-like background configuration
- simple composition/layout through catalog items

## Non-goals

This catalog does not define a full marketing site system, routing model, analytics model, form system, or framework-specific rendering behavior.

## Runtime expectations

A runtime may render these items using any web technology. The catalog only defines the interface and behavioral expectations.

Catalog actions such as `openUrl` are intents. The runtime or host application decides whether and how navigation occurs.
