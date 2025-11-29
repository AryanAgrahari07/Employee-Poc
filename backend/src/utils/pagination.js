function encodeCursor(id) {
    return Buffer.from(id).toString("base64");
  }
  function decodeCursor(cursor) {
    try {
      return Buffer.from(cursor, "base64").toString("ascii");
    } catch {
      return null;
    }
  }
  
  module.exports = { encodeCursor, decodeCursor };
  