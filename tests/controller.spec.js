/* eslint-env node, mocha */
const expect = require('chai').expect
const rewire = require('rewire')
const Module = rewire('../src/controller.js')

describe('abstract controller', () => {
  let controller
  let cache
  beforeEach(() => {
    cache = {foo: 'bar'}
    controller = new Module(cache)
  })

  it('initializes with the cache object', async () => {
    expect(controller.cache).to.deep.equal({foo: 'bar'})
  })

  it('finds the correct request language', async () => {
    expect(controller.requestLanguage({lang: 'de'})).to.equal('de')
    expect(controller.requestLanguage({lang: 'en'})).to.equal('en')
    expect(controller.requestLanguage({lang: 'fr'})).to.equal('fr')
    expect(controller.requestLanguage({lang: 'es'})).to.equal('es')
    expect(controller.requestLanguage({lang: 'derp'})).to.equal('en')
    expect(controller.requestLanguage({})).to.equal('en')
  })

  it('can get the multiple parameters in a key as an array', async () => {
    expect(controller.multiParameter()).to.deep.equal([])
    expect(controller.multiParameter([1, 2])).to.deep.equal([1, 2])
    expect(controller.multiParameter('1,2', true)).to.deep.equal([1, 2])
    expect(controller.multiParameter(['1', '2'], true)).to.deep.equal([1, 2])
    expect(controller.multiParameter('foo,Bar')).to.deep.equal(['foo', 'Bar'])
    expect(controller.multiParameter('1;2', false, ';')).to.deep.equal(['1', '2'])
  })
})
