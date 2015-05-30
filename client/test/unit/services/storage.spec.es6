import storage from 'services/storage.es6';

describe('The Storage Service', function() {

  describe('(in memory)', function() {

    it('should return undefined if a key does not exist', function() {
      expect(storage.memory.get('non-existent')).toBeUndefined();
    });

    it('should set a key/value', function() {
      storage.memory.set('key', 'value');
      expect(storage.memory.get('key')).toBe('value');
    });

    it('should remove a key', function() {
      storage.memory.set('key', 'value');
      expect(storage.memory.get('key')).toBe('value');

      storage.memory.remove('key');
      expect(storage.memory.get('key')).toBeUndefined();
    });

  });

  describe('(local)', function() {

    it('should return undefined if a key does not exist', function() {
      expect(storage.local.get('non-existent')).toBeUndefined();
    });

    it('should set a key/value', function() {
      storage.local.set('key', 'value');
      expect(storage.local.get('key')).toBe('value');
    });

    it('should remove a key', function() {
      storage.local.set('key', 'value');
      expect(storage.local.get('key')).toBe('value');

      storage.local.remove('key');
      expect(storage.local.get('key')).toBeUndefined();
    });

  })
});