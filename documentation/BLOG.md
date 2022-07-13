# Syncronium - domain storytelling, k8s, modular monolith, CI/CD, pooling

## Problem definition

## Execution

### Domain Storytelling

First, we started with domain storytelling to understand the problem we were trying to solve.

**What is domain storytelling**

It is a simple solution for modelling the processes happening in our application.  
It focuses on actors, and processed values phrasing whole process by sentences.  
It is like component diagram, but more focused on domain: [https://plantuml.com/component-diagram].
For more info: [https://domainstorytelling.org/].

**Why domain storytelling**

I used it to explain to my co-hackers what is the purpose of the system and what behaviours do we want to model.

**What was the result**

TODO

### Architecture

For architecture we picked modular monolith.

**What is modular monolith?**

It is an architecture where modules are isolated AKA no dependences between.
Only exception is a common kernel that contains mostly of message definitions.
The only integration point is eventPublisher, which has publish and subscribe functions.

**Why modular monolith?**

I didn't want to go with monolith approach, because we were developing the application in parallel.  
This way everyone could work on their own part of code depending only on the message definitions.

Why we didn't go with microservices?  
Who the fuck would go with microservices on hobby project that doesn't need to be scalable?

**How was it implemented**

TODO

### Continous Integration and Continous Delivery

For CI/CD we have used github actions and kubernetes

---

## Summary
