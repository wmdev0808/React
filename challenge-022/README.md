# Testing React Apps (Automated Testing)

## What is "Testing"?

- Manual Testing

  - Write Code, preview, and test in browser
  - Very important: You see what your users will see
  - Error-prone: it's hard to test all possible combinations and scenarios

- Automated Testing
  - Code that tests your code
  - You test the individual building blocks of your app
  - Very technical but allows you to test ALL building blocks at once

## Different Kinds of Automated Tests

- Unit Tests
  - Test the **individual building blocks** (functions, components) **in isolation**
  - Projects typically contain dozens or hundreds of unit tests
  - The most common/important kind of test
- Integration Tests
  - Test the **combination** of multiple building blocks
  - Projects typically contain a couple of integration tests
  - Also important, but focus on unit tests in most cases
- End-to-End (e2e) Tests
  - Test complete scenarios in your app as the user would experience them
  - Projects typically contain only a few e2e tests
  - Important but can also be done manually (_partially_)

## What To Test

- **What?** + **How?**
- What?
  - Test the different building blocks
  - **Unit Tests**: The smallest building blocks that make up your app
- How?
  - Test success and error cases, also test rare (but possible) results

## Required Tools & Setup

- We need a tool for running our tests and asserting the results
  - Jest
- We need a tool for "simulating"(rendering) our React app / components
  - React Testing Library
- Both tools are already set up for you when using create-react-app

## Writing Tests - The Three "A"s

- **Arrange**
  - Set up the test data, test conditions and test environment
- **Act**
  - Run logic that should be tested (e.g. execute function)
- **Assert**
  - Compare execution results with expected results

## References

- [**Jest**](https://jestjs.io/docs/getting-started)
- [**React Testing Library**](https://testing-library.com/docs/)
- [**React Hooks Testing Libary**](https://react-hooks-testing-library.com/)
