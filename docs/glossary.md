# Glossary

Short vocabulary for CatalogSpec and related planned layers.

## Agent session

The conversation context in which an agent receives user intent, calls tools, and creates or updates UI.

## SceneSpec

Draft. The protocol for concrete, session-persistent UI scene documents.

A scene represents what the agent has created for a particular conversation or session.

## CatalogSpec

Active. The implementation-independent contract vocabulary an agent may use when creating or updating a scene.

CatalogSpec defines catalog items, shared state shape, theme contracts, actions, events, and requirements.

## Catalog

A domain contract, not a framework implementation.

A catalog may describe commerce, infrastructure, support, analytics, or any other coherent domain of UI and actions.

## Catalog item

A renderable unit in a catalog. An item may map to a component, layout, primitive, chart, card, workflow panel, or domain object view.

## Requirements document

A human- and LLM-readable behavioral contract, usually named `requirements.md`.

The JSON contract describes the interface. Requirements describe expected behavior behind that interface.

## Theme contract

A catalog-level token contract in `theme.json`, plus concrete theme instances in `/themes/*.json`.

## Implementation

Framework- or platform-specific code that fulfills a catalog.

For example, a React implementation of a commerce catalog provides React components for the catalog's items.

## Runtime

The environment that mounts and orchestrates a scene using a catalog and an implementation.

A runtime may validate scenes, provide state/theme/actions, render items, apply updates, and route events.

## Meta-catalog

An index of catalogs that helps a runtime, tool, or LLM discover available domains and capabilities.
