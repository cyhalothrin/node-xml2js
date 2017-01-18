const test = require('tape');
const fs = require('fs');
const parse = require('../index');

test('parse test', (t) => {
  const filename = `${__dirname}/_data/data.xml`;
  const xmlString = fs.readFileSync(filename).toString();
  const expected = {
    _: '',
    playlist: {
      $: { name: 'thrash metal' },
      _: '',
      album: {
        $: {},
        _: '',
        name: {
          $: {},
          _: 'Kill \'Em All',
        },
        artist: {
          $: {},
          _: 'Metallica',
        },
        trackList: {
          $: {},
          _: '',
          song: [
            {
              $: { length: '3:08', position: '3' },
              _: 'Motorbreath',
            },
            {
              $: { length: '6:55', position: '9' },
              _: 'Seek &amp; Destroy',
            },
          ],
        },
        cover: {
          $: {},
          _: '<img src="http://playlist.com/covers/kill-em-all-main.jpg">',
        },
        description: {
          $: {},
          _: 'Kill \'Em All is the debut studio album by the American heavy metal band Metallica, '
          + 'released on July 25, 1983, by the independent record label Megaforce Records.',
        },
      },
    },
  };
  parse(xmlString, (err, res) => {
    t.deepEquals(res, expected);
  });

  const xmlStream = fs.createReadStream(filename);
  parse(xmlStream, (err, res) => {
    t.deepEquals(res, expected);
    t.end();
  });
});
