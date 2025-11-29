export function encodeCursor(id: string) {
    return btoa(id);
  }
  export function decodeCursor(cursor: string) {
    try {
      return atob(cursor);
    } catch {
      return null;
    }
  }
  