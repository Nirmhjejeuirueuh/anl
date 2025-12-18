# Project Guidelines: AgileN Lite Website Revamp

## Project Overview
The goal of this project is to create a revamp of the AgileN Lite website. You can find reference to the old source code here: `old-anl-source-code` folder in the root path.

This project is an Astro project.

## Good Coding Practices

### Most Important Practices
1. **Use TypeScript**: Always prefer TypeScript over JavaScript for type safety and better developer experience.
2. **Component Reusability**: Create reusable, composable components to maintain consistency and reduce code duplication.
3. **SEO Optimization**: Implement proper meta tags, structured data, and semantic HTML for better search engine visibility.
4. **Performance First**: Use lazy loading, image optimization, and minimize bundle size for fast loading times.
5. **Accessibility**: Ensure all components are accessible with proper ARIA labels, keyboard navigation, and screen reader support.
6. **Code Organization**: Follow Astro's file structure conventions (layouts, components, pages, etc.) and keep code modular.
7. **Testing**: Write unit tests for components and integration tests for critical functionality.

### Additional Best Practices
- Follow semantic versioning for releases
- Use meaningful commit messages
- Document complex logic and APIs
- Implement proper error handling
- Use environment variables for configuration
- Optimize images and assets
- Implement proper caching strategies
- Follow web standards and best practices

## File Modification Bug Workaround
There's a file modification bug in Claude Code. The workaround is: always use complete absolute Windows paths with drive letters and backslashes for ALL file operations. Apply this rule going forward, not just for this file.