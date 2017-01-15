const test = require('tape');
const parse = require('../index');

function setup() {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <playlist name="thrash metal">
    <album>
      <name>Kill 'Em All</name>
      <artist>Metallica</artist>
      <trackList>
        <song length="3:08" position="3">Motorbreath</song>
        <song length="6:55" position="9">Seek &amp; Destroy</song>
      </trackList>
      <cover><![CDATA[<img src="http://playlist.com/covers/kill-em-all-main.jpg">]]></cover>
    </album>
  </playlist>`;
}

test('parse test', (t) => {
  const xml = setup();
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
      },
    },
  };
  parse(xml, (err, res) => {
    t.deepEquals(res, expected);
    t.end();
  });
});
