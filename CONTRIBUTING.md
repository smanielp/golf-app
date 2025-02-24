# Contributing to Golf Practice Assistant

Thank you for considering contributing to the Golf Practice Assistant project! This document outlines the process for contributing and some guidelines to follow.

## Development Process

1. **Fork the Repository**: Start by forking the repository to your GitHub account.

2. **Clone the Repository**: Clone your fork locally.
   ```bash
   git clone https://github.com/your-username/golf-app.git
   cd golf-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Create a Branch**: Create a branch for your feature or bugfix.
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make Changes**: Implement your changes, following the coding standards.

6. **Write Tests**: Add tests for your changes to ensure they work as expected.

7. **Run Tests**: Make sure all tests pass.
   ```bash
   npm test
   ```

8. **Commit Changes**: Commit your changes with a clear message.
   ```bash
   git commit -m "Add feature: your feature description"
   ```

9. **Push Changes**: Push your changes to your fork.
   ```bash
   git push origin feature/your-feature-name
   ```

10. **Create a Pull Request**: Submit a pull request to the main repository.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces for props and state
- Avoid using `any` type
- Use meaningful variable and function names

### Component Structure

- Each component should have a single responsibility
- Use functional components with hooks
- Place related components in the same directory
- Export components as named exports

### Testing

- Write tests for all new components
- Follow the testing patterns in existing tests
- Ensure tests are meaningful and cover edge cases

### Styling

- Use Tailwind CSS classes for styling
- Follow the existing design patterns
- Use the shadcn/ui component library when possible

## Pull Request Process

1. Update the README.md with details of changes if necessary
2. Update the documentation with any new features or changes
3. Make sure all tests pass
4. The PR will be reviewed by maintainers
5. Address any requested changes
6. Once approved, your PR will be merged

## Adding New Features

When adding new features, please consider the following:

### New Drills

When adding new drills to the database:

1. Follow the existing drill structure
2. Provide meaningful progression levels
3. Include clear instructions and setup guide
4. Add appropriate tests for progression logic

### UI Components

When adding new UI components:

1. Follow the shadcn/ui design patterns
2. Keep components reusable
3. Add TypeScript interfaces for props
4. Include tests for all new components

## Questions?

If you have any questions or need help, please open an issue in the repository with the "question" label.

Thank you for contributing!