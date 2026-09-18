# Glossary

Short vocabulary for CatalogSpec and related planned layers.

## Agent session

The conversation context in which an agent receives user intent, calls tools, and creates or updates UI.

## SceneSpec

Draft. The protocol for concrete, session-persistent UI scene documents.

SceneSpec currently describes scene snapshots. It does not yet have a canonical JSON Schema, validator, or streaming update protocol.

## CatalogSpec

Active. The implementation-independent contract vocabulary an agent may use when creating or updating a scene.

CatalogSpec defines catalog items, shared state shape, theme contracts, actions, events, and requirements.

## Catalog

A domain contract, not a framework implementation.

A catalog may describe commerce, infrastructure, support, analytics, or any other coherent domain of UI and actions.

## Catalog item definition

A renderable unit defined by a catalog. An item may map to a component, layout, primitive, chart, card, workflow panel, or domain object view.

## Scene snapshot

The complete, persisted JSON state of a scene at a point in time.

## Scene item instance

A concrete use of a catalog item definition inside a scene snapshot. Scene item instances have stable scene-local IDs.

## Requirements document

A human- and LLM-readable behavioral contract, usually named `requirements.md`.

The JSON contract describes the interface. Requirements describe expected behavior behind that interface.

## Theme contract

A catalog-level token contract in `theme.json`, plus concrete theme instances in `/themes/*.json`.

## Implementation

Draft. Framework- or platform-specific code that fulfills a catalog.

For example, a React implementation of a commerce catalog provides React components for the catalog's items.

## Runtime

Draft. The environment that renders and maintains a scene snapshot using a catalog and an implementation.

Runtime APIs, implementation manifests, action dispatch, event routing, and state ownership are not yet normative.

## Meta-catalog

An index of catalogs that helps a runtime, tool, or LLM discover available domains and capabilities.
