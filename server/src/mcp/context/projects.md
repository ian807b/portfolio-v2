# Ian Hwang's Projects

## Full-Stack Observability Pipeline
- **Type**: Production Monitoring & Analytics System
- **Tech Stack**: C++20, Python, Prometheus, Grafana Alloy, Grafana, AWS EC2
- **Description**: Built a comprehensive observability system to monitor and analyze Windows application performance in production. Instrumented existing C++20 codebase to collect real-time performance metrics including feature usage, active window tracking, query latency, and cache hit/miss ratios.
- **Key Technical Achievements**:
  - Automated local data collection by configuring Grafana Alloy as a Windows service to scrape and transmit metrics from distributed user environments
  - Architected a centralized backend on AWS EC2 using Prometheus to consolidate and store telemetry data from multiple remote sources
  - Configured Grafana dashboards to visualize system health and user behavior, enabling data-driven identification and resolution of application bottlenecks
- **Impact**: Provides production visibility into application performance, enabling proactive optimization and improved user experience.

## Smart Stick - Embedded Systems Product
- **Type**: Embedded Systems / Assistive Technology (Capstone Project)
- **Tech Stack**: C, I2C Protocol, ToF Distance Sensor, Gyroscope, PWM, BeagleBone, Embedded Systems
- **Timeline**: February 2024 - April 2024
- **Team:** Group project in embedded systems course
- **Description**: Engineered an assistive walking device for visually impaired users, detecting obstacles within 10m range using a Time-of-Flight (ToF) distance sensor. The device provides immediate haptic feedback and fall detection capabilities. Ian proposed this project idea driven by his desire to help others using technology.
- **Key Technical Achievements**:
  - Developed obstacle alerting system using I2C protocol, reducing alert latency for immediate haptic feedback
  - Implemented fall detection system using gyroscope data to trigger emergency audio alerts through PWM buzzer
  - Integrated multiple sensors (ToF distance sensor, gyroscope) on BeagleBone platform
  - Most challenging aspect: Timing threads correctly to relay sensor values between sensors for seamless integration
  - Optimized sensor polling and interrupt handling for real-time responsiveness
- **Impact**: Created an accessible assistive device that enhances safety and independence for visually impaired individuals through real-time obstacle detection and fall alerts.

## Running Tracker - UX Design & Usability Testing
- **Type**: User Experience Design / Prototyping
- **Tech Stack**: Figma, Usability Testing, User Research
- **Timeline**: Academic Project
- **Team:** Five-member group collaboration
- **Description**: Collaborated in a five-member team to design and test a medium-fidelity prototype of a running tracker application. Conducted comprehensive usability research on existing running trackers in the market to identify improvement opportunities.
- **Key Achievements**:
  - Conducted interviews with 4 potential users to identify system requirements for optimal design
  - Created medium-fidelity prototype in Figma addressing user-facing problems
  - **Awarded class's favorite design** for the medium-fidelity prototype
  - Ian proposed the initial project idea and led the design direction
- **Demo**: https://www.youtube.com/watch?v=3Ngzww6wS3g
- **Impact**: Demonstrated user-centered design thinking and the ability to translate user research into actionable design solutions.

## Portfolio v2 (This Website)
- **Type**: Full-Stack Web Application
- **Tech Stack**: React, TypeScript, Express.js, PostgreSQL, Tailwind CSS, Prisma, AWS (S3, CloudFront, ECS, RDS), Claude AI (Anthropic)
- **Description**: A comprehensive portfolio website featuring a visitor tracking system with privacy-conscious IP hashing, and an MCP (Model Context Protocol) server powered by Claude AI that allows recruiters to ask natural language questions about Ian's background, experience, and availability. The frontend uses React with Framer Motion for smooth animations, while the backend runs Express.js with Prisma ORM.
- **Key Technical Decisions**: Used Prisma for type-safe database access, implemented IP hashing with SHA-256 for privacy, integrated Claude Sonnet 4 for AI-powered Q&A grounded in structured context documents, implemented multi-layer abuse protection (rate limiting, token limits, conversation limits), deployed with AWS infrastructure.
- **Impact**: Demonstrates full-stack engineering capability from database schema design to cloud deployment, plus AI integration and cost-conscious architecture.

## Travel Mobile App (In Progress)
- **Type**: Mobile Application / Startup Project
- **Tech Stack**: Mobile development, AI integration
- **Timeline**: Current side project
- **Team:** 8-person cross-functional team including SFU peers and a business student
- **Description**: Currently collaborating with 7 other students to develop a travel-related mobile application incorporating AI features. The team operates like a small startup with divided roles between designers and developers, operating under a self-drafted NDA.
- **Ian's Contribution**: Contributing to development alongside the team in a dynamic, fast-paced startup-like environment.
- **Impact**: Gaining real-world experience in cross-functional collaboration, startup operations, and mobile development.

## Shoppy
- **Type**: Frontend E-commerce Application
- **Tech Stack**: React, Firebase, React Query, Tailwind CSS
- **Description**: An e-commerce application that allows users to browse products, add them to a shopping cart, manage quantities, and simulate checkout with dynamic tax calculations based on the user's location.
- **Key Features**: Product catalog with real data from Firebase, shopping cart with quantity management, dynamic tax calculation, responsive design.
- **Live Demo**: https://creative-crepe-d98eb7.netlify.app

## YouTube Clone
- **Type**: Frontend Web Application
- **Tech Stack**: React, React Router, React Query, Tailwind CSS, YouTube Data API
- **Description**: A YouTube clone that fetches real video data from the YouTube Data API. Features video browsing, search, and playback with a responsive layout that mirrors the YouTube experience.
- **Key Technical Challenge**: Managing API rate limits while providing a smooth user experience, implementing infinite scroll, and handling various video states.
- **Live Demo**: https://bright-bunny-e38c91.netlify.app

## YumSpot
- **Type**: Mobile Application
- **Tech Stack**: React Native, TypeScript, iOS
- **Description**: A cross-platform mobile application for discovering and saving restaurant recommendations. Currently in development for iOS.
- **GitHub**: https://github.com/ian807b/matzip

## Todo Application
- **Type**: Frontend Web Application
- **Tech Stack**: React, Context API, CSS
- **Description**: A feature-rich todo application with task management capabilities and dark/light mode switching using React's Context API. Demonstrates state management patterns and clean UI design.
- **Live Demo**: https://charming-sorbet-12187a.netlify.app
