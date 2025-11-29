export function formatDate(iso?: string | null) {
    if (!iso) return "-";
    return new Date(iso).toLocaleString();
  }
  
  export function subjectsSummary(subjects?: string[]) {
    if (!subjects) return "-";
    return subjects.join(", ");
  }
  