# revamp-testbed
Testbed for libraries and practices to be used in revamped Zetkin front-ends.

## Running instructions
First you must stop any other service listening on port 80, e.g. Zetkin. Then run using docker-compose:

```
$ docker-compose up --build
```

Navigate to `http://localhost` to find the testbed home page.

## Trying UI libraries
Step by step guide for creating a new UI library sandbox:

1. Install the library by adding it to package.json `dependencies` and rebuilding
2. Create a new component in `src/components/ui`, e.g. `src/components/ui/AcmeUILibrary.jsx`
3. Add a reference to the new component in `src/components/ui/index.js` with a name, e.g. `acme-ui`
4. Navigate to `http://localhost` and click the link to `acme-ui` there
5. Build UI in `AcmeUILibrary.jsx`
