const test = require('tape');
const Collector = require('../Collector');


function setup() {
  return new Collector();
}

test('collector test', t => {
  const collector = setup();
  const expected = {
    catalog: {
      $: {},
      _: '',
      cd: [
        {
          $: {},
          _: '',
          title: {
            $: {},
            _: 'Empire Burlesque',
          },
          artist: {
            $: {},
            _: 'Bob Dylan',
          },
        },
        {
          $: {},
          _: '',
          title: {
            $: {},
            _: 'Hide your heart',
          },
          artist: {
            $: {},
            _: 'Bonnie Tyler',
          },
        },
      ],
    },
  };

  collector.open('catalog');

  collector.open('cd');
  collector.open('title');
  collector.text('Empire Burlesque');
  collector.close('title');
  collector.open('artist');
  collector.text('Bob Dylan');
  collector.close('artist');
  collector.close('cd');

  collector.open('cd');
  collector.open('title');
  collector.text('Hide your heart');
  collector.close('title');
  collector.open('artist');
  collector.text('Bonnie Tyler');
  collector.close('artist');
  collector.close('cd');

  collector.close('catalog');

  t.deepEqual(collector.obj, expected);

  t.end();
});
