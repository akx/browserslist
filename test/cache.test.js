var browserslist = require('../');

var path = require('path');
var os = require('os');
var fs = require('fs');

it('caches configuration but the cache is clearable', () => {
    var tempName = path.join(os.tmpdir(), 'browserslist-' + Math.random());
    // Write a test configuration, then parse it
    fs.writeFileSync(tempName, 'ie 8', 'UTF-8');
    var e1 = browserslist.readConfig(tempName);
    // Now re-write the configuration, and re-read it without clearing the cache
    fs.writeFileSync(tempName, 'chrome 56', 'UTF-8');
    var e2 = browserslist.readConfig(tempName);
    // The configuration wasn't re-read, so the results should be equal:
    expect(e1).toEqual(e2);

    // Now clear the cache, then re-read...
    browserslist.clearCaches();
    var e3 = browserslist.readConfig(tempName);
    // The configuration should _not_ be equal.
    expect(e1).not.toEqual(e3);

    // All good; clean up.
    fs.unlinkSync(tempName);
});
