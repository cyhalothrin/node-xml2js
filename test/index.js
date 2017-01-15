const test = require('tape');
const parse = require('../index');


function setup() {
  return `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:sam="http://www.example.org/sample/">
    <soapenv:Header/>
    <soapenv:Body>
        <sam:searchResponse>
          <sam:searchResponse>
              <item><id>1234</id><description><![CDATA[<item><width>123</width><height>345</height>
  <length>098</length><isle>A34</isle></item>]]></description><price>123</price>
              </item>
          </sam:searchResponse>
        </sam:searchResponse>
    </soapenv:Body>
  </soapenv:Envelope>
  `;
}

test('parse test', (t) => {
  const xml = setup();
  parse(xml, (err, res) => {
    console.log(res['soapenv:Envelope']['soapenv:Body']['sam:searchResponse']['sam:searchResponse']);
    t.end();
  });
});
