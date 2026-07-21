export function getAgeFromDob(dob: string | Date | null | undefined): string {
  if (!dob) return "";

  const birthDate = typeof dob === "string" ? new Date(dob) : dob;
  if (isNaN(birthDate.getTime())) return "";

  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} tahun ${months} bulan ${days} hari`;
}

export function getAgeYearsOnly(dob: string | Date | null | undefined): string {
  if (!dob) return "";

  const birthDate = typeof dob === "string" ? new Date(dob) : dob;
  if (isNaN(birthDate.getTime())) return "";

  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();

  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) years--;

  return `${years} tahun`;
}

const INDONESIAN_MONTHS_FULL = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const INDONESIAN_MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const INDONESIAN_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export function formatDateIndo(
  date: string | Date | null | undefined,
  shortMonth = false,
): string {
  if (!date) return "";
  const dt = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dt.getTime())) return "";

  const months = shortMonth ? INDONESIAN_MONTHS_SHORT : INDONESIAN_MONTHS_FULL;
  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

export function formatDateIndoWithTime(
  date: string | Date | null | undefined,
): string {
  if (!date) return "";
  const dt = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dt.getTime())) return "";

  const hours = dt.getHours().toString().padStart(2, "0");
  const minutes = dt.getMinutes().toString().padStart(2, "0");
  return `${dt.getDate()} ${
    INDONESIAN_MONTHS_FULL[dt.getMonth()]
  } ${dt.getFullYear()} pukul ${hours}:${minutes}`;
}

export function formatDateISO(date: string | Date | null | undefined): string {
  if (!date) return "";
  const dt = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dt.getTime())) return "";
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function formatTimeHHMM(date: string | Date | null | undefined): string {
  if (!date) return "";
  const dt = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dt.getTime())) return "";
  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function formatDayDateIndo(
  date: string | Date | null | undefined,
): string {
  if (!date) return "";
  const dt = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dt.getTime())) return "";

  const dayName = INDONESIAN_DAYS[dt.getDay()];
  return `${dayName}, ${dt.getDate()} ${
    INDONESIAN_MONTHS_FULL[dt.getMonth()]
  } ${dt.getFullYear()}`;
}

export function formatRelativeDay(dateString: string): string {
  if (!dateString) return "";

  const givenDate = new Date(dateString);
  const today = new Date();
  givenDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (today.getTime() - givenDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "1 hari yang lalu";
  return `${diffDays} hari yang lalu`;
}

export function getEventStatus(eventDateStr: string) {
  const eventDate = new Date(eventDateStr);
  const today = new Date();
  eventDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays > 0)
    return { statusLabel: `H-${diffDays}`, statusColor: "text-success" };
  if (diffDays === 0)
    return { statusLabel: "D-Day", statusColor: "text-primary font-semibold" };
  return { statusLabel: `H+${Math.abs(diffDays)}`, statusColor: "text-error" };
}

export function calculateDurationDays(
  startDate: string | Date,
  endDate: string | Date,
): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );
  return `${diffDays} hari`;
}

export function calculateDurationWithTime(
  startDate: string | Date,
  startTime: string,
  endDate: string | Date,
  endTime: string,
): { text: string; isError: boolean } {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const diffMs = end.getTime() - start.getTime();

  if (diffMs < 0)
    return { text: "Waktu selesai lebih awal dari waktu mulai", isError: true };

  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  const text =
    days > 0
      ? hours > 0
        ? `${days} hari ${hours} jam`
        : `${days} hari`
      : `${hours} jam`;
  return { text, isError: days >= 1 };
}

export function calculateDurationMinute(
  startDate: string | Date,
  startTime: string,
  endDate: string | Date,
  endTime: string,
): { text: string; isError: boolean } {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const diffMs = end.getTime() - start.getTime();
  if (diffMs < 0)
    return { text: "Waktu selesai lebih awal dari waktu mulai", isError: true };

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const text =
    days > 0
      ? `${days} hari${hours > 0 ? ` ${hours} jam` : ""}${
          minutes > 0 ? ` ${minutes} menit` : ""
        }`
      : hours > 0
        ? `${hours} jam${minutes > 0 ? ` ${minutes} menit` : ""}`
        : `${minutes} menit`;

  return { text, isError: days >= 1 };
}

export function formatTime(date: string | Date | null | undefined): string {
  if (!date) return "";

  if (typeof date === "string" && /^\d{2}:\d{2}:\d{2}$/.test(date)) {
    return date.slice(0, 5);
  }

  const dt = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dt.getTime())) return "";

  const hours = dt.getHours().toString().padStart(2, "0");
  const minutes = dt.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

export const getCurrentYearMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

/* Contoh penggunaan:
getAgeFromDob("2000-01-15");
getAgeYearsOnly("2000-01-15");
formatDateIndo("2025-11-26");
formatDateIndoWithTime("2025-11-26T15:30");
formatDateISO("2025-11-26");
formatTimeHHMM("2025-11-26T15:30");
formatDayDateIndo("2025-11-26");
formatRelativeDay("2025-11-25");
getEventStatus("2025-11-27");
calculateDurationDays("2025-11-26","2025-11-28");
calculateDurationWithTime("2025-11-26","08:00","2025-11-27","10:00");
calculateDurationMinute("2025-11-26","08:00","2025-11-26","09:30");
*/
