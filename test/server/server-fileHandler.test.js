const fileHandler = require('../../server/fileHandler')

describe(':read(:pathData)', () => {
  describe('When everything fine', () => {
    it('returns JSON from data path', () => {
      const path = '/Users/romaincalamier/api-poc/products/data-development.json'
      const json = fileHandler.read(path)
      expect(json).toBeDefined()
    })
  })
  describe('When the file is not existing', () => {
    it('returns file not found error', () => {
      const path = '../fakedata.json'
      expect(() => {
        fileHandler.read(path)
      }).toThrow(new fileHandler.FileNotFoundError('File not found'))
    })
  })
})