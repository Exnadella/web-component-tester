import { extendInterfaces } from './extend';

extendInterfaces('fixture', function (context, teardown) {

  // Return context.fixture if it is already a thing, for backwards
  // compatibility with `test-fixture-mocha.js`:
  return context.fixture || function fixture(fixtureId, model) {

    // Automatically register a teardown callback that will restore the
    // test-fixture:
    teardown(function () {
      document.getElementById(fixtureId).restore();
    });

    // Find the test-fixture with the provided ID and create it, returning
    // the results:
    var fixture = document.getElementById(fixtureId);
    if (!fixture) {
      throw new Error('Could not find fixture with ID <' + fixtureId + '>');
    }
    return fixture.create(model);
  };
});
