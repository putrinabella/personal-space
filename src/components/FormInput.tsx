"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Eye, EyeOff, type LucideIcon } from "lucide-react";
import type { ChangeEvent } from "react";

type BaseOption = {
  label: string;
  value: string | number;
  description?: string;
  image?: string;
  initials?: string;
};

type GroupOption = {
  label: string;
  options: BaseOption[];
};

type SelectOption = string | BaseOption | GroupOption;
type RadioOption = {
  label: string;
  value: string;
};

type FormInputProps = {
  label: string;
  value?: any;
  onChange?: (value: any) => void;
  required?: boolean;
  placeholder?: string;
  type?:
    | "text"
    | "number"
    | "date"
    | "month"
    | "time"
    | "email"
    | "password"
    | "textarea"
    | "tel"
    | "radio"
    | "checkbox"
    | "switch"
    | "file"
    | "survey"
    | "profile";
  options?: SelectOption[];
  radioOptions?: RadioOption[];
  min?: number | string;
  max?: number | string;
  pattern?: string;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: LucideIcon;
  className?: string;
  helpText?: string;
  error?: string; // Menangkap pesan validasi
  rows?: number;
  dropdownType?: "search" | "select" | "profile";
  searchable?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  disableSundays?: boolean;
  surveyOptions?: {
    label: string;
    description?: string;
    emoji?: string;
    value?: string;
    bg?: string;
  }[];
  profileOptions?: {
    label: string;
    description?: string;
    image?: string;
    initials?: string;
    value?: string;
  }[];
};

const FormInput = ({
  label,
  value,
  onChange,
  required = false,
  placeholder = "",
  type = "text",
  options,
  radioOptions,
  surveyOptions,
  profileOptions,
  min,
  max,
  pattern,
  disabled = false,
  readOnly = false,
  icon: Icon,
  className = "",
  helpText,
  error, // Di-destructure di sini
  rows = 4,
  dropdownType,
  disablePast = false,
  disableFuture = false,
  disableSundays = false,
}: FormInputProps) => {
  const normalizeOptions = (): BaseOption[] => {
    if (!options) return [];

    return options.flatMap((opt) => {
      if (typeof opt === "string") {
        return [{ label: opt, value: opt }];
      }

      if ("value" in opt) {
        return [
          {
            label: opt.label,
            value: String(opt.value),
            description: opt.description,
            image: opt.image,
            initials: opt.initials,
          },
        ];
      }

      if ("options" in opt) {
        return opt.options.map((o) => ({
          label: o.label,
          value: String(o.value),
          description: o.description,
          image: o.image,
          initials: o.initials,
        }));
      }

      return [];
    });
  };

  const normalizedOptions = normalizeOptions();

  const [selectOpen, setSelectOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredSelectOptions = searchText
    ? normalizedOptions.filter((o) =>
        o.label.toLowerCase().includes(searchText.toLowerCase()),
      )
    : normalizedOptions;

  const baseClasses =
    "w-full px-4 py-2.5 border-2 border-black shadow-[6px_6px_0px_rgba(74,62,61,1)] rounded-xl text-sm transition-colors duration-200" +
    (error
      ? " border-error focus:ring-2 focus:ring-error focus:border-transparent focus:outline-none"
      : " border-base-300 focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none") +
    (readOnly ? " bg-base-200 cursor-not-allowed" : " bg-base-100");

  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, setWarning] = useState<string | null>(null);
  const flattenOptions = (): string[] => {
    if (!options) return [];
    let list: string[] = [];

    options.forEach((opt) => {
      if (typeof opt === "string") list.push(opt);
      else if ("value" in opt) list.push(opt.label);
      else if ("options" in opt) opt.options.forEach((o) => list.push(o.label));
    });

    return list;
  };

  const flatOptions = flattenOptions();
  const filtered = flatOptions.filter((o) => {
    // 1. Pastikan 'o' ada dan 'o' adalah string
    // 2. Gunakan optional chaining atau pengecekan manual
    return o && o.toLowerCase().includes(query.toLowerCase());
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSelectOpen(false); // Sesuaikan dengan nama state kamu
        setOpen(false); // Untuk searchable dropdown
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (type === "switch") {
    const isOn = value === true || value === "1" || value === 1;

    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(!isOn)}
            className={`
            relative inline-flex h-6 w-11 items-colors rounded-full transition-colors
            ${isOn ? "bg-primary" : "bg-base-300"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${error ? "ring-2 ring-error" : ""}
          `}
          >
            <span
              className={`
              inline-block h-4 w-4 transform rounded-full bg-base-100 transition-transform
              ${isOn ? "translate-x-6" : "translate-x-1"}
            `}
            />
          </button>

          {label && (
            <span className="text-sm text-base-content select-none">
              {label}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-error font-medium">{error}</p>}
      </div>
    );
  }

  if (type === "checkbox") {
    return (
      <div className={`relative ${className}`}>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => onChange?.(e.target.checked)}
              required={required}
              disabled={disabled}
              className={`
                peer appearance-none w-5 h-5 rounded-md border-2 cursor-pointer
                transition-all duration-200 ease-in-out
                ${
                  error
                    ? "border-error bg-error/10"
                    : value
                      ? "bg-primary border-primary"
                      : "bg-base-100 border-base-300 hover:border-primary/50"
                }
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-base-300
              `}
            />
            <Check
              className={`
                absolute w-4 h-4 text-white pointer-events-none
                transition-all duration-200 ease-in-out
                ${value ? "opacity-100 scale-100" : "opacity-0 scale-50"}
              `}
              strokeWidth={3}
            />
          </div>
          <span className="text-sm font-medium text-base-content group-hover:text-primary transition-colors select-none">
            {label} {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
        {error ? (
          <p className="text-xs text-error font-medium mt-1 ml-8">{error}</p>
        ) : helpText ? (
          <p className="text-xs text-base-content/70 mt-2 ml-8">{helpText}</p>
        ) : null}
      </div>
    );
  }

  if (type === "survey" && surveyOptions) {
    return (
      <div className={`space-y-3 ${className}`}>
        {surveyOptions.map((opt) => {
          const selected = value === opt.value;

          return (
            <div
              key={opt.value}
              onClick={() => onChange?.(opt.value)}
              className={`border rounded-xl p-4 flex justify-between items-center cursor-pointer transition-all duration-200
              ${
                selected
                  ? `${opt.bg || "bg-primary"} border-transparent text-white shadow-md`
                  : error
                    ? "border-error bg-error/5 hover:bg-error/10"
                    : "border-base-300 hover:border-primary"
              }`}
            >
              <div className="flex items-center gap-4">
                {opt.emoji && <div className="text-2xl">{opt.emoji}</div>}

                <div>
                  <p className="font-semibold">{opt.label}</p>
                  {opt.description && (
                    <p
                      className={`text-xs ${
                        selected ? "text-white/80" : "text-base-content/70"
                      }`}
                    >
                      {opt.description}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all
                ${selected ? "bg-white border-white" : error ? "border-error" : "border-base-300"}`}
              >
                {selected && <Check className="w-4 h-4 text-base-content" />}
              </div>
            </div>
          );
        })}
        {error && <p className="text-xs text-error font-medium">{error}</p>}
      </div>
    );
  }

  if (type === "profile" && profileOptions) {
    return (
      <div className={`space-y-3 ${className}`}>
        {profileOptions.map((opt) => {
          const selected = value === opt.value;

          return (
            <div
              key={opt.value}
              onClick={() => onChange?.(opt.value)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200
            ${
              selected
                ? "bg-primary/20 border border-primary"
                : error
                  ? "bg-error/5 border border-error"
                  : "bg-base-100 border border-base-300 hover:border-primary/50"
            }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm
              ${
                selected
                  ? "bg-primary text-white"
                  : "bg-primary/10 text-primary"
              }`}
              >
                {opt.image ? (
                  <img
                    src={opt.image}
                    alt={opt.label}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  opt.initials || opt.label?.slice(0, 2)
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`font-semibold leading-tight line-clamp-1 ${
                    selected ? "text-primary" : "text-base-content"
                  }`}
                >
                  {opt.label}
                </p>

                {opt.description && (
                  <p className="text-xs text-base-content/60 mt-0.5">
                    {opt.description}
                  </p>
                )}
              </div>

              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border transition-all
              ${selected ? "bg-primary border-primary" : error ? "border-error" : "border-base-300"}`}
              >
                {selected && <Check className="w-4 h-4 text-base-content" />}
              </div>
            </div>
          );
        })}
        {error && <p className="text-xs text-error font-medium">{error}</p>}
      </div>
    );
  }
  if (type === "date" || type === "month") {
    const today = new Date();
    let minDate: string | undefined = undefined;
    let maxDate: string | undefined = max ? String(max) : undefined;

    // 1. --- LOGIKA FORMAT STRING BASE (YYYY-MM-DD atau YYYY-MM) ---
    const yToday = today.getFullYear();
    const mToday = String(today.getMonth() + 1).padStart(2, "0");
    const dToday = String(today.getDate()).padStart(2, "0");
    const todayString =
      type === "month"
        ? `${yToday}-${mToday}`
        : `${yToday}-${mToday}-${dToday}`;

    // 2. --- LOGIKA MIN DATE (DENGAN FIX BESOK KHUSUS TIPE DATE) ---
    if (disablePast) {
      if (type === "month") {
        minDate = todayString;
      } else {
        // Logika H+1 (Besok) khusus tipe "date"
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const yStr = tomorrow.getFullYear();
        const mStr = String(tomorrow.getMonth() + 1).padStart(2, "0");
        const dStr = String(tomorrow.getDate()).padStart(2, "0");
        const tomorrowFormatted = `${yStr}-${mStr}-${dStr}`;

        if (min) {
          const minStr = String(min);
          minDate = minStr > tomorrowFormatted ? minStr : tomorrowFormatted;
        } else {
          minDate = tomorrowFormatted;
        }
      }
    } else if (min) {
      minDate = String(min);
    }

    // 3. --- LOGIKA MAX DATE (DENGAN FIX H-1 KHUSUS TIPE DATE) ---
    if (max && type === "date") {
      // Logika H-1 Akhir Promo hanya berlaku untuk tipe "date"
      const maxPromoDate = new Date(max);
      maxPromoDate.setDate(maxPromoDate.getDate() - 1);

      const y = maxPromoDate.getFullYear();
      const m = String(maxPromoDate.getMonth() + 1).padStart(2, "0");
      const d = String(maxPromoDate.getDate()).padStart(2, "0");
      maxDate = `${y}-${m}-${d}`;
    }

    if (disableFuture && !max) {
      maxDate = todayString;
    }

    // 4. --- HANDLER UNTUK VALUE CHANGE (DENGAN BLOKIR HARI MINGGU UNTUK TIPE DATE) ---
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedValueStr = e.target.value;
      if (!selectedValueStr) {
        onChange?.("");
        setWarning?.(null);
        return;
      }

      if (type === "date" && disableSundays) {
        const selectedDate = new Date(selectedValueStr);
        const dayOfWeek = selectedDate.getDay(); // 0 = Minggu

        if (dayOfWeek === 0) {
          setWarning?.(
            "Maaf, tanggal pelaksanaan tidak tersedia di hari Minggu.",
          );
          onChange?.(""); // Kosongkan state di form parent
          return;
        }
      }

      // Jika lolos pengecekan hari Minggu atau bertipe "month"
      setWarning?.(null);
      onChange?.(selectedValueStr);
    };

    return (
      <div className={`relative ${className} space-y-2`}>
        <label
          className={`block text-sm font-medium mb-1 ${error ? "text-error" : "text-base-content"}`}
        >
          {label} {required && <span className="text-error">*</span>}
        </label>
        <input
          type={type} // akan dinamis menjadi "date" atau "month"
          value={value}
          onChange={handleDateChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          min={minDate}
          max={maxDate}
          className={`${baseClasses} ${error ? "border-error focus:ring-error" : ""}`}
        />

        {/* Tampilkan Teks Error di bawah input */}
        {error && <p className="text-xs text-error font-medium">{error}</p>}

        {helpText && !error && (
          <p className="text-xs text-base-content/80">{helpText}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className} space-y-1`}>
      <label
        className={`block text-sm font-medium mb-1 ${error ? "text-error" : "text-base-content"}`}
      >
        {label} {required && <span className="text-error">*</span>}
      </label>

      {type === "radio" && radioOptions ? (
        <div
          className={`flex flex-col gap-2 p-2 rounded-lg ${error ? "border border-error bg-error/5" : ""}`}
        >
          {radioOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="radio"
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange?.(opt.value)}
                required={required}
                disabled={disabled}
                className={`w-4 h-4 focus:ring-2 ${error ? "radio-error text-error focus:ring-error" : "text-primary focus:ring-primary"}`}
              />
              <span className="text-sm text-base-content">{opt.label}</span>
            </label>
          ))}
        </div>
      ) : type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange?.(e.target.value)
          }
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          className={baseClasses + " resize-y"}
        />
      ) : type === "password" ? (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange?.(e.target.value)
            }
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            min={min}
            max={max}
            pattern={pattern}
            className={
              Icon ? `pl-10 pr-10 ${baseClasses}` : `pr-10 ${baseClasses}`
            }
          />
          {Icon && (
            <span
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${error ? "text-error" : "text-base-content/50"}`}
            >
              <Icon size={18} />
            </span>
          )}
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base-content/50"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
      ) : type === "file" ? (
        <input
          type="file"
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            onChange?.(file);
          }}
          required={required}
          disabled={disabled}
          className={baseClasses}
        />
      ) : options ? (
        dropdownType === "profile" ? (
          <div className="relative text-sm" ref={dropdownRef}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => setSelectOpen((v) => !v)}
              className={`${baseClasses} flex justify-between items-center`}
            >
              <span className="flex items-center gap-2">
                {value
                  ? (() => {
                      const selected = normalizedOptions.find(
                        (o) => o.value === String(value),
                      );

                      return selected ? (
                        <>
                          <span>{selected.label}</span>
                        </>
                      ) : null;
                    })()
                  : placeholder || `Pilih ${label}`}
              </span>

              <ChevronDown className="w-4 h-4 text-base-content" />
            </button>

            {selectOpen && (
              <div className="absolute z-500 mt-2 p-2 w-full bg-base-100 border border-base-300 rounded-xl shadow-lg flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Type to search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full px-3 py-2 border-b border-base-300 bg-base-100 focus:outline-none focus:ring-1 focus:ring-primary"
                />

                <ul className="max-h-60 overflow-auto flex flex-col gap-1">
                  {filteredSelectOptions.length > 0 ? (
                    filteredSelectOptions.map((opt) => {
                      const selected = String(value) === opt.value;

                      return (
                        <li
                          key={opt.value}
                          onMouseDown={() => {
                            onChange?.(opt.value);
                            setSelectOpen(false);
                            setSearchText("");
                          }}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all
                    ${
                      selected
                        ? "bg-primary/20 border border-primary"
                        : "hover:bg-base-200"
                    }`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden text-xs font-bold text-primary">
                            {opt.image ? (
                              <img
                                src={opt.image}
                                loading="lazy"
                                decoding="async"
                                width={36}
                                height={36}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              opt.initials || opt.label?.slice(0, 2)
                            )}
                          </div>

                          <div className="flex-1">
                            <p className="text-sm font-medium leading-tight">
                              {opt.label}
                            </p>
                            {opt.description && (
                              <p className="text-xs text-base-content/60">
                                {opt.description}
                              </p>
                            )}
                          </div>

                          {selected && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-3 py-2 text-base-content/60">
                      No matching results found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : dropdownType === "select" ? (
          <div className="relative text-sm" ref={dropdownRef}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => setSelectOpen((v) => !v)}
              className={`
        ${baseClasses}
        flex justify-between items-center
        cursor-pointer
      `}
            >
              <span>
                {value
                  ? normalizedOptions.find((o) => o.value === String(value))
                      ?.label
                  : placeholder || `Pilih ${label}`}
              </span>
              <ChevronDown className="w-4 h-4 text-base-content" />
            </button>

            {selectOpen && (
              <div className="absolute z-500 mt-2 p-2 w-full bg-base-100 border border-base-300 rounded-lg shadow-md flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Type to search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="
                    w-full px-3 py-2 bg-base-100 text-base-content border-b border-base-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />

                <ul className="max-h-60 overflow-auto flex flex-col gap-1">
                  {filteredSelectOptions.length > 0 ? (
                    filteredSelectOptions.map((opt) => (
                      <li
                        key={opt.value}
                        onMouseDown={() => {
                          onChange?.(opt.value);
                          setSelectOpen(false);
                          setSearchText("");
                        }}
                        className={`px-3 py-2 rounded-md cursor-pointer text-base-content hover:bg-base-200
                  ${
                    String(value) === opt.value
                      ? "bg-primary/30 font-semibold"
                      : ""
                  }
                `}
                      >
                        {opt.label}
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-base-content/60">
                      No matching results found
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : (
          /* --- SEARCHABLE DROPDOWN --- */
          <div className="relative">
            <input
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                onChange?.(val);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 200)}
              placeholder={placeholder || `Pilih atau ketik ${label}`}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              className={baseClasses}
            />

            {open && (
              <div className="absolute mt-1 w-full bg-base-100 border border-base-300 rounded-lg shadow-2xl z-500 max-h-48 overflow-auto">
                {filtered.length > 0 ? (
                  filtered.map((item, i) => (
                    <div
                      key={i}
                      className="px-4 py-2 cursor-pointer hover:bg-base-200"
                      onMouseDown={() => {
                        setQuery(item);
                        onChange?.(item);
                        setOpen(false);
                      }}
                    >
                      {item}
                    </div>
                  ))
                ) : query !== "" ? (
                  <div className="px-4 py-2 text-base-content/70">
                    Ketik manual: <strong>{query}</strong>
                  </div>
                ) : (
                  <div className="px-4 py-2 text-base-content/70">
                    No matching results found
                  </div>
                )}
              </div>
            )}
          </div>
        )
      ) : (
        /* --- INPUT BIASA (TEXT, EMAIL, TEL, NUMBER, DLL) --- */
        <div className="relative">
          {Icon && (
            <span
              className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${error ? "text-error" : "text-base-content/50"}`}
            >
              <Icon size={18} />
            </span>
          )}
          <input
            type={type}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onChange?.(e.target.value)
            }
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            min={min}
            max={max}
            pattern={pattern}
            className={Icon ? `pl-10 ${baseClasses}` : baseClasses}
          />
        </div>
      )}

      {error ? (
        <p className="text-xs text-error font-medium">{error}</p>
      ) : helpText ? (
        <p className="text-xs text-base-content/80">{helpText}</p>
      ) : null}
    </div>
  );
};

export default FormInput;
